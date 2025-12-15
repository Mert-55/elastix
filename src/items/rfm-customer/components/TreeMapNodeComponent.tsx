import type { NodeProps } from '@nivo/treemap';
import { animated, to } from '@react-spring/web';

import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { TreeMapNode } from '../types/SegmentTreeMapData';

interface TreeMapNodeComponentProps extends NodeProps<TreeMapNode> {
  isDark: boolean;
  radiusXl: number;
  setHoveredId: (id: string | null) => void;
}

export function TreeMapNodeComponent({
  node,
  animatedProps,
  borderWidth,
  isDark,
  radiusXl,
  setHoveredId,
}: TreeMapNodeComponentProps) {
  const isLost = node.data.id === RFMSegmentIds.Lost;

  // 1. Eindeutige IDs generieren, damit sich die Segmente nicht gegenseitig überschreiben
  const safeId = String(node.id).replace(/[^a-zA-Z0-9_-]/g, '-');
  const clipId = `clip-${safeId}`;
  const gradientId = `grad-${safeId}`;

  // Label Rotation Logik
  const shouldRotate = node.height > node.width;
  const rotationAngle = shouldRotate ? -90 : 0;

  const normalizeUprightAngle = (angle: number) => {
    let a = ((angle + 180) % 360) - 180;
    if (a > 90) a -= 180;
    if (a < -90) a += 180;
    return a;
  };

  const transform = to(
    [animatedProps.x, animatedProps.y],
    (x, y) => `translate(${x},${y})`
  );

  const labelTransform = to(
    [animatedProps.labelRotation, animatedProps.labelX, animatedProps.labelY],
    (r, x, y) => {
      const angle = normalizeUprightAngle(r + rotationAngle);
      return `rotate(${angle}, ${x}, ${y})`;
    }
  );

  // Wir bestimmen die Füllung.
  // Wenn es "Lost" ist, nehmen wir eine feste Farbe (oder das Pattern).
  // Wenn es ein aktives Segment ist, nehmen wir UNSEREN Gradienten per URL.
  // Das löst das "Schwarze Rechteck"-Problem, da wir React-Spring nicht zwingen,
  // den komplexen 'color-mix' String zu interpolieren.
  const fillUrl = isLost ? (node.fill ?? node.color) : `url(#${gradientId})`;

  return (
    <animated.g
      transform={transform}
      style={{ cursor: node.isLeaf ? 'pointer' : 'default' }}
      onMouseEnter={(event) => {
        setHoveredId(node.id);
        node.onMouseEnter?.(event as any);
      }}
      onMouseMove={(event) => node.onMouseMove?.(event as any)}
      onMouseLeave={(event) => {
        setHoveredId(null);
        node.onMouseLeave?.(event as any);
      }}
      onClick={(event) => node.onClick?.(event as any)}
    >
      <defs>
        {/* 2. Der "Umwerfende" Gradient 
          Er wird pro Node definiert.
        */}
        {!isLost && (
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%" // Diagonal für Dynamik
            gradientUnits="objectBoundingBox"
          >
            {/* Start: Die Farbe, die deine Funktion berechnet hat (Primary Mix) */}
            <stop offset="0%" stopColor={node.color} stopOpacity={1} />

            {/* Mitte: Ein leichter "Lichtreflex" mit der Accent-Farbe */}
            <stop offset="40%" stopColor={node.color} stopOpacity={0.9} />

            {/* Ende: Fade hin zu Accent oder transparenter Primary für Tiefe */}
            <stop
              offset="100%"
              stopColor="var(--accent)"
              stopOpacity={isDark ? 0.4 : 0.6} // Im Darkmode etwas dezenter
            />
          </linearGradient>
        )}

        <clipPath id={clipId}>
          <rect
            width={node.width}
            height={node.height}
            rx={radiusXl}
            ry={radiusXl}
          />
        </clipPath>
      </defs>

      {/* Das Haupt-Rechteck.
         WICHTIG: Wir nutzen das `fill` Attribut mit der URL Referenz für aktive Segmente.
         Das verhindert, dass React-Spring versucht, den color-mix String zu parsen.
      */}
      <animated.rect
        width={animatedProps.width}
        height={animatedProps.height}
        fill={fillUrl}
        stroke={'var(--border)'}
        strokeWidth={borderWidth}
        rx={radiusXl}
        ry={radiusXl}
        // Optional: Ein feiner Schatten/Glow über CSS Filter (frisst aber Performance bei vielen Nodes)
        // style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
      />

      {/* Optional: Ein zusätzlicher "Glassy" Shine Effekt oben drauf (nur subtil) */}
      {!isLost && (
        <animated.rect
          width={animatedProps.width}
          height={animatedProps.height}
          fill="url(#glassOverlay)" // Falls du global einen weißen Shine definiert hast, sonst weglassen
          rx={radiusXl}
          ry={radiusXl}
          style={{ pointerEvents: 'none' }}
          opacity={isDark ? 0.1 : 0.2}
        >
          {/* Inline Definition für den Glass-Effekt, falls nicht global vorhanden */}
          <defs>
            <linearGradient id="glassOverlay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </animated.rect>
      )}

      <g className="mark">
        <animated.text
          x={animatedProps.labelX}
          y={animatedProps.labelY}
          transform={labelTransform}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: isLost ? 'var(--muted-foreground)' : 'var(--foreground)',
            fontFamily: 'var(--font-mono)',
            fontSize: Math.min(node.width, node.height) < 48 ? 11 : 13,
            fontWeight: 700,
            paintOrder: 'stroke',
            // Stärkerer Stroke im Darkmode für bessere Lesbarkeit auf den bunten Verläufen
            stroke: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
            strokeWidth: 3,
            strokeLinejoin: 'round',
            pointerEvents: 'none',
          }}
        >
          {node.label}
        </animated.text>
      </g>
    </animated.g>
  );
}
