# Azure Container Registry (ACR)

Azure Container Registry (ACR)는 Microsoft Azure에서 제공하는 Docker 컨테이너 이미지 저장소입니다. ACR은 퍼블릭 및 프라이빗 컨테이너 이미지를 저장, 관리 및 배포하는 데 사용됩니다.

## 주요 기능
- **프라이빗 레지스트리**: 조직 전용 컨테이너 이미지 저장소
- **Azure Active Directory(AAD) 통합**: 인증 및 권한 관리
- **Webhooks**: CI/CD 파이프라인과 통합 가능
- **Geo-replication**: 전 세계 여러 지역에서 동기화 가능
- **Content Trust**: 이미지 서명 및 보안 강화
- **헬름 차트 저장소**: Kubernetes 헬름 배포를 위한 차트 저장소 기능 지원

## 사용 사례
- CI/CD 파이프라인에서 컨테이너 이미지 빌드 및 저장
- Azure Kubernetes Service(AKS) 또는 Azure App Service에 이미지 배포
- 개발 및 테스트 환경에서 이미지 관리

## SKU 종류
- **Basic**: 소규모 개발팀에 적합
- **Standard**: 대부분의 일반적인 워크로드에 적합
- **Premium**: 고급 보안, 가용성 및 성능 기능 제공 (예: zone redundancy, geo-replication 등)

---

# Azure Virtual Machines (VM)

Azure Virtual Machines는 Azure에서 제공하는 IaaS(Infrastructure as a Service) 서비스로, 클라우드 기반 가상 서버를 제공합니다.

## 주요 기능
- **다양한 OS 지원**: Windows, Linux 등
- **유연한 크기 조정**: 컴퓨팅, 메모리, 스토리지 요구사항에 따라 다양한 VM 시리즈 제공 (예: B, D, E, F, H, N 등)
- **확장성**: 가상 머신 스케일셋(VMSS)을 통해 수평 확장 가능
- **고가용성 옵션**: 가용성 집합(Availability Set), 가용성 영역(Availability Zone) 지원
- **혼합 워크로드 지원**: 웹 서버, 데이터베이스, SAP 등 다양한 워크로드 실행 가능

## 사용 사례
- 개발/테스트 환경 구축
- 클라우드 기반 웹 서버 운영
- 사용자 지정 소프트웨어 실행
- 고성능 컴퓨팅(HPC) 환경 구현

## 비용 관리 및 최적화
- **예약 인스턴스**: 1년 또는 3년 단위 예약으로 최대 72% 절감
- **스팟 인스턴스**: 남는 용량을 저렴하게 활용
- **자동 정지/시작 스크립트**: 비업무 시간 동안 VM 비용 절감

---

_Last Updated: 2025-05-11 07:18:41_
