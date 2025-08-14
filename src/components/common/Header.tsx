import ArrowBackIcon from '@/assets/icons/ArrowBackIcon.svg';
import useFilterStore from '@/store/useFilterStore';

const Header = () => {
  const reset = useFilterStore((s) => s.reset);

  return (
    <div className="flex h-[54px] items-center gap-[16px] px-[20px]">
      <img src={ArrowBackIcon} alt="뒤로가기" onClick={() => history.back()} />
      <div className="text-header font-semibold">검색조건설정</div>
      <div className="flex flex-1 justify-end" onClick={reset}>
        <div className="text-caption text-gray-2 cursor-pointer">초기화</div>
      </div>
    </div>
  );
};

export default Header;
