import type { NodeProps } from '@nivo/treemap';
import { animated, to } from '@react-spring/web';

import { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';

import type { TreeMapNode } from '../types/SegmentTreeMapData';

interface TreeMapNodeComponentProps extends NodeProps<TreeMapNode> {
  isDark: boolean;
  radiusXl: number;
  setHoveredId: (id: string | null) => void;
}

/**
 * Custom node component for TreeMap segments
 * Handles rendering of individual tiles with gradient overlay and labels
 */
export function TreeMapNodeComponent({
  node,
  animatedProps,
  borderWidth,
  isDark,
  radiusXl,
  setHoveredId,
}: TreeMapNodeComponentProps) {
  const isLost = node.data.id === RFMSegmentIds.Lost;
  const clipId = `clip-${String(node.id).replace(/[^a-zA-Z0-9_-]/g, '-')}`;

  // Auto-rotate labels when height > width for better readability
  const shouldRotate = node.height > node.width;
  const rotationAngle = shouldRotate ? -90 : 0;

  const normalizeUprightAngle = (angle: number) => {
    // normalize to (-180, 180]
    let a = ((angle + 180) % 360) - 180;
    // keep text upright (never upside-down)
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
        <clipPath id={clipId}>
          <rect
            width={node.width}
            height={node.height}
            rx={radiusXl}
            ry={radiusXl}
          />
        </clipPath>
      </defs>

      <animated.rect
        width={animatedProps.width}
        height={animatedProps.height}
        fill={isLost ? (node.fill ?? node.color) : node.color}
        stroke={'var(--border)'}
        strokeWidth={borderWidth}
        rx={radiusXl}
        ry={radiusXl}
      />

      {/* subtle theme gradient overlay (keeps score-based base color visible) */}
      {!isLost ? (
        <animated.rect
          width={animatedProps.width}
          height={animatedProps.height}
          fill={'url(#segmentGradient)'}
          opacity={isDark ? 1 : 0.22}
          rx={radiusXl}
          ry={radiusXl}
          style={{ pointerEvents: 'none' }}
        />
      ) : null}

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
            stroke: isDark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.85)',
            strokeWidth: 2,
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
