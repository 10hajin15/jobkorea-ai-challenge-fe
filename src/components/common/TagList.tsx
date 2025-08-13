import Tag from './Tag';
import type { TagClickHandler } from '@/types/filter';

interface TagListProps {
  items: string[];
  className?: string;
  onTagClick?: TagClickHandler;
  activeItems?: string[];
}

const TagList = ({
  items,
  className = 'flex flex-wrap gap-[8px]',
  onTagClick = () => {},
  activeItems = [],
}: TagListProps) => {
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
