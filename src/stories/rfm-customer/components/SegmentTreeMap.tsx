'use client';

import type { ComputedNodeWithoutStyles } from '@nivo/treemap';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { useTheme } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { cn } from '@/common/lib/utils';
import { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';

import {
  chartConfig,
  LABEL_SKIP_SIZE,
  segmentIconMap,
  TREEMAP_RADIUS,
} from '../config/treeMapConfig';
import { getTreeMapDefs } from '../config/treeMapDefs';
import type { SegmentData, TreeMapNode } from '../types/SegmentTreeMapData';
import {
  getSegmentColor,
  transformToTreeMapData,
} from '../types/SegmentTreeMapData';
import { SegmentTreeMapTooltip } from './SegmentTreeMapTooltip';
import { TreeMapHoveredLayer } from './TreeMapHoveredLayer';
import { TreeMapNodeComponent } from './TreeMapNodeComponent';

export interface SegmentTreeMapProps {
  /** Segment data from API */
  data: SegmentData[];
  /** Optional className for container */
  className?: string;
  /** Callback when a segment is clicked */
  onSegmentClick?: (segment: SegmentData) => void;
}

/**
 * SegmentTreeMap - Visualizes customer segments as a treemap
 *
 * - Tile SIZE represents monetary value (revenue contribution)
 * - Tile COLOR represents segment health score (0-5)
 * - Hover shows detailed segment information
 *
 * @example
 * <SegmentTreeMap
 *   data={segments}
 *   onSegmentClick={(segment) => console.log(segment)}
 * />
 */
export default function SegmentTreeMap({
  data,
  className,
  onSegmentClick,
}: SegmentTreeMapProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const intl = useIntl();

  const ariaLabel = useFormatText({ id: 'rfm.customer.treemap.ariaLabel' });

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const treeMapData = useMemo(() => transformToTreeMapData(data), [data]);

  const getColor = (node: ComputedNodeWithoutStyles<TreeMapNode>) => {
    if (node.data.id === RFMSegmentIds.Lost) {
      return 'var(--muted)';
    }
    if (node.data.score !== undefined) {
      return getSegmentColor(node.data.score);
    }
    return 'var(--muted)';
  };

  return (
    <div
      className={cn(
        'h-full w-full min-h-[300px] relative overflow-visible',
        className
      )}
      role="img"
      aria-label={ariaLabel}
      style={{
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <ResponsiveTreeMap<TreeMapNode>
        data={treeMapData}
        identity="id"
        value="value"
        valueFormat={(value) =>
          intl.formatNumber(Number(value), {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          })
        }
        tile="squarify"
        margin={{ top: 4, bottom: 4, left: 4, right: 4 }}
        leavesOnly={true}
        innerPadding={4}
        outerPadding={4}
        colors={getColor}
        borderWidth={1}
        borderColor={'var(--border)'}
        enableLabel={true}
        labelSkipSize={LABEL_SKIP_SIZE}
        label={(node) =>
          intl.formatMessage({ id: `${node.data.name}.text` as MessageId })
        }
        labelTextColor={'var(--foreground)'}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        nodeOpacity={1}
        animate={true}
        motionConfig="gentle"
        // Custom tooltip with boundary handling
        tooltip={({ node }) => (
          <SegmentTreeMapTooltip
            config={chartConfig}
            segmentIcon={segmentIconMap[node.data.id]}
            name={intl.formatMessage({
              id: `${node.data.name}.text` as MessageId,
            })}
            value={node.value}
            score={node.data.score}
            customerCount={node.data.customerCount}
          />
        )}
        onClick={(node) => {
          if (onSegmentClick && node.data.id !== 'root') {
            const segment = data.find((s) => s.id === node.data.id);
            if (segment) onSegmentClick(segment);
          }
        }}
        // Theme integration
        theme={{
          text: {
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          },
          labels: {
            text: {
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            },
          },
        }}
        nodeComponent={(props) => (
          <TreeMapNodeComponent
            {...props}
            isDark={isDark}
            radiusXl={TREEMAP_RADIUS}
            setHoveredId={setHoveredId}
          />
        )}
        layers={[
          'nodes',
          (props) => (
            <TreeMapHoveredLayer
              {...props}
              hoveredId={hoveredId}
              isDark={isDark}
              radiusXl={TREEMAP_RADIUS}
            />
          ),
        ]}
        defs={getTreeMapDefs({ isDark })}
        fill={[
          {
            match: (d) => d.isLeaf && d.data.id === RFMSegmentIds.Lost,
            id: 'lostHatch',
          },
        ]}
      />
    </div>
  );
}
