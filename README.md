## JobKorea AI Challenge FE

React + TypeScript + Vite 기반의 알바몬 검색조건설정(모바일) UI 구현 프로젝트입니다.

- 참고 링크: [알바몬 검색조건설정(모바일)](https://m.albamon.com/jobs/search/detail-conditions)

## 문서

- 구현 링크: [AI Challenge 프로젝트](https://jobkorea-ai-challenge-fe.netlify.app/)

### 분석

- 기존 검색 필터 분석: [알바몬 분석](https://palm-flax-489.notion.site/25099198aab2806697f7c26b42df4554?source=copy_link)

### 설계

- 검색 필터 설계: [검색 필터 설계](https://palm-flax-489.notion.site/25399198aab28044bea9c3d20b11759b?source=copy_link)
- UI/UX 설계: [UI/UX 설계](https://palm-flax-489.notion.site/UI-UX-25399198aab280aa8cdcf933f5aa405e?source=copy_link)
- AI IDE 챗로그: [AI IDE 챗로그](https://palm-flax-489.notion.site/AI-IDE-25399198aab280e7afa8f0ac21114e44?source=copy_link)

## 기술 스택

- React 19, TypeScript, Vite
- Zustand (전역 상태관리)
- Tailwind CSS (유틸리티 스타일)
- Framer Motion (애니메이션)
- ESLint + Prettier (코드 품질/스타일)

## 프로젝트 구조

```
src/
  assets/
    icons/                    # SVG 아이콘
  components/
    Category/
      WorkLocation.tsx        # 근무지역
      JobCategory.tsx         # 업직종
      WorkPeriod.tsx          # 근무기간/요일/시간
      DetailCondition.tsx     # 고용형태/급여/성별/연령/키워드
    common/
      Cascader.tsx            # 계층형 선택
      SearchInput.tsx         # 검색 입력
      SearchResult.tsx        # 검색 결과
      Tag.tsx / TagList.tsx   # 태그/칩 UI
      FilterChipBar.tsx       # 하단 선택 칩 바
      ToggleButton.tsx        # 모드 전환
      TimePicker.tsx          # 시간 드롭다운(30분 단위)
      Slider.tsx              # 연령 슬라이더
      ModeSection.tsx         # 목록/직접 선택 섹션
      ToastContainer.tsx      # 토스트 컨테이너
      Tab/
        TabContext.tsx
        TabNavigation.tsx
    layout/
      MainLayout.tsx
      FilterContentLayout.tsx
  constants/
    detail.ts                 # 고용형태/급여조건
    period.ts                 # 근무기간/요일/시간
    tab.ts                    # 메인 탭
  fixtures/
    cascader-data.json        # 지역/업직종 계층 데이터
  hooks/
    useToast.ts               # 토스트 훅
  pages/
    FilterPage.tsx            # 메인 페이지
  store/
    useFilterStore.ts         # 필터 상태(Zustand)
  styles/
    globalStyles.css
  types/
    cascader.ts, filter.ts 등
  utils/
    cascader.ts               # 경로 평면화 유틸(검색)
```

## 실행 방법

### 사전 요구사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
npm install
npm run dev
```

### 스크립트

- 개발 서버: `npm run dev`
- 린트: `npm run lint`
- 프로덕션 빌드: `npm run build`
- 빌드 프리뷰: `npm run preview`

## 기능 개요(요약)

- 탭 네비게이션: 근무지역 / 업직종 / 근무기간 / 상세조건
- 상단 선택 칩 영역: 모든 탭의 선택 항목을 통합 표시/개별 삭제
- 전체 초기화: 헤더의 ‘초기화’ 클릭 시 전체 조건 초기화
- 하단 결과 버튼: “000건의 결과보기” (연동 지점)
- 데이터: `src/fixtures`
