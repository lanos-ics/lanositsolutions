import React from "react";

interface LanosLogoProps {
  /** Height of the logo in px (width scales automatically). Default: 32 */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * LANOS SVG wordmark — faithfully reproduced from the brand reference.
 *
 * The "L" is a geometric letterform with:
 *  - A diagonal parallelogram cut across the top stroke
 *  - A small rectangular notch at the inner corner (where vertical meets horizontal)
 *  - A bold horizontal base
 * "ANOS" follows in a heavy geometric sans-serif.
 * All shapes use the brand red #e5404f.
 */
export default function LanosLogo({
  height = 32,
  className,
  style,
}: LanosLogoProps) {
  // ViewBox: 260 × 60
  const width = (height / 60) * 260;

  const RED = "#e5404f";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 60"
      width={width}
      height={height}
      aria-label="Lanos logo"
      role="img"
      className={className}
      style={{ display: "block", ...style }}
    >
      {/*
        ── Stylised "L" lettermark ──
        Built from a single polygon path that describes the outer shape:

        Top-left corner is clipped diagonally (parallelogram effect).
        A rectangular notch is cut at the inner corner (where vertical
        stroke meets horizontal base).

        Coordinates on a 60-tall × 48-wide grid:
          - Vertical stroke: x 0..14, y 0..60
          - Horizontal base: x 0..48, y 50..60
          - Diagonal cut: top-left goes from (0, 8) to (14, 0)
            creating the slanted top edge
          - Inner notch: a small step cut out at (14, 44)→(18, 44)→(18, 50)
            giving the trademark inner-corner detail

        Rendered as a single filled polygon (no strokes needed).
      */}
      <polygon
        points={[
          "0,8",    // diagonal cut starts here on left edge
          "14,0",   // diagonal cut ends top-right of vertical stroke
          "14,44",  // down right side of vertical stroke
          "18,44",  // notch step — move right
          "18,50",  // notch step — move down
          "48,50",  // along top of horizontal base to the right
          "48,60",  // right edge of base
          "0,60",   // bottom-left
        ].join(" ")}
        fill={RED}
      />

      {/* ── "ANOS" wordmark ── */}
      {/*
        Positioned to sit snugly next to the L mark.
        Using a very heavy geometric font stack.
        font-size 56 in a 60-tall viewbox gives a cap-height that
        aligns with the top of the "L".
      */}
      <text
        x="56"
        y="57"
        fontFamily="'Arial Black', 'Franklin Gothic Heavy', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="55"
        letterSpacing="-1.5"
        fill={RED}
        dominantBaseline="auto"
      >
        ANOS
      </text>
    </svg>
  );
}
