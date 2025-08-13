import { useTabContext } from '@/components/common/Tab/TabContext';
import MainLayout from '@/components/layout/MainLayout';
import WorkLocation from '@/components/Category/WorkLocation';
import JobCategory from '@/components/Category/JobCategory';
import WorkPeriod from '@/components/Category/WorkPeriod';
import DetailCondition from '@/components/Category/DetailCondition';
import type { TabId } from '@/types/filter';

const FilterPage = () => {
  const { activeTab } = useTabContext();

  const renderTabContent = () => {
    switch (activeTab as TabId) {
      case 0:
        return <WorkLocation />;
      case 1:
        return <JobCategory />;
      case 2:
        return <WorkPeriod />;
      case 3:
        return <DetailCondition />;
      default:
        return null;
    }
  };

  return <MainLayout>{renderTabContent()}</MainLayout>;
};

export default FilterPage;
