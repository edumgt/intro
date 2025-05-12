# Azure Container Apps 개요 및 예제

## 🔹 Azure Container Apps란?

**Azure Container Apps**는 마이크로서비스 및 컨테이너 기반 애플리케이션을 서버리스 방식으로 실행할 수 있는 **PaaS (Platform as a Service)** 입니다.

Kubernetes 기반 기술(KEDA, Dapr, Envoy 등)을 내부적으로 사용하지만, 사용자는 복잡한 오케스트레이션을 몰라도 컨테이너를 쉽게 배포하고 자동 스케일링을 구현할 수 있습니다.

---

## 🔹 주요 특징

| 항목 | 설명 |
|------|------|
| 서버리스 컨테이너 | 인프라 관리 없이 컨테이너 배포 |
| 자동 스케일링 | 요청 수, 큐 길이, 이벤트 수신량 등에 따라 자동 확장/축소 |
| 여러 언어 지원 | Docker 이미지 기반으로 언어에 상관없이 사용 가능 |
| HTTP 기반 라우팅 | Envoy를 이용한 외부 트래픽 라우팅 지원 |
| Dapr 통합 | 상태 관리, 서비스 호출, pub/sub 등 기능 제공 |
| CLI 및 YAML 지원 | Azure CLI 또는 ARM/Bicep/YAML로 배포 가능 |

---

## 🔹 주요 사용 사례

- 백엔드 API 서버
- 이벤트 기반 서버리스 처리
- 실시간 데이터 수집/분석 마이크로서비스
- 다국어/다언어 컨테이너 통합 배포

---

## 🔹 예제 1: Azure CLI로 배포 (간단한 API 컨테이너)

```bash
az containerapp env create \
  --name my-environment \
  --resource-group my-resource-group \
  --location koreacentral

az containerapp create \
  --name my-api \
  --resource-group my-resource-group \
  --environment my-environment \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress 'external' \
  --cpu 0.5 --memory 1.0Gi
```

---

## 🔹 예제 2: YAML로 배포 정의

```yaml
apiVersion: '2022-03-01'
kind: ContainerApp
location: koreacentral
name: my-api
properties:
  environmentId: /subscriptions/<sub-id>/resourceGroups/my-resource-group/providers/Microsoft.App/managedEnvironments/my-environment
  configuration:
    ingress:
      external: true
      targetPort: 80
  template:
    containers:
      - image: mcr.microsoft.com/azuredocs/containerapps-helloworld:latest
        name: my-api
        resources:
          cpu: 0.5
          memory: 1.0Gi
```

---

## 🔹 Dapr 연동 (선택적)

Dapr을 활성화하면 다음과 같이 설정할 수 있습니다:

```bash
az containerapp create \
  --name my-dapr-app \
  --resource-group my-resource-group \
  --environment my-environment \
  --image <your-image> \
  --target-port 80 \
  --ingress external \
  --enable-dapr \
  --dapr-app-id my-dapr-app \
  --dapr-app-port 80
```

---

## 🔹 참고 자료

- 공식 문서: [https://learn.microsoft.com/en-us/azure/container-apps](https://learn.microsoft.com/en-us/azure/container-apps)
- Dapr 통합: [https://learn.microsoft.com/en-us/azure/container-apps/dapr-overview](https://learn.microsoft.com/en-us/azure/container-apps/dapr-overview)

---

⏱️ 생성일: 2025-05-12 00:27:02
