## JobKorea AI Challenge FE

알바몬 검색조건설정 모바일 페이지 UI 구현한 프로젝트입니다.

> 참고 링크: [AI Challenge 과제 설명](https://xg18kywe.ninehire.site/job_posting/u3mVklkH)

- 개발기간: 2025.08.11 ~ (진행중)
- 배포 주소: https://jobkorea-ai-challenge-fe.netlify.app/

## 문서 📑

### 분석

- 기존 검색 필터 분석: [알바몬 분석](https://palm-flax-489.notion.site/25099198aab2806697f7c26b42df4554?source=copy_link)

### 설계

- 검색 필터 설계: [검색 필터 설계](https://palm-flax-489.notion.site/25399198aab28044bea9c3d20b11759b?source=copy_link)
- UI/UX 설계: [UI/UX 설계](https://palm-flax-489.notion.site/UI-UX-25399198aab280aa8cdcf933f5aa405e?source=copy_link)
- AI IDE 챗로그: [AI IDE 챗로그](https://palm-flax-489.notion.site/AI-IDE-25399198aab280e7afa8f0ac21114e44?source=copy_link)

### 개발

- 개발 일지: [개발 일지](https://palm-flax-489.notion.site/devlog?v=24d99198aab2801a822c000c8b8cddc5&source=copy_link)

## 기술 스택 ⛏

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=20232a"> 
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/framer motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">

## 프로젝트 구조 🗂

```
src/
├── assets/                    # 정적 자산 (이미지, 아이콘 등)
│   └── icons/
│       ├── ArrowBackIcon.svg
│       └── SearchIcon.svg
├── components/                # React 컴포넌트들
│   ├── Category/              # 필터 카테고리별 메인 컴포넌트
│   │   ├── DetailCondition.tsx
│   │   ├── JobCategory.tsx
│   │   ├── WorkLocation.tsx
│   │   └── WorkPeriod.tsx
│   ├── common/                # 공통 UI 컴포넌트
│   │   ├── Tab/               # 탭 네비게이션 관련
│   │   │   ├── TabContext.tsx
│   │   │   └── TabNavigation.tsx
│   │   ├── Cascader.tsx
│   │   ├── Chip.tsx
│   │   ├── ExceptDetail.tsx
│   │   ├── FilterChipBar.tsx
│   │   ├── Header.tsx
│   │   ├── KeyWord.tsx
│   │   ├── KeywordModal.tsx
│   │   ├── Modal.tsx
│   │   ├── ModeSection.tsx
│   │   ├── MoneyInput.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SearchResult.tsx
│   │   ├── SearchResultButton.tsx
│   │   ├── SelectedFilters.tsx
│   │   ├── Slider.tsx
│   │   ├── Tag.tsx
│   │   ├── TagList.tsx
│   │   ├── TimePicker.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── ToastMessage.tsx
│   │   └── ToggleButton.tsx
│   ├── icons/                 # SVG 아이콘 컴포넌트
│   │   ├── ClosedIcon.tsx
│   │   └── TabIcon.tsx
│   └── layout/                # 레이아웃 컴포넌트
│       ├── FilterContentLayout.tsx
│       └── MainLayout.tsx
├── constants/                 # 상수 정의
│   ├── detail.ts
│   ├── period.ts
│   └── tab.ts
├── fixtures/                  # 정적 데이터 (JSON)
│   ├── area.json                 # 지역 데이터
│   ├── condition.json            # 근무조건 데이터
│   └── job.json                  # 업직종 데이터
├── hooks/                     # 커스텀 React 훅
│   └── useToast.ts
├── pages/                     # 페이지 컴포넌트
│   └── FilterPage.tsx
├── store/                     # 상태 관리 (Zustand)
│   ├── useFilterStore.ts
│   └── useToastStore.ts
├── styles/                    # 전역 스타일 파일
│   └── globalStyles.css
├── types/                     # TypeScript 타입 정의
│   ├── cascader.ts
│   ├── chip.ts
│   ├── filter.ts
│   ├── tab.ts
│   └── toast.ts
├── utils/                     # 유틸리티 함수
│   └── cascader.ts
├── App.tsx
└── main.tsx
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

## 주요 기능

| 근무지역 | 업직종 | 근무기간 | 상세조건 |
| -------- | ------ | -------- | -------- |
|<img src="https://github.com/10hajin15/jobkorea-ai-challenge-fe/blob/main/readme/%EA%B7%BC%EB%AC%B4%EC%A7%80%EC%97%AD.png" />|<img src="https://github.com/10hajin15/jobkorea-ai-challenge-fe/blob/main/readme/%EC%97%85%EC%A7%81%EC%A2%85.png" />|<img src="https://github.com/10hajin15/jobkorea-ai-challenge-fe/blob/main/readme/%EA%B7%BC%EB%AC%B4%EA%B8%B0%EA%B0%84.png" />|<img src="https://github.com/10hajin15/jobkorea-ai-challenge-fe/blob/main/readme/%EC%83%81%EC%84%B8%EC%A1%B0%EA%B1%B4.png" />|

- 탭 네비게이션: 근무지역 / 업직종 / 근무기간 / 상세조건
- 상단 선택 칩 영역: 모든 탭의 선택 항목을 통합 표시/개별 삭제
- 전체 초기화: 헤더의 ‘초기화’ 클릭 시 전체 조건 초기화
- 하단 결과 버튼: “000건의 결과보기” (연동 지점)
- 데이터: `src/fixtures`
