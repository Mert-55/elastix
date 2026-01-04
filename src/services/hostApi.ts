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

export const hostApi = createApi({
  reducerPath: 'hostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
  }),
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
    }),

    getStockItems: builder.query<StockItemsResponse, StockItemsQueryParams>({
      query: (params) => ({
        url: '/stock-items',
        params: {
          segment_filter: params?.segmentFilter,
          query: params?.query,
          sort_by: params?.sortBy,
          limit: params?.limit,
          offset: params?.offset,
        },
      }),
      providesTags: ['StockItems'],
    }),

    getSegmentTree: builder.query<SegmentTreeResponse, void>({
      query: () => '/dashboard/segments',
      providesTags: ['SegmentTree'],
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
    }),

    getSimulations: builder.query<SimulationsListResponse, void>({
      query: () => '/simulations',
      providesTags: ['Simulations'],
    }),

    getSimulationMetrics: builder.query<SimulationMetricsResponse, string>({
      query: (simulationId) => `/simulations/${simulationId}/metrics`,
      providesTags: (_result, _error, simulationId) => [
        { type: 'SimulationMetrics', id: simulationId },
      ],
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
