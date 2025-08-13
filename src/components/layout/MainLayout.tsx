import Header from '@/components/common/Header';
import SearchResultButton from '@/components/common/SearchResultButton';
import SelectedFilters from '@/components/common/SelectedFilters';
import TabNavigation from '../common/Tab/TabNavigation';
import { useTabContext } from '@/components/common/Tab/TabContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { activeTab } = useTabContext();

  const shouldHavePadding = activeTab === 2 || activeTab === 3;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <SelectedFilters />
      <TabNavigation />
      <div
        className={`scrollbar-hide flex-1 overflow-y-auto ${shouldHavePadding ? 'flex flex-col gap-[24px] overflow-y-auto px-[20px] py-[12px]' : ''}`}
      >
        {children}
      </div>
      <SearchResultButton />
    </div>
  );
};

export default MainLayout;
