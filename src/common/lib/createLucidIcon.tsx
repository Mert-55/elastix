import { type LucideProps } from 'lucide-react';
import React, { forwardRef } from 'react';

/**
 * Erstellt eine Lucide-kompatible Icon-Komponente aus Raw SVG Elementen.
 * * @param iconName - Name für Debugging/Display
 * @param svgChildren - Die inneren Elemente des SVGs (path, circle, etc.)
 * @param viewBox - Optional: ViewBox des Original-SVGs (Standard: "0 0 24 24")
 */
export function createRawIcon(
  iconName: string,
  svgChildren: React.ReactNode,
  viewBox: string = '0 0 24 24'
) {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        className,
        children,
        ...props
      },
      ref
    ) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox={viewBox}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          {svgChildren}
        </svg>
      );
    }
  );

  Component.displayName = `RawIcon(${iconName})`;
  return Component;
}
