import type { CascaderOption } from '@/types/cascader';

export interface SearchResultItem {
  id: string;
  fullLabel: string;
  leafLabel: string;
  pathLabels: string[];
}

export const flattenLeafPaths = (
  options: CascaderOption[],
  parentLabels: string[] = [],
): SearchResultItem[] => {
  const result: SearchResultItem[] = [];

  for (const option of options) {
    const currentLabels = [...parentLabels, option.label];

    if (!option.children || option.children.length === 0) {
      result.push({
        id: option.value,
        fullLabel: currentLabels.join(' '),
        leafLabel: option.label,
        pathLabels: currentLabels,
      });
    } else {
      result.push(...flattenLeafPaths(option.children, currentLabels));
    }
  }

  return result;
};
