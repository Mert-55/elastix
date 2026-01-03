import { Skeleton } from '@/common/ui/skeleton';

/**
 * Skeleton placeholder for the Price Simulation Chart section
 */
export function PriceSimulationChartSkeleton() {
  return (
    <div className="space-y-4">
      {/* Chart area */}
      <Skeleton className="h-[300px] w-full rounded-xl" />
      {/* Segment buttons */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-md" />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for the Metrics Panel section
 */
export function SimulationMetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 p-4 rounded-xl border bg-card">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton placeholder for the Description section
 */
export function DescriptionSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/**
 * Full dashboard skeleton with all sections
 */
export function SimulationDashboardSkeleton() {
  return (
    <div className="space-y-6 px-6 py-4">
      {/* Description section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <DescriptionSkeleton />
      </div>

      {/* Chart section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-5 w-40" />
        </div>
        <PriceSimulationChartSkeleton />
      </div>

      {/* Metrics section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-5 w-48" />
        </div>
        <SimulationMetricsSkeleton />
      </div>
    </div>
  );
}
