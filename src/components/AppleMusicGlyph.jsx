/**
 * Apple Music — glyph minimale (doppia croma beamed).
 * Vettoriale, fill = currentColor → eredita colore via text-*, hover, ecc.
 * Stesso pattern di SpotifyGlyph: pulito ed elegante, non aggressivo.
 */
export default function AppleMusicGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.05 3.06a.58.58 0 0 0-.47-.13l-9.04 1.86a.6.6 0 0 0-.48.59v10.08a3.43 3.43 0 0 0-1.94-.6 3.45 3.45 0 1 0 3.45 3.45V8.97l7.74-1.6v6.32a3.43 3.43 0 0 0-1.94-.6 3.45 3.45 0 1 0 3.45 3.45V3.53a.6.6 0 0 0-.21-.47z" />
    </svg>
  );
}
