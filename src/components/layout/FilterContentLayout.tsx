import ExceptDetail from '../common/ExceptDetail';

interface PFilterContent {
  title: string;
  count?: number;
  total?: number;
  children: React.ReactNode;
  exceptDetail?: PExceptDetail;
}

interface PExceptDetail {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const FilterContentLayout = ({ title, count, total, children, exceptDetail }: PFilterContent) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <div className="text-title font-semibold tracking-tight">{title}</div>
          {exceptDetail && (
            <ExceptDetail
              label={exceptDetail.label}
              checked={exceptDetail.checked}
              onChange={exceptDetail.onChange}
            />
          )}
        </div>
        {total && (
          <div className="text-caption">
            <span className="text-primary">{count}</span>
            <span className="text-gray-2">/{total}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default FilterContentLayout;
