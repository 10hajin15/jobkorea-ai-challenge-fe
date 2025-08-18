interface TagProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TAG_COLOR_CLASS = {
  active: 'bg-primary-light-2 text-primary border border-primary',
  inactive: 'bg-gray-4 text-gray-2 border border-gray-4',
};

import { motion } from 'framer-motion';

const Tag = ({ label, active, onClick }: TagProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`${TAG_COLOR_CLASS[active ? 'active' : 'inactive']} inline-flex h-[32px] items-center rounded-full px-[10px] py-[8px]`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <label className="text-body">{label}</label>
    </motion.div>
  );
};

export default Tag;
