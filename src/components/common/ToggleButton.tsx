import { motion } from 'framer-motion';

interface PToggleButton {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleButton = ({ options, value, onChange }: PToggleButton) => {
  return (
    <div className="bg-gray-4 text-body text-gray-2 flex h-[34px] w-full items-center rounded-[4px]">
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <motion.div
            key={option}
            className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded-[4px]`}
            initial={{
              backgroundColor: isSelected ? '#6a6a6a' : '#f8f8f8',
              color: isSelected ? '#ffffff' : '#6a6a6a',
            }}
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
            onClick={() => onChange(option)}
          >
            {option}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ToggleButton;
