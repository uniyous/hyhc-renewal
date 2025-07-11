# HYHC Renewal Project

데이터베이스 복제 서비스를 위한 전체 프로젝트입니다.

## 프로젝트 구조

```
/
├── services/
│   ├── admin-dashboard/    # 프론트엔드 관리 대시보드 (React + Vite)
│   └── api-server/         # 백엔드 API 서버 (Spring Boot) - 예정
└── README.md
```

## 서비스 설명

### Admin Dashboard (services/admin-dashboard)
- **기술 스택**: React 18, Vite, Redux Toolkit, Ant Design
- **기능**: 
  - 어플리케이션 관리
  - 데이터베이스 관리 (원본/대상)
  - 연결 관리
  - 테이블 매핑
  - 모니터링
  - 설정 관리
- **다국어 지원**: 한국어, 영어, 중국어

### API Server (services/api-server) - 예정
- **기술 스택**: Spring Boot (예정)
- **기능**: 
  - 데이터베이스 연결 관리
  - 데이터 복제 처리
  - Kafka 연동
  - K8s 환경 지원

## 개발 환경 설정

### Admin Dashboard
```bash
cd services/admin-dashboard
npm install
npm run dev
```

### API Server (예정)
```bash
cd services/api-server
# Spring Boot 설정 예정
```

## 시스템 아키텍처

1. **프론트엔드**: Admin Dashboard에서 시스템 관리
2. **백엔드**: API Server에서 비즈니스 로직 처리
3. **데이터 처리**: K8s 환경의 Pod들이 Kafka를 통해 데이터 복제 작업 수행
4. **데이터베이스**: 원본 데이터베이스 → 대상 데이터베이스로 복제