import { AppProvider } from '@/app/providers';
import './styles.css';

import Dashboard from '@/items/dashboard/components/Dashboard';
import Sidebar from '@/items/sidebar/components/Sidebar';

function App() {
  return (
    <AppProvider>
      <Sidebar />
      <Dashboard />
    </AppProvider>
  );
}

export default App;
