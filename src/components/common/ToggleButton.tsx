import { motion } from 'framer-motion';

interface PToggleButton {
  options: {
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleButton = ({ options, value, onChange }: PToggleButton) => {
  return (
    <div className="bg-gray-4 text-body text-gray-2 flex h-[34px] w-full items-center rounded-[4px]">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <motion.div
            key={option.value}
            className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded-[4px] ${
              isSelected ? 'bg-gray-2 text-white' : 'text-gray-2'
            }`}
            whileTap={{
              scale: 0.96,
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            animate={{
              backgroundColor: isSelected ? '#6a6a6a' : '#f8f8f8',
              color: isSelected ? '#ffffff' : '#6a6a6a',
            }}
            transition={{
              backgroundColor: { duration: 0.3, ease: 'easeOut' },
              color: { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 0.25, ease: 'easeOut' },
            }}
            onClick={() => onChange(option.value)}
          >
            {option.value}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ToggleButton;
