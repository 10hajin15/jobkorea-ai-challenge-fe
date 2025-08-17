import Header from '@/components/common/Header';
import SearchResultButton from '@/components/common/SearchResultButton';
import SelectedFilters from '@/components/common/SelectedFilters';
import TabNavigation from '../common/Tab/TabNavigation';
import { useTabContext } from '@/components/common/Tab/TabContext';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { activeTab } = useTabContext();

  const shouldHavePadding = activeTab === 2 || activeTab === 3;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <SelectedFilters />
      <TabNavigation />
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className={`h-full ${shouldHavePadding ? 'flex flex-col gap-[24px] px-[20px] py-[12px]' : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <SearchResultButton />
    </div>
  );
};

export default MainLayout;
