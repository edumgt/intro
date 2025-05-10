# Azure 거버넌스 및 컴플라이언스 상세 설명

## ✅ 1. 거버넌스(Governance)

### 🔎 정의
클라우드 자원의 사용, 관리, 보안, 비용 통제를 위한 정책, 역할, 구조를 설계하고 실행하는 체계

### 🔧 주요 구성 요소

- **Management Group**: 여러 서브스크립션을 묶어 조직 단위의 정책을 적용
- **Subscription**: 비용/부서/환경(Dev, QA, Prod) 별 구분 기준
- **Resource Group**: 논리적으로 리소스를 묶는 단위 (배포/권한 적용 단위)
- **Azure Policy**: 리전 제한, 태그 필수 등 규정 위반 리소스 생성을 방지
- **RBAC (Role-Based Access Control)**: 최소 권한 원칙에 기반한 역할 분리
- **Tags**: 비용/부서/환경 구분을 위한 메타데이터
- **Blueprints**: 정책, 역할, 리소스 템플릿을 패키지화하여 표준 배포
- **Cost Management + Budget**: 예산 설정, 비용 추적, 알림 설정

### 📋 실무 적용 예시

#### 📁 부서별 관리 구조

```
Management Group
├── Finance Subscription
│   └── RG: finance-prod, finance-dev
├── HR Subscription
│   └── RG: hr-app, hr-data
```

#### 📜 정책 적용 예
- Azure Policy: `location == koreaCentral`
- Tag Policy: `{"Department": "required", "Project": "required"}`

#### 👥 RBAC 역할 분리
- 구독 수준: Owner (Infra팀)
- RG 수준: Contributor (개발팀)
- 자원 수준: Reader (모니터링 팀)

---

## ✅ 2. 컴플라이언스(Compliance)

### 🔎 정의
내부 보안 정책, 산업 표준, 국가 법률에 부합하도록 클라우드 환경을 설정하고 감사 가능한 형태로 유지하는 것

### 📚 Azure 도구

- **Azure Policy**: 리소스 준수 여부 평가 및 제한
- **Defender for Cloud**: 보안 점수, 정책 준수도 제공
- **Compliance Manager**: 인증 보고서 확인
- **Audit Logs / Activity Logs**: 활동 기록 추적
- **Customer Lockbox**: Microsoft 직원 접근 통제
- **Private Link / VNet Integration**: 데이터 사설망 구성

### 📜 인증/규제 예시

| 인증/규제 | 설명 |
|-----------|------|
| ISO 27001 | 정보 보안 경영 시스템 |
| GDPR | 유럽 개인정보 보호법 |
| HIPAA | 미국 의료정보 보호법 |
| KISA ISMS | 한국 정보보호 관리체계 |
| FedRAMP | 미국 정부 클라우드 기준 |

---

## ✅ 거버넌스와 컴플라이언스 통합 전략

| 전략 항목 | 설명 |
|-----------|------|
| 초기 설계 시 포함 | 아키텍처 설계 초기부터 정책 포함 |
| 정책 자동화 | Azure Policy, Blueprint로 자동화 |
| 감사 로그 보관 | 최소 90일 이상 저장, SIEM 연동 권장 |
| 최소 권한 원칙 | RBAC + PIM(Azure AD Privileged Identity Management) 병행 |
| 정기 점검 | 분기별 Compliance Score 보고서 작성 |

---

## 🧩 실무 요약

| 항목 | 도구/전략 |
|------|-----------|
| 표준화된 리소스 배포 | Blueprint, ARM, Bicep |
| 리소스 준수 여부 확인 | Azure Policy, Compliance Score |
| 비용 추적/관리 | Cost Management, Budget Alert |
| 사용자 접근 권한 관리 | RBAC, Azure AD Group |
| 규제 인증 대응 | Compliance Manager, 감사 로그, 정책 자동화 |
