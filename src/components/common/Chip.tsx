import ClosedIcon from '@/components/icons/ClosedIcon';

interface PChip {
  label: string;
  color: 'primary' | 'gray';
  onRemove: () => void;
}

const COLOR_CLASS = {
  primary: 'bg-primary-light-2 text-primary',
  gray: 'bg-gray-4 text-gray-2',
};

const REMOVE_ICON_COLOR_CLASS = {
  primary: '#ff501b',
  gray: '#6a6a6a',
};

const Chip = ({ label, color, onRemove }: PChip) => {
  return (
    <div
      className={`${COLOR_CLASS[color]} inline-flex h-[22px] items-center gap-[6px] rounded-[4px] px-[10px] py-[4px]`}
    >
      <span className="text-caption">{label}</span>
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
