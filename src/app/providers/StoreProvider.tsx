import { Provider } from 'react-redux';

import { store } from '@/app/store';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
