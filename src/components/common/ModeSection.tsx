import type { FilterMode } from '@/types/filter';
import FilterContentLayout from '../layout/FilterContentLayout';
import ToggleButton from './ToggleButton';

const MODE_OPTIONS: FilterMode[] = ['목록에서 선택', '직접 선택'];

interface ModeSectionProps {
  title: string;
  mode: FilterMode;
  setMode: (m: FilterMode) => void;
  activeCount: number;
  total: number;
  onModeChange: (next: FilterMode) => void;
  listContent: React.ReactNode;
  directContent: React.ReactNode;
}

const ModeSection = ({
  title,
  mode,
  setMode,
  activeCount,
  total,
  onModeChange,
  listContent,
  directContent,
}: ModeSectionProps) => {
  return (
    <FilterContentLayout
      title={title}
      {...(mode === '목록에서 선택' && { count: activeCount, total })}
    >
      <ToggleButton
        options={MODE_OPTIONS}
        value={mode}
        onChange={(value) => {
          if (value !== mode) {
            onModeChange(value as FilterMode);
          }
          setMode(value as FilterMode);
        }}
      />
      {mode === '목록에서 선택' ? listContent : directContent}
    </FilterContentLayout>
  );
};

export default ModeSection;
