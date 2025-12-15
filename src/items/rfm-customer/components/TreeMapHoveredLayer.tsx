import type { CustomLayerProps } from '@nivo/treemap';

import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

import type { TreeMapNode } from '../types/SegmentTreeMapData';

interface TreeMapHoveredLayerProps extends CustomLayerProps<TreeMapNode> {
  hoveredId: string | null;
  isDark: boolean;
  radiusXl: number;
}

/**
 * Custom layer for hover effects on TreeMap segments
 * Renders a scaled overlay with ring outline when a node is hovered
 */
export function TreeMapHoveredLayer({
  nodes,
  hoveredId,
  isDark,
  radiusXl,
}: TreeMapHoveredLayerProps) {
  if (!hoveredId) return null;

  const hoveredNode = nodes.find((n) => n.id === hoveredId);
  if (!hoveredNode || !hoveredNode.isLeaf) return null;

  const isLost = hoveredNode.data.id === RFMSegmentIds.Lost;
  const scale = 1.03;
  const cx = hoveredNode.width / 2;
  const cy = hoveredNode.height / 2;

  return (
    <g pointerEvents="none">
      <g
        transform={`translate(${hoveredNode.x},${hoveredNode.y}) translate(${cx},${cy}) scale(${scale}) translate(${-cx},${-cy})`}
      >
        {/* lifted overlay */}
        <rect
          width={hoveredNode.width}
          height={hoveredNode.height}
          fill={hoveredNode.color}
          opacity={isDark ? 0.22 : 0.14}
          rx={radiusXl}
          ry={radiusXl}
        />
        {!isLost ? (
          <rect
            width={hoveredNode.width}
            height={hoveredNode.height}
            fill={'url(#segmentGradient)'}
            opacity={isDark ? 1 : 0.22}
            rx={radiusXl}
            ry={radiusXl}
          />
        ) : null}
        <rect
          width={hoveredNode.width}
          height={hoveredNode.height}
          fill="none"
          stroke="var(--ring)"
          strokeWidth={2}
          rx={radiusXl}
          ry={radiusXl}
        />
      </g>
    </g>
  );
}
