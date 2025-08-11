interface PTag {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TAG_COLOR_CLASS = {
  active: 'bg-primary-light-2 text-primary border border-primary',
  inactive: 'bg-gray-4 text-gray-2 border border-gray-4',
};

const Tag = ({ label, active, onClick }: PTag) => {
  return (
    <div
      onClick={onClick}
      className={`${TAG_COLOR_CLASS[active ? 'active' : 'inactive']} inline-flex h-[32px] items-center rounded-full px-[10px] py-[8px]`}
    >
      <label className="text-body">{label}</label>
    </div>
  );
};

export default Tag;
