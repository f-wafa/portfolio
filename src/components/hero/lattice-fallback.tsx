export function LatticeFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g className="text-ink">
        <ellipse
          cx="240"
          cy="240"
          rx="212"
          ry="68"
          transform="rotate(-18 240 240)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="212"
          ry="68"
          transform="rotate(66 240 240)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.12"
        />

        <polygon
          points="240,62 394,151 394,329 240,418 86,329 86,151"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.26"
        />
        <polygon
          points="240,112 352,176 352,304 240,368 128,304 128,176"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />

        <g opacity="0.16" stroke="currentColor" strokeWidth="1">
          <path d="M240 62 128 176M240 62l112 114M394 151v178M394 329 240 368M240 418 86 329M86 151l42 153" />
          <path d="M240 112 352 304M240 112 128 304M352 176 240 368M128 176l224 128" />
        </g>

        <g fill="currentColor">
          <polygon points="240,240 240,170 300,205" opacity="0.85" />
          <polygon points="240,240 300,205 300,275" opacity="0.7" />
          <polygon points="240,240 300,275 240,310" opacity="0.55" />
          <polygon points="240,240 240,310 180,275" opacity="0.45" />
          <polygon points="240,240 180,275 180,205" opacity="0.6" />
          <polygon points="240,240 180,205 240,170" opacity="0.75" />
        </g>

        <polygon
          points="240,240 240,310 180,275"
          fill="currentColor"
          className="text-accent"
          opacity="0.22"
        />

        <g fill="currentColor" opacity="0.55">
          <circle cx="240" cy="62" r="3" />
          <circle cx="86" cy="151" r="2" />
          <circle cx="394" cy="329" r="2" />
          <circle cx="128" cy="304" r="2.5" />
          <circle cx="352" cy="176" r="2" />
          <circle cx="318" cy="392" r="1.5" />
          <circle cx="166" cy="98" r="1.5" />
        </g>
      </g>

      <g className="text-accent">
        <path
          d="M240 62A178 178 0 0 1 394 151"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="394" cy="151" r="4" fill="currentColor" />
        <circle cx="394" cy="151" r="10" fill="none" stroke="currentColor" opacity="0.35" />
      </g>
    </svg>
  );
}
