import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SimulationDTO } from './types/dto';
import type {
  CreateSimulationPayload,
  DeleteSimulationPayload,
  StockItemsQueryParams,
  TimeSeriesQueryParams,
  UpdateSimulationPayload,
} from './types/payload';
import type {
  ElasticityMetricsResponse,
  RevenueTimeSeriesResponse,
  SegmentTreeResponse,
  SimulationMetricsResponse,
  SimulationsListResponse,
  StockItemsResponse,
} from './types/response';

// Cache durations in seconds
const CACHE_TIME = {
  /** Stock items rarely change - cache for 15 minutes */
  STOCK_ITEMS: 900,
  /** Simulations may be edited - cache for 15 minutes */
  SIMULATIONS: 900,
  /** Simulation metrics are computed - cache for 15 minutes */
  SIMULATION_METRICS: 900,
  /** Dashboard data - cache for 15 minutes */
  DASHBOARD: 900,
} as const;

export const hostApi = createApi({
  reducerPath: 'hostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
  }),
  // Default: keep unused data in cache for 60 seconds
  keepUnusedDataFor: 60,
  tagTypes: [
    'ElasticityMetrics',
    'StockItems',
    'SegmentTree',
    'RevenueTimeSeries',
    'Simulations',
    'SimulationMetrics',
  ],
  endpoints: (builder) => ({
    getElasticityMetrics: builder.query<ElasticityMetricsResponse, void>({
      query: () => '/dashboard/kpis',
      providesTags: ['ElasticityMetrics'],
      keepUnusedDataFor: CACHE_TIME.DASHBOARD,
    }),

    getStockItems: builder.query<StockItemsResponse, StockItemsQueryParams>({
      query: (params) => ({
        url: '/stock-items',
        params: {
          segment_filter: params?.segmentFilter,
          query: params?.query,
          // Default to revenue_desc for relevance-based sorting
          sort_by: params?.sortBy ?? 'revenue_desc',
          limit: params?.limit,
          offset: params?.offset,
        },
      }),
      providesTags: ['StockItems'],
      keepUnusedDataFor: CACHE_TIME.STOCK_ITEMS,
    }),

    getSegmentTree: builder.query<SegmentTreeResponse, void>({
      query: () => '/dashboard/segments',
      providesTags: ['SegmentTree'],
      keepUnusedDataFor: CACHE_TIME.DASHBOARD,
    }),

    getRevenueTimeSeries: builder.query<
      RevenueTimeSeriesResponse,
      TimeSeriesQueryParams | void
    >({
      query: (params) => ({
        url: '/dashboard/trends',
        params: {
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }),
      providesTags: ['RevenueTimeSeries'],
      keepUnusedDataFor: CACHE_TIME.DASHBOARD,
    }),

    getSimulations: builder.query<SimulationsListResponse, void>({
      query: () => '/simulations',
      providesTags: ['Simulations'],
      keepUnusedDataFor: CACHE_TIME.SIMULATIONS,
    }),

    getSimulationMetrics: builder.query<SimulationMetricsResponse, string>({
      query: (simulationId) => `/simulations/${simulationId}/metrics`,
      providesTags: (_result, _error, simulationId) => [
        { type: 'SimulationMetrics', id: simulationId },
      ],
      // Simulation metrics are expensive to compute - cache longer
      keepUnusedDataFor: CACHE_TIME.SIMULATION_METRICS,
    }),

    createSimulation: builder.mutation<SimulationDTO, CreateSimulationPayload>({
      query: (payload) => ({
        url: '/simulations',
        method: 'POST',
        body: {
          stockItemRef: payload.stockItemRef,
          priceRange: payload.priceRange,
          name: payload.name,
          description: payload.description,
        },
      }),
      invalidatesTags: ['Simulations'],
    }),

    updateSimulation: builder.mutation<SimulationDTO, UpdateSimulationPayload>({
      query: ({ simulationId, ...payload }) => {
        // Only include defined values in the body
        const body: Record<string, unknown> = {};
        if (payload.name !== undefined) body.name = payload.name;
        if (payload.description !== undefined)
          body.description = payload.description;
        if (payload.priceRange !== undefined)
          body.priceRange = payload.priceRange;
        if (payload.stockItemRef !== undefined)
          body.stockItemRef = payload.stockItemRef;

        return {
          url: `/simulations/${simulationId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (_result, _error, { simulationId }) => [
        'Simulations',
        { type: 'SimulationMetrics', id: simulationId },
      ],
    }),

    deleteSimulation: builder.mutation<void, DeleteSimulationPayload>({
      query: ({ simulationId }) => ({
        url: `/simulations/${simulationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Simulations'],
    }),
  }),
});

export const {
  useGetElasticityMetricsQuery,
  useGetStockItemsQuery,
  useGetSegmentTreeQuery,
  useGetRevenueTimeSeriesQuery,
  useGetSimulationsQuery,
  useGetSimulationMetricsQuery,
  useCreateSimulationMutation,
  useUpdateSimulationMutation,
  useDeleteSimulationMutation,
} = hostApi;
