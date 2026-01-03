import { cn } from '@/common/lib/utils';
import type { ChartConfig } from '@/common/ui/chart';
import { ChartContainer } from '@/common/ui/chart';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

/**
 * Props für die einzelne KPI-Radial-Komponente
 */
export interface KPIRadialGaugeProps {
  /** Wert von 0-100 */
  value: number;
  /** Label für die Anzeige */
  label: string;
  /** Suffix für den Wert (z.B. "%") */
  valueSuffix?: string;
  /** Farbe für den Radial-Bar */
  color: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * KPIRadialGauge - Einzelne Radial-Gauge-Komponente für einen KPI-Wert
 *
 * Zeigt einen einzelnen KPI-Wert als Radial Chart mit Prozentwert in der Mitte
 */
export default function KPIRadialGauge({
  value,
  label,
  valueSuffix = '',
  color,
  className,
}: KPIRadialGaugeProps) {
  const chartData = [{ value, fill: color }];
  const chartConfig = {
    value: {
      label,
    },
  } satisfies ChartConfig;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-[140px] h-[140px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={90 - (value / 100) * 360}
          innerRadius={50}
          outerRadius={70}
          width={140}
          height={140}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-foreground/10 last:fill-background"
            polarRadius={[56, 44]}
          />
          <RadialBar dataKey="value" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {value}
                        {valueSuffix}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      <span className="text-sm font-medium text-muted-foreground mt-2">
        {label}
      </span>
    </div>
  );
}
