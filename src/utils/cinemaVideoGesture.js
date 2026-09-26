export const CINEMA_SHELL_SELECTOR = "[data-cinema-shell]";

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** Richiede fullscreen nel gesto utente (tap su «Video»). Non usare dentro setTimeout. */
export function requestCinemaFullscreenFromGesture() {
  if (!isMobileViewport()) return;
  const el = document.querySelector(CINEMA_SHELL_SELECTOR);
  if (!el) return;
  try {
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  } catch {
    // modale resta fullscreen via CSS
  }
}

export function exitCinemaFullscreen() {
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
    return;
  }
  if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
