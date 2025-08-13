import { useEffect, useRef } from 'react';
import type { CascaderOption, CascaderValue, PCascaderProps } from '../../types/cascader';

const Cascader = ({
  options = [],
  value = {},
  onChange = () => {},
  placeholder = [''],
  maxDepth = 3,
  selectedLeafLabels = [],
}: PCascaderProps) => {
  const getSelectedOption = (depth: number): CascaderOption | null => {
    if (depth === 0) {
      return options.find((opt) => opt.value === value[0]) || null;
    }

    const parent = getSelectedOption(depth - 1);
    if (!parent?.children) return null;

    return parent.children.find((opt) => opt.value === value[depth]) || null;
  };

  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    if (Object.keys(value).length === 0 && options.length > 0) {
      initializedRef.current = true;
      onChange({ 0: options[0].value }, [options[0]]);
    }
  }, [options, value, onChange]);

  const handleOptionSelect = (option: CascaderOption, depth: number) => {
    const newValue: CascaderValue = {};
    const newSelectedOptions: CascaderOption[] = [];

    for (let i = 0; i <= depth; i++) {
      if (i < depth) {
        newValue[i] = value[i];
        const selected = getSelectedOption(i);
        if (selected) newSelectedOptions.push(selected);
      } else {
        newValue[i] = option.value;
        newSelectedOptions.push(option);
      }
    }

    onChange(newValue, newSelectedOptions);
  };

  const getOptionsForDepth = (depth: number): CascaderOption[] => {
    if (depth === 0) return options;

    const parent = getSelectedOption(depth - 1);
    return parent?.children || [];
  };

  const getDepthStyle = (depth: number, isSelected: boolean, option: CascaderOption) => {
    const isLeaf = !option.children || option.children.length === 0;
    const isPersistSelected = isLeaf && selectedLeafLabels.includes(option.label);

    const effectiveSelected = isLeaf ? isPersistSelected : isSelected;

    if (!effectiveSelected) return 'text-gray-2';

    if (depth === 0) return 'bg-primary text-white font-semibold';
    if (depth === maxDepth - 1) return 'text-primary font-semibold';
    return 'bg-primary-light-2 text-primary font-semibold';
  };

  return (
    <div className="border-gray-border flex h-full border-t">
      {Array.from({ length: maxDepth }, (_, depth) => {
        const optionsAtDepth = getOptionsForDepth(depth);
        const shouldShowOptions = depth === 0 || value[depth - 1] !== undefined;

        return (
          <div
            key={depth}
            className="border-gray-border flex flex-1 flex-col"
            style={{ borderRightWidth: depth < maxDepth - 1 ? '1px' : '0' }}
          >
            <div className="border-gray-border bg-gray-4 text-gray-2 text-caption flex h-[38px] items-center justify-center border-b font-semibold">
              {placeholder[depth]}
            </div>
            <div className="scrollbar-hide flex-1 overflow-y-auto">
              {shouldShowOptions &&
                optionsAtDepth.map((option) => (
                  <div
                    key={option.value}
                    className={`text-body flex h-[42px] w-full cursor-pointer items-center px-[20px] transition-colors ${getDepthStyle(
                      depth,
                      value[depth] === option.value,
                      option,
                    )}`}
                    onClick={() => handleOptionSelect(option, depth)}
                  >
                    {option.label}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cascader;
