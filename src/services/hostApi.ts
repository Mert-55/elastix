import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ElasticityMetricsResponse,
  StockItemsQueryParams,
  StockItemsResponse,
} from './types';

export const hostApi = createApi({
  reducerPath: 'hostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
  }),
  tagTypes: ['ElasticityMetrics', 'StockItems'],
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
  }),
});

export const { useGetElasticityMetricsQuery, useGetStockItemsQuery } = hostApi;
