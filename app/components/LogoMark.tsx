/**
 * dranzr monogram mark — a geometric lowercase "d" (ring + ascender stem)
 * with a detached "spark" dot for a modern, dynamic signature.
 * Uses currentColor so it inherits the parent's text color (white on the
 * teal gradient chip). Decorative — the accessible brand name is the adjacent
 * "dranzr" wordmark / the link's context.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* bowl */}
    <circle
      cx="9"
      cy="14.5"
      r="4.6"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    {/* ascender stem */}
    <path
      d="M13.6 5.2V19.1"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* spark */}
    <circle cx="17.7" cy="6.7" r="1.45" fill="currentColor" />
  </svg>
);

export default LogoMark;
