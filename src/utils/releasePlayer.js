/** True if the string is a usable http(s) URL (excludes placeholders like "https://..."). */
export function hasValidListeningUrl(url) {
  if (!url || typeof url !== "string") return false;
  const s = url.trim();
  if (!s.startsWith("http")) return false;
  if (s === "https://..." || s === "https://.." || s === "http://...") return false;
  if (/^https?:\/\/\.+$/.test(s)) return false;
  return true;
}

export function releasePlayerKey(item) {
  return `${item.date}::${item.title}`;
}

/** Single track or album tracklist for the YouTube player. */
export function getPlayableTracks(item) {
  if (item.tracks?.length) {
    return item.tracks.filter((t) => hasValidListeningUrl(t.youtubeEmbed));
  }
  if (hasValidListeningUrl(item.youtubeEmbed)) {
    return [{ title: item.title, youtubeEmbed: item.youtubeEmbed }];
  }
  return [];
}
