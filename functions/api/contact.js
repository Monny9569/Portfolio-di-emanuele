/**
 * Cloudflare Pages Function — POST /api/contact
 * Env: RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM
 *
 * - accetta solo POST
 * - valida payload e formato email
 * - rate limit base anti-spam (in-memory per istanza)
 * - invio tramite Resend con reply_to dell'utente
 * - risposte JSON coerenti, niente stack trace lato utente
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_BYTES = 32 * 1024;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map();
const FUNCTION_VERSION = "contact-onrequest-v2";

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Contact-Function-Version": FUNCTION_VERSION,
      ...extraHeaders,
    },
  });
}

function getClientKey(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    "anonymous"
  );
}

function isRateLimited(key) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(key) || []).filter(
    (t) => t > windowStart,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);

  if (rateLimitStore.size > 1000) {
    for (const [storedKey, storedTimestamps] of rateLimitStore.entries()) {
      const fresh = storedTimestamps.filter((t) => t > windowStart);
      if (fresh.length === 0) {
        rateLimitStore.delete(storedKey);
      } else {
        rateLimitStore.set(storedKey, fresh);
      }
    }
  }

  return false;
}

async function handlePost(request, env) {
  try {
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return jsonResponse(
        { success: false, error: "Too many requests. Please try again later." },
        429,
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return jsonResponse(
        { success: false, error: "Payload too large" },
        413,
      );
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ success: false, error: "Invalid JSON" }, 400);
    }

    if (!payload || typeof payload !== "object") {
      return jsonResponse({ success: false, error: "Invalid payload" }, 400);
    }

    // Honeypot: i bot compilano il campo nascosto. Rispondiamo "ok" senza inviare nulla.
    if (typeof payload.website === "string" && payload.website.trim() !== "") {
      return jsonResponse({ success: true });
    }

    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const subjectRaw =
      typeof payload.subject === "string" ? payload.subject.trim() : "";
    const message =
      typeof payload.message === "string" ? payload.message.trim() : "";

    if (!name) {
      return jsonResponse({ success: false, error: "Name is required" }, 400);
    }
    if (name.length > MAX_NAME_LENGTH) {
      return jsonResponse({ success: false, error: "Name too long" }, 400);
    }
    if (!email) {
      return jsonResponse({ success: false, error: "Email is required" }, 400);
    }
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return jsonResponse({ success: false, error: "Invalid email format" }, 400);
    }
    if (subjectRaw.length > MAX_SUBJECT_LENGTH) {
      return jsonResponse({ success: false, error: "Subject too long" }, 400);
    }
    if (!message) {
      return jsonResponse({ success: false, error: "Message is required" }, 400);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ success: false, error: "Message too long" }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    const to = env.CONTACT_EMAIL_TO;
    const from = env.CONTACT_EMAIL_FROM;

    if (!apiKey || !to || !from) {
      console.error("Missing required env vars for /api/contact");
      return jsonResponse(
        { success: false, error: "Server configuration error" },
        500,
      );
    }

    const subject = subjectRaw || `Nuovo contatto dal sito da ${name}`;

    const textBody = [
      `Messaggio dal modulo contatti del sito.`,
      ``,
      `Nome: ${name}`,
      `Email: ${email}`,
      ``,
      message,
    ].join("\n");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: textBody,
      }),
    });

    if (!resendRes.ok) {
      let errText = "";
      try {
        errText = await resendRes.text();
      } catch {
        errText = "";
      }
      console.error("Resend error", resendRes.status, errText);
      return jsonResponse(
        { success: false, error: "Failed to send email" },
        502,
      );
    }

    return jsonResponse({ success: true });
  } catch (e) {
    console.error("contact handler error", e);
    return jsonResponse({ success: false, error: "Internal error" }, 500);
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    // Il form usa la stessa origine: nessun header CORS permissivo.
    return new Response(null, {
      status: 204,
      headers: { Allow: "POST, OPTIONS" },
    });
  }

  if (request.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed",
        method: request.method,
        expected: "POST",
        functionVersion: FUNCTION_VERSION,
      },
      405,
      {
        Allow: "POST, OPTIONS",
        "X-Contact-Function-Version": FUNCTION_VERSION,
      },
    );
  }

  return handlePost(request, env);
}
