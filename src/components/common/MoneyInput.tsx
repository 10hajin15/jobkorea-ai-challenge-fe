interface MoneyInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MoneyInput = ({ value, onChange, disabled = false }: MoneyInputProps) => {
  const formatWithCommas = (raw: string) => raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const stripNonDigits = (raw: string) => raw.replace(/[^0-9]/g, '');
  const displayValue = value ? formatWithCommas(stripNonDigits(value)) : '';

  return (
    <div className="mt-[10px] flex items-center justify-center gap-[4px]">
      <div
        className={`border-gray-border h-[40px] rounded-[4px] border ${disabled ? 'opacity-50' : ''}`}
      >
        <input
          className="placeholder:text-gray-3 h-full w-full p-[14px] text-end"
          placeholder="0"
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={(e) => {
            const digits = stripNonDigits(e.target.value);
            onChange(digits === '' ? '' : formatWithCommas(digits));
          }}
          disabled={disabled}
        />
      </div>
      <div className="text-body text-gray-2">원 이상</div>
    </div>
  );
};

export default MoneyInput;
