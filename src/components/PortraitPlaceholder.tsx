export function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 210, border: "2px solid var(--u-rule)", display: "block", filter: "grayscale(1)" }}
      role="img"
      aria-label="Portrait photograph placeholder"
    >
      <defs>
        <pattern id="stripeA" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4" height="8" fill="#242120" />
          <rect x="4" width="4" height="8" fill="#2c2927" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill="url(#stripeA)" />
    </svg>
  );
}
