interface PSlider {
  percent: number;
  AGE_MIN: number;
  AGE_MAX: number;
  age: number;
  setAge: (age: number) => void;
}

const Slider = ({ percent, AGE_MIN, AGE_MAX, age, setAge }: PSlider) => {
  return (
    <>
      <div className="relative h-[28px] select-none">
        <div className="bg-primary-light-2 pointer-events-none absolute top-1/2 left-0 h-[10px] w-full -translate-y-1/2 rounded-full" />
        <div
          className="bg-primary pointer-events-none absolute top-1/2 left-0 h-[10px] -translate-y-1/2 rounded-full"
          style={{ width: `${Math.max(percent, 0)}%` }}
        />
        <input
          aria-label="연령"
          type="range"
          min={AGE_MIN}
          max={AGE_MAX}
          step={1}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="range-thumb pointer-events-auto absolute top-0 left-0 h-[28px] w-full appearance-none bg-transparent outline-none"
        />
      </div>
      <style>
        {`
            .age-slider .range-thumb::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 9999px;
              background: #FF501B;
              box-shadow: 0 0 0 2px #FF501B;
              cursor: pointer;
              margin-top: -2px;
            }
            .age-slider .range-thumb::-moz-range-thumb {
              width: 18px;
              height: 18px;
              border-radius: 9999px;
              background: #FF501B;
              box-shadow: 0 0 0 2px #FF501B;
              cursor: pointer;
            }
            .age-slider .range-thumb::-webkit-slider-runnable-track {
              -webkit-appearance: none;
              background: transparent;
              height: 10px;
            }
            .age-slider .range-thumb::-moz-range-track {
              background: transparent;
              height: 10px;
            }
          `}
      </style>
    </>
  );
};

export default Slider;
