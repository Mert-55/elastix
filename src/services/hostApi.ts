import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  StockItemsQueryParams,
  TimeSeriesQueryParams,
} from './types/payload';
import type {
  ElasticityMetricsResponse,
  RevenueTimeSeriesResponse,
  SegmentTreeResponse,
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
          segment: params?.segment,
          page: params?.page,
          pageSize: params?.pageSize,
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
  }),
});

export const {
  useGetElasticityMetricsQuery,
  useGetStockItemsQuery,
  useGetSegmentTreeQuery,
  useGetRevenueTimeSeriesQuery,
} = hostApi;
