import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  minHour?: number;
  maxHour?: number;
  minValue?: string;
  placeholder?: string;
  placement?: 'auto' | 'top' | 'bottom';
  className?: string;
}

function toMinutes(time: string | undefined): number | undefined {
  if (!time) return undefined;
  const [h, m] = time.split(':').map((v) => Number(v));
  if (Number.isNaN(h) || Number.isNaN(m)) return undefined;
  return h * 60 + m;
}

function generateTimes(minHour: number, maxHour: number): string[] {
  const times: string[] = [];
  for (let hour = minHour; hour <= maxHour; hour += 1) {
    for (const minute of [0, 30]) {
      const hh = String(hour).padStart(2, '0');
      const mm = String(minute).padStart(2, '0');
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
}

const CaretDown = ({ className = 'fill-gray-3' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const TimePicker = ({
  value = '',
  onChange = () => {},
  minHour = 0,
  maxHour = 23,
  minValue,
  placeholder = '시간 선택',
  placement = 'auto',
  className,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPlacement, setMenuPlacement] = useState<'top' | 'bottom'>('bottom');
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const allTimes = useMemo(() => generateTimes(minHour, maxHour), [minHour, maxHour]);
  const minMinutes = toMinutes(minValue);

  const options = useMemo(() => {
    if (minMinutes === undefined) return allTimes;
    return allTimes.filter((t) => (toMinutes(t) ?? 0) >= minMinutes);
  }, [allTimes, minMinutes]);

  const handleToggle = () => {
    const nextOpen = !isOpen;
    if (nextOpen && wrapperRef.current) {
      if (placement === 'auto') {
        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        setMenuPlacement(spaceBelow < 240 && spaceAbove > spaceBelow ? 'top' : 'bottom');
      } else {
        setMenuPlacement(placement);
      }
    }
    setIsOpen(nextOpen);
  };

  const selectValue = (t: string) => {
    onChange(t);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className ?? ''}`}>
      <button
        type="button"
        onClick={handleToggle}
        className="border-gray-border text-gray-2 hover:bg-gray-5 h-[44px] w-full rounded-[6px] border px-[12px] text-left"
      >
        <div className="flex items-center justify-between">
          <span className={value ? 'text-body text-gray-1' : 'text-body text-gray-3'}>
            {value || placeholder}
          </span>
          <CaretDown />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`border-gray-border absolute z-10 max-h-[220px] w-full overflow-auto rounded-[6px] border bg-white shadow-md ${
              menuPlacement === 'bottom' ? 'top-full mt-[6px]' : 'bottom-full mb-[6px]'
            }`}
            initial={{ opacity: 0, y: menuPlacement === 'bottom' ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: menuPlacement === 'bottom' ? 6 : -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="hover:bg-gray-5 text-body text-gray-1 w-full px-[12px] py-[10px] text-left"
                onClick={() => selectValue(opt)}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker;
