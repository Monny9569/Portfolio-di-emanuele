const YT_API_SRC = "https://www.youtube.com/iframe_api";

/** Carica una sola volta la YouTube IFrame Player API. */
export function loadYouTubeIframeAPI() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && typeof window.YT.Player === "function") {
    return Promise.resolve(window.YT);
  }
  if (window.__ytIframeApiPromise) return window.__ytIframeApiPromise;

  window.__ytIframeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") {
        try {
          previous();
        } catch {
          // altri listeners non devono bloccare
        }
      }
      resolve(window.YT);
    };
    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const tag = document.createElement("script");
      tag.src = YT_API_SRC;
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return window.__ytIframeApiPromise;
}
