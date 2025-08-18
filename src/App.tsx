import FilterPage from '@/pages/FilterPage';
import { TabProvider } from '@/components/common/Tab/TabContext';
import ToastContainer from '@/components/common/ToastContainer';

function App() {
  return (
    <TabProvider>
      <FilterPage />
      <ToastContainer />
    </TabProvider>
  );
}

export default App;
