import FilterContent from '@/components/layout/FilterContentLayout';
import { DAYS, WORK_DAYS, WORK_PERIOD, WORK_TIME } from '@/constants/period';
import TagList from '@/components/common/TagList';
import TimePicker from '@/components/common/TimePicker';
import { useEffect, useState, useCallback } from 'react';
import type { FilterMode, TagClickHandler } from '@/types/filter';
import useFilterStore from '@/store/useFilterStore';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';
import ModeSection from '../common/ModeSection';
import { useToast } from '@/hooks/useToast';

const WorkPeriod = () => {
  const [workDaysFilter, setWorkDaysFilter] = useState<FilterMode>('목록에서 선택');
  const [workTimeFilter, setWorkTimeFilter] = useState<FilterMode>('목록에서 선택');

  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const { toggle, getSelectedByTab, remove, add } = useFilterStore();
  const { warning } = useToast();

  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');

  const syncDirectWorkTime = useCallback(() => {
    if (workTimeFilter !== '직접 선택') return;
    const current = getSelectedByTab(tabId).filter((f) => f.item.group === 'workTime');

    current.forEach((f) => remove(tabId, f.item.id));

    if (customStartTime && customEndTime) {
      const id = `workTime:${customStartTime}-${customEndTime}`;
      const label = `${customStartTime}~${customEndTime}`;
      add(tabId, { id, label, group: 'workTime' }, { group: 'workTime', groupLimit: 1 });
    }
  }, [workTimeFilter, customStartTime, customEndTime, tabId, getSelectedByTab, remove, add]);

  useEffect(() => {
    syncDirectWorkTime();
  }, [customStartTime, customEndTime, workTimeFilter]);

  const handleWorkDaysTagClick: TagClickHandler = (workDay) => {
    const success = toggle(
      tabId,
      { id: `workDays:${workDay}`, label: workDay, group: 'workDays' },
      workDaysFilter === '목록에서 선택'
        ? { group: 'workDays', groupLimit: 3 }
        : { group: 'workDays' },
    );
    if (!success && workDaysFilter === '목록에서 선택') {
      warning('근무요일은 최대 3개까지 선택할 수 있습니다.');
    }
  };

  const handleWorkTimeTagClick: TagClickHandler = (workTime) => {
    const success = toggle(
      tabId,
      { id: `workTime:${workTime}`, label: workTime, group: 'workTime' },
      workTimeFilter === '목록에서 선택'
        ? { group: 'workTime', groupLimit: 3 }
        : { group: 'workTime' },
    );
    if (!success && workTimeFilter === '목록에서 선택') {
      warning('근무시간은 최대 3개까지 선택할 수 있습니다.');
    }
  };

  return (
    <>
      <FilterContent
        title="근무기간"
        count={getSelectedByTab(tabId).filter((f) => f.item.group === 'workPeriod').length}
        total={6}
      >
        <TagList
          items={WORK_PERIOD}
          onTagClick={(period: string) => {
            const success = toggle(
              tabId,
              { id: `workPeriod:${period}`, label: period, group: 'workPeriod' },
              {
                group: 'workPeriod',
                groupLimit: 6,
              },
            );
            if (!success) {
              warning('근무기간은 최대 6개까지 선택할 수 있습니다.');
            }
          }}
          activeItems={getSelectedByTab(tabId)
            .filter((f) => f.item.group === 'workPeriod')
            .map((f) => f.item.label)}
        />
      </FilterContent>

      <ModeSection
        title="근무요일"
        mode={workDaysFilter}
        setMode={setWorkDaysFilter}
        activeCount={getSelectedByTab(tabId).filter((f) => f.item.group === 'workDays').length}
        total={3}
        onModeChange={(next) => {
          if (next !== workDaysFilter) {
            getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workDays')
              .forEach((f) => remove(tabId, f.item.id));
          }
        }}
        listContent={
          <TagList
            items={WORK_DAYS}
            onTagClick={handleWorkDaysTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workDays')
              .map((f) => f.item.label)}
          />
        }
        directContent={
          <TagList
            items={DAYS}
            className="flex flex-wrap justify-end gap-[8px]"
            onTagClick={handleWorkDaysTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workDays')
              .map((f) => f.item.label)}
          />
        }
      />

      <ModeSection
        title="근무시간"
        mode={workTimeFilter}
        setMode={setWorkTimeFilter}
        activeCount={getSelectedByTab(tabId).filter((f) => f.item.group === 'workTime').length}
        total={3}
        onModeChange={(next) => {
          if (next !== workTimeFilter) {
            getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workTime')
              .forEach((f) => remove(tabId, f.item.id));
            setCustomStartTime('');
            setCustomEndTime('');
          }
        }}
        listContent={
          <TagList
            items={WORK_TIME}
            onTagClick={handleWorkTimeTagClick}
            activeItems={getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'workTime')
              .map((f) => f.item.label)}
          />
        }
        directContent={
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
        }
      />
    </>
  );
};

export default WorkPeriod;
