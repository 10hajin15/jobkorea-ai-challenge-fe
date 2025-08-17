import Header from '@/components/common/Header';
import SearchResultButton from '@/components/common/SearchResultButton';
import SelectedFilters from '@/components/common/SelectedFilters';
import TabNavigation from '../common/Tab/TabNavigation';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <SelectedFilters />
      <TabNavigation />
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
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
