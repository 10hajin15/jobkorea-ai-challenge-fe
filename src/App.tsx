import FilterPage from '@/pages/FilterPage';
import { TabProvider } from '@/components/common/Tab/TabContext';

function App() {
  return (
    <TabProvider>
      <FilterPage />
    </TabProvider>
  );
}

export default App;
