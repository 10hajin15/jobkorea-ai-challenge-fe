export interface CascaderOption {
  label: string;
  value: string;
  children?: CascaderOption[];
}

export interface CascaderValue {
  [depth: number]: string;
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: CascaderValue;
  onChange?: (value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  placeholder?: string[];
  maxDepth: number;
  selectedLeafLabels?: string[];
}
