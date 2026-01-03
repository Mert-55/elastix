import { configureStore } from '@reduxjs/toolkit';

import { hostApi } from '@/services/hostApi';

export const store = configureStore({
  reducer: {
    [hostApi.reducerPath]: hostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hostApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
