export const COOKIE_KEY = "cookie-consent-v2";

export const defaultConsent = {
  necessary: true,
  externalMedia: false,
  updatedAt: null,
};

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    return {
      ...defaultConsent,
      ...parsed,
      necessary: true,
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent) {
  const payload = {
    ...defaultConsent,
    ...consent,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
}

export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_KEY);
}

export function hasExternalMediaConsent() {
  if (typeof window === "undefined") return false;
  const consent = getCookieConsent();
  return consent?.externalMedia === true;
}

export const hasFullConsent = hasExternalMediaConsent;