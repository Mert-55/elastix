/**
 * SVG definitions for TreeMap patterns and gradients
 */

export interface TreeMapDefsConfig {
  isDark: boolean;
}

/**
 * Creates gradient and pattern definitions for TreeMap
 */
export function getTreeMapDefs({ isDark }: TreeMapDefsConfig) {
  return [
    {
      id: 'segmentGradient',
      type: 'linearGradient' as const,
      colors: [
        {
          offset: 0,
          color: 'var(--primary)',
          opacity: isDark ? 0.35 : 0.12,
        },
        {
          offset: 100,
          color: 'var(--accent)',
          opacity: isDark ? 0.45 : 0.16,
        },
      ],
    },
    {
      id: 'lostHatch',
      type: 'patternLines' as const,
      background: 'var(--muted)',
      color: 'var(--muted-foreground)',
      rotation: -45,
      lineWidth: 3,
      spacing: 6,
    },
  ];
}
