import FilterContent from '@/components/layout/FilterContentLayout';
import { DAYS, WORK_DAYS, WORK_PERIOD, WORK_TIME } from '@/constants/period';
import TagList from '@/components/common/TagList';
import ToggleButton from '@/components/common/ToggleButton';
import TimePicker from '@/components/common/TimePicker';
import { useState } from 'react';
import type { TFilterMode, TTagClickHandler } from '@/types/filter';
import useFilterStore from '@/store/useFilterStore';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';

const WorkPeriod = () => {
  const [workDaysFilter, setWorkDaysFilter] = useState<TFilterMode>('목록에서 선택');
  const [workTimeFilter, setWorkTimeFilter] = useState<TFilterMode>('목록에서 선택');

  const { activeTab } = useTabContext();
  const tabId = activeTab as unknown as TabId;
  const { toggle, getSelectedByTab } = useFilterStore();

  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');

  const handleWorkDaysTagClick: TTagClickHandler = (workDay) => {
    toggle(
      tabId,
      { id: `workDays:${workDay}`, label: workDay, group: 'workDays' },
      {
        group: 'workDays',
        groupLimit: 10,
      },
    );
  };

  const handleWorkTimeTagClick: TTagClickHandler = (workTime) => {
    toggle(
      tabId,
      { id: `workTime:${workTime}`, label: workTime, group: 'workTime' },
      {
        group: 'workTime',
        groupLimit: 10,
      },
    );
  };

  return (
    <>
      <FilterContent title="근무기간" count={1} total={6}>
        <TagList
          items={WORK_PERIOD}
          onTagClick={(period) =>
            toggle(
              tabId,
              { id: `workPeriod:${period}`, label: period, group: 'workPeriod' },
              {
                group: 'workPeriod',
                groupLimit: 10,
              },
            )
          }
          activeItems={getSelectedByTab(tabId)
            .filter((f) => f.item.group === 'workPeriod')
            .map((f) => f.item.label)}
        />
      </FilterContent>

      <FilterContent
        title="근무요일"
        {...(workDaysFilter === '목록에서 선택' && { count: 0, total: 3 })}
      >
        <ToggleButton
          options={['목록에서 선택', '직접 선택']}
          value={workDaysFilter}
          onChange={(value) => setWorkDaysFilter(value as TFilterMode)}
        />
        {workDaysFilter === '목록에서 선택' && (
          <TagList
            items={WORK_DAYS}
            onTagClick={handleWorkDaysTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workDays')
              .map((f) => f.item.label)}
          />
        )}
        {workDaysFilter === '직접 선택' && (
          <TagList
            items={DAYS}
            className="flex flex-wrap justify-end gap-[8px]"
            onTagClick={handleWorkDaysTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workDays')
              .map((f) => f.item.label)}
          />
        )}
      </FilterContent>

      <FilterContent
        title="근무시간"
        {...(workDaysFilter === '목록에서 선택' && { count: 0, total: 3 })}
      >
        <ToggleButton
          options={['목록에서 선택', '직접 선택']}
          value={workTimeFilter}
          onChange={(value) => setWorkTimeFilter(value as TFilterMode)}
        />
        {workTimeFilter === '목록에서 선택' && (
          <TagList
            items={WORK_TIME}
            onTagClick={handleWorkTimeTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workTime')
              .map((f) => f.item.label)}
          />
        )}
        {workTimeFilter === '직접 선택' && (
          <div className="flex items-center gap-[8px]">
            <TimePicker
              value={customStartTime}
              onChange={(v) => {
                setCustomStartTime(v);
                if (customEndTime && customEndTime < v) {
                  setCustomEndTime(v);
                }
              }}
              placeholder="시작시간"
            />
            <div className="text-body text-gray-3">~</div>
            <TimePicker
              value={customEndTime}
              onChange={(v) => setCustomEndTime(v)}
              minValue={customStartTime || undefined}
              placeholder="종료시간"
            />
          </div>
        )}
      </FilterContent>
    </>
  );
};

export default WorkPeriod;
