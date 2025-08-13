import { useState } from 'react';

interface ExceptDetailProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ExceptDetail = ({ label, checked = false, onChange }: ExceptDetailProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div
      className={`inline-flex cursor-pointer items-center gap-[4px] rounded px-2 select-none`}
      onClick={handleClick}
    >
      <div
        className={`flex h-[12px] w-[12px] items-center justify-center rounded-full border ${
          isChecked ? 'border-gray-2' : 'border-gray-3'
        }`}
      >
        {isChecked && <div className="bg-gray-2 h-[6px] w-[6px] rounded-full" />}
      </div>
      <span className="text-caption text-gray-2">{label}</span>
    </div>
  );
};

export default ExceptDetail;
