import ArrowBackIcon from '@/assets/icons/ArrowBackIcon.svg';

const Header = () => {
  return (
    <div className="flex h-[54px] items-center gap-[16px] px-[20px]">
      <img src={ArrowBackIcon} alt="뒤로가기" onClick={() => history.back()} />
      <div className="text-header font-semibold">검색조건설정</div>
    </div>
  );
};

export default Header;
