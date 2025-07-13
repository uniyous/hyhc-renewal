# HYHC Admin Dashboard - 컴포넌트 아키텍처 제안

## 📁 디렉토리 구조

```
src/
├── components/
│   ├── atoms/                    # 최소 단위 컴포넌트
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Loading/
│   │   └── Icon/
│   ├── molecules/                # 조합 컴포넌트
│   │   ├── SearchBox/
│   │   ├── StatusCard/
│   │   ├── MetricCard/
│   │   ├── ActionButtons/
│   │   └── FormField/
│   ├── organisms/                # 복합 컴포넌트
│   │   ├── DataGrid/             # 공통 데이터 그리드
│   │   ├── ChartLayers/          # 차트 레이어들
│   │   ├── PageHeader/           # 페이지 헤더
│   │   ├── FilterPanel/          # 필터 패널
│   │   └── ModalForms/           # 모달 폼들
│   └── templates/                # 페이지 템플릿
│       ├── Layout/
│       ├── PageTemplate/
│       └── DashboardTemplate/
└── pages/
```

## 🎯 핵심 컴포넌트 제안

### 1. 공통 UI Kit (atoms)

#### BaseButton
- 다양한 variant (primary, secondary, danger, ghost)
- 크기 설정 (small, medium, large)
- 로딩 상태 지원
- 아이콘 포함 지원

#### BaseInput
- 다양한 타입 (text, password, number, search)
- 유효성 검사 통합
- 프리픽스/서픽스 아이콘
- 크기 설정

#### StatusBadge
- 상태별 색상 자동 매핑
- 애니메이션 효과
- 아이콘 포함

### 2. Chart Layers (organisms)

#### MetricsChart
- 실시간 메트릭 표시
- 다양한 차트 타입 (선형, 막대, 도넛)
- 시간 범위 선택
- 드릴다운 기능

#### SystemStatusChart
- 시스템 상태 시각화
- CPU, 메모리, 디스크 사용률
- 임계값 알림 표시
- 실시간 업데이트

#### ReplicationChart
- 복제 프로세스 진행률
- 데이터 플로우 시각화
- 오류 상태 표시
- 히스토리 추적

#### ComparisonChart
- 데이터베이스 간 비교
- 성능 벤치마크
- 처리량 비교
- 지연시간 분석

### 3. DataGrid Component

#### AdvancedDataGrid
- 가상화 스크롤링 (성능 최적화)
- 다중 정렬
- 고급 필터링
- 컬럼 고정/숨김/순서변경
- 행 선택 (단일/다중)
- 인라인 편집
- 페이지네이션/무한 스크롤
- 데이터 내보내기 (CSV, Excel)
- 실시간 업데이트 지원

#### SimpleDataTable
- 기본적인 표시 기능
- 정렬 기능
- 간단한 필터
- 페이지네이션

### 4. 특화 레이어들

#### DatabaseLayer
- 데이터베이스 연결 상태
- 스키마 정보 표시
- 테이블 리스트
- 쿼리 실행 결과

#### MonitoringLayer
- 실시간 알림 패널
- 로그 뷰어
- 성능 메트릭
- 알람 히스토리

#### ApplicationLayer
- 앱 등록/관리
- 상태 모니터링
- 설정 관리
- 배포 이력

## 🔧 기술 스택 제안

### Chart 라이브러리
- **Recharts**: React 친화적, 선언적 API
- **Chart.js + react-chartjs-2**: 풍부한 기능, 커스터마이징
- **D3.js**: 고급 시각화, 완전 커스텀

### DataGrid 라이브러리
- **AG Grid Community**: 엔터프라이즈급 기능
- **React Table (TanStack)**: 경량, 헤드리스
- **Ant Design Table**: 기존 UI와 일관성

### 상태 관리
- **React Query/TanStack Query**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리
- **Redux Toolkit**: 복잡한 상태 로직

## 🎨 디자인 시스템

### Theme 구성
```javascript
const theme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#13c2c2',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.06)',
    md: '0 4px 8px rgba(0,0,0,0.1)',
    lg: '0 8px 16px rgba(0,0,0,0.15)',
  }
}
```

## 📊 컴포넌트 우선순위

### Phase 1 (필수)
1. **AdvancedDataGrid** - 모든 페이지에서 사용
2. **MetricsChart** - 대시보드 핵심 기능
3. **PageHeader** - 페이지 일관성
4. **StatusBadge** - 상태 표시

### Phase 2 (중요)
1. **SystemStatusChart** - 모니터링 기능
2. **FilterPanel** - 데이터 필터링
3. **ModalForms** - CRUD 작업
4. **ReplicationChart** - 복제 상태 시각화

### Phase 3 (향상)
1. **ComparisonChart** - 분석 기능
2. **DatabaseLayer** - 전문 기능
3. **MonitoringLayer** - 고급 모니터링
4. **ApplicationLayer** - 앱 관리

이 아키텍처는 확장성과 재사용성을 고려하여 설계되었으며, 단계적으로 구현할 수 있도록 우선순위를 제안했습니다.