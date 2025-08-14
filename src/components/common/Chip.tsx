import ClosedIcon from '@/components/icons/ClosedIcon';
import type { ChipProps } from '@/types/chip';

const COLOR_CLASS = {
  primary: 'bg-primary-light-2 text-primary border border-primary-light',
  gray: 'bg-gray-4 text-gray-2 border border-gray-border',
};

const REMOVE_ICON_COLOR_CLASS = {
  primary: '#ff501b',
  gray: '#6a6a6a',
};

const Chip = ({ label, color = 'gray', onRemove }: ChipProps) => {
  return (
    <div
      className={`${COLOR_CLASS[color]} inline-flex h-[22px] shrink-0 items-center gap-[6px] rounded-[4px] px-[10px] whitespace-nowrap`}
    >
      <span className="text-caption leading-[12px] whitespace-nowrap">{label}</span>
      <div onClick={onRemove} className="flex items-center justify-center">
        <ClosedIcon
          className="cursor-pointer"
          color={REMOVE_ICON_COLOR_CLASS[color]}
          width={12}
          height={12}
        />
      </div>
    </div>
  );
};

export default Chip;
