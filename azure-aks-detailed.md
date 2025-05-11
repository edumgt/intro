
# Azure Kubernetes Service (AKS) 상세 설명

---

## ✅ AKS란?

**Azure Kubernetes Service (AKS)**는 Microsoft Azure에서 제공하는 **완전관리형 Kubernetes 클러스터 서비스**입니다.  
사용자는 컨테이너 오케스트레이션을 직접 관리할 필요 없이 애플리케이션 배포, 확장, 운영을 효율적으로 수행할 수 있습니다.

---

## ✅ AKS의 주요 구성 요소

| 구성 요소 | 설명 |
|-----------|------|
| **컨트롤 플레인(Control Plane)** | Azure가 관리. 클러스터 상태 모니터링, 작업 스케줄링 등 수행 |
| **노드 풀(Node Pool)** | 실제 애플리케이션이 실행되는 VM 노드들. 사용자가 직접 구성 |
| **Pod** | 컨테이너가 실행되는 기본 단위. AKS가 Kubernetes에 따라 자동 관리 |
| **서비스(Service)** | Pod에 대한 네트워크 액세스를 안정적으로 제공 |
| **Persistent Volume (PV)** | 스토리지를 Pod에 연결해 상태 저장 가능 |
| **Helm** | Kubernetes 앱의 패키징 및 배포 도구 (AKS에서도 사용 가능) |

---

## ✅ AKS의 주요 기능 및 이점

### 🔹 1. 완전관리형 Control Plane
- Kubernetes 마스터 노드 관리 불필요
- 자동 패치, 업그레이드, 보안 관리 포함

### 🔹 2. 탄력적 확장
- 수평적 노드 자동 스케일링 (Horizontal Pod Autoscaler)
- Cluster Autoscaler 기능으로 VM 자동 증감

### 🔹 3. Azure 네이티브 통합
- Azure AD, RBAC, Managed Identity 통합
- Azure Monitor, Log Analytics 기반 모니터링
- Azure Policy, Azure DevOps, GitHub Actions 등과 연동 가능

### 🔹 4. 보안 기능
- Private Cluster (내부 전용 클러스터)
- Azure Defender for Kubernetes
- 네트워크 정책, Pod 보안 정책 지원

---

## ✅ AKS 사용 사례

| 분야 | 설명 |
|------|------|
| 마이크로서비스 | 다양한 서비스 단위를 Pod로 관리하고 CI/CD 자동화 |
| 배치 처리 | 비동기 작업, 대규모 데이터 처리 워크로드 |
| AI/ML 파이프라인 | 학습/추론 파이프라인에 Kubeflow + AKS 활용 |
| 하이브리드 클라우드 | Azure Arc 기반의 온프레미스 AKS 관리 가능 |

---

## ✅ AKS 배포 예시 (Azure CLI)

```bash
# 리소스 그룹 생성
az group create --name myAKSResourceGroup --location koreacentral

# AKS 클러스터 생성
az aks create \
  --resource-group myAKSResourceGroup \
  --name myAKSCluster \
  --node-count 3 \
  --enable-addons monitoring \
  --generate-ssh-keys

# AKS 클러스터 접속 구성
az aks get-credentials --resource-group myAKSResourceGroup --name myAKSCluster

# 노드 확인
kubectl get nodes
```

---

## ✅ AKS 고급 기능

- **Virtual Node (ACI 연동)**: 급격한 트래픽 증가 시 컨테이너 인스턴스(Azure Container Instances) 자동 확장
- **Windows Node 지원**: Windows 기반 컨테이너 실행 가능
- **Azure CNI / Kubenet 네트워크 모델**: IP 주소 계획과 VNet 통합 방식 선택 가능
- **Dev Spaces / Bridge to Kubernetes**: 로컬 개발 환경과 통합된 디버깅 가능

---

## ✅ 요약

| 항목 | 내용 |
|------|------|
| 제공 방식 | 관리형 Kubernetes 클러스터 |
| 주요 기능 | 자동 업그레이드, 모니터링, 보안, 확장성 |
| 통합 서비스 | Azure AD, Log Analytics, Azure Monitor, DevOps |
| 운영 부담 | 낮음 (마스터 노드 관리 불필요) |

---

AKS는 클라우드 네이티브 애플리케이션을 안전하고 확장성 있게 운영할 수 있도록 최적화된 솔루션입니다.
