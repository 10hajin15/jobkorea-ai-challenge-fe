import FilterContent from '@/components/layout/FilterContent';
import { DAYS, WORK_DAYS, WORK_PERIOD, WORK_TIME } from '@/constants/period';
import TagList from '@/components/common/TagList';
import ToggleButton from '@/components/common/ToggleButton';
import TimePicker from '@/components/common/TimePicker';
import { useState } from 'react';
import type { TFilterMode, TTagClickHandler } from '@/types/filter';

const WorkPeriod = () => {
  const [workDaysFilter, setWorkDaysFilter] = useState<TFilterMode>('목록에서 선택');
  const [workTimeFilter, setWorkTimeFilter] = useState<TFilterMode>('목록에서 선택');

  const [selectedWorkPeriod, setSelectedWorkPeriod] = useState<string[]>([]);
  const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([]);
  const [selectedWorkTime, setSelectedWorkTime] = useState<string[]>([]);

  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');

  const handleWorkDaysTagClick: TTagClickHandler = (workDay) => {
    // TODO: 근무요일 선택 로직 구현
    console.log('Work day selected:', workDay);
  };

  const handleWorkTimeTagClick: TTagClickHandler = (workTime) => {
    // TODO: 근무시간 선택 로직 구현
    console.log('Work time selected:', workTime);
  };

  const handleCustomTimeChange = (startTime: string, endTime: string) => {
    setCustomStartTime(startTime);
    setCustomEndTime(endTime);
    console.log('Custom work time:', { startTime, endTime });
  };

  return (
    <>
      <FilterContent title="근무기간" count={1} total={6}>
        <TagList
          items={WORK_PERIOD}
          onTagClick={(period) => setSelectedWorkPeriod([...selectedWorkPeriod, period])}
          activeItems={selectedWorkPeriod}
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
            activeItems={selectedWorkDays}
          />
        )}
        {workDaysFilter === '직접 선택' && (
          <TagList
            items={DAYS}
            className="flex flex-wrap justify-end gap-[8px]"
            onTagClick={handleWorkDaysTagClick}
            activeItems={selectedWorkDays}
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
            activeItems={selectedWorkTime}
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
