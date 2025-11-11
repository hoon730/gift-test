# 센스 있는 선물 큐레이션 - Web Application

키워드 조합으로 찾는 맞춤형 선물 추천 서비스

## 기술 스택

### 프론트엔드
- **Next.js 16** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 기반 CSS
- **MUI (Material-UI) 7** - UI 컴포넌트 라이브러리
- **Emotion 11** - CSS-in-JS

### 상태 관리 & 데이터 페칭
- **Zustand** - 경량 상태 관리
- **TanStack Query (React Query)** - 서버 상태 관리
- **React Hook Form** - 폼 관리

### 백엔드 & 인프라
- **Firebase** - 인증, Firestore, Storage

### 아키텍처
- **FSD (Feature-Sliced Design)** - 모듈화된 프로젝트 구조

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 글로벌 스타일
│
├── shared/                 # 공용 코드
│   ├── ui/                # 재사용 가능한 UI 컴포넌트
│   ├── lib/               # 유틸리티 및 라이브러리 (Firebase 등)
│   └── types/             # 전역 타입 정의
│
├── entities/               # 비즈니스 엔티티
│   ├── user/              # 사용자 관련
│   ├── gift/              # 선물 관련
│   └── bookmark/          # 북마크 관련
│
├── features/               # 기능 단위 모듈
│   ├── auth/              # 인증 (로그인/회원가입)
│   ├── giftSearch/        # 선물 검색
│   ├── bookmark/          # 북마크
│   └── share/             # 공유
│
└── widgets/                # 페이지 구성 블록
```

## 시작하기

### 1. 환경 변수 설정

`.env.example`을 복사하여 `.env.local` 파일을 생성하고 Firebase 설정을 입력하세요:

```bash
cp .env.example .env.local
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 주요 명령어

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm lint         # ESLint 검사
pnpm type-check   # TypeScript 타입 체크
```

## Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 활성화
3. Storage 활성화
4. Authentication 활성화 (Google, Apple, Kakao)
5. 웹 앱 등록 후 설정 정보를 `.env.local`에 입력

## 배포

### Vercel 배포

```bash
# Vercel CLI 설치
pnpm add -g vercel

# 배포
vercel
```

## 개발 가이드

### FSD 아키텍처 규칙

1. **shared**: 재사용 가능한 코드만 배치
2. **entities**: 비즈니스 로직이 없는 순수한 데이터 모델
3. **features**: 독립적인 기능 단위로 분리
4. **widgets**: 여러 features를 조합한 UI 블록
5. **app**: 라우팅 및 전역 설정만 포함

### 코딩 컨벤션

- TypeScript strict 모드 사용
- ESLint + Prettier 규칙 준수
- 컴포넌트는 함수형으로 작성
- Hooks 사용 권장

## 라이센스

ISC
