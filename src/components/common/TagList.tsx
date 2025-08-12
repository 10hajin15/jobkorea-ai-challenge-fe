import Tag from './Tag';
import type { TTagClickHandler } from '@/types/filter';

interface PTagListProps {
  items: string[];
  className?: string;
  onTagClick?: TTagClickHandler;
  activeItems?: string[];
}

const TagList = ({
  items,
  className = 'flex flex-wrap gap-[8px]',
  onTagClick = () => {},
  activeItems = [],
}: PTagListProps) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <Tag
          key={item}
          label={item}
          active={activeItems.includes(item)}
          onClick={() => onTagClick(item)}
        />
      ))}
    </div>
  );
};

export default TagList;
