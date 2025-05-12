# Dapr 개요 및 실습 예제

## 📌 Dapr란?

**Dapr (Distributed Application Runtime)**는 마이크로서비스를 손쉽게 개발할 수 있도록 도와주는 오픈소스 런타임입니다. 사이드카 아키텍처 기반으로, 다양한 언어와 클라우드 환경에서 분산 시스템의 복잡성을 추상화합니다.

---

## 🔹 주요 기능 (Building Blocks)

| 기능 | 설명 |
|------|------|
| 🔁 Service Invocation | HTTP/gRPC를 통한 서비스 간 통신 추상화 |
| 📦 State Management | Redis, Cosmos DB 등 다양한 저장소 백엔드 지원 |
| 📩 Pub/Sub Messaging | Kafka, Redis Streams, Azure Service Bus 등과 연동 |
| 🪪 Actor 모델 | 분산 Actor 패턴 지원 (가벼운 상태 기반 객체 관리) |
| 🔐 Secrets Management | Vault, AWS Secrets Manager 등에서 비밀 키 관리 |
| 📂 Bindings | 외부 시스템 (예: 데이터베이스, 클라우드 서비스) 과의 트리거/입출력 연결 |
| 📈 Observability | Zipkin, Prometheus 등과 연계한 분산 트레이싱/로깅/메트릭 수집 |

---

## 🔹 Dapr 아키텍처

```
+---------------------+          +---------------------+
|  App (order-app)    | <---->   |  Dapr Sidecar       |
+---------------------+          +---------------------+
                                      |
                             +--------+--------+
                             | State Store     |
                             | Pub/Sub         |
                             | Secrets         |
                             +-----------------+
```

---

## 🔹 Python 예제: 서비스 간 통신

```python
import requests

# Dapr HTTP 포트 기본값은 3500
url = "http://localhost:3500/v1.0/invoke/order-service/method/process"

data = {
    "orderId": 123
}

response = requests.post(url, json=data)
print("응답:", response.text)
```

---

## 🔹 Node.js 예제: 상태 저장

```javascript
const axios = require('axios');

const daprPort = 3500;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/statestore`;

const saveState = async () => {
  await axios.post(stateUrl, [
    { key: "username", value: "kim_doyoung" }
  ]);
  console.log("State saved.");
};

saveState();
```

---

## 🔹 Kubernetes 예제: Dapr 애플리케이션 배포

### `python-app.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: python-app
  template:
    metadata:
      labels:
        app: python-app
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "python-app"
        dapr.io/app-port: "5000"
    spec:
      containers:
      - name: python-app
        image: myregistry/python-app:latest
        ports:
        - containerPort: 5000
```

---

## 🔹 개발 및 배포 환경

- 로컬: `dapr init`, `dapr run --app-id myapp --app-port 5000 python app.py`
- 운영: Docker, Kubernetes, Helm Chart 사용

---

## 🔹 참고 문서

- 공식 사이트: [https://dapr.io](https://dapr.io)
- GitHub: [https://github.com/dapr/dapr](https://github.com/dapr/dapr)

---

⏱️ 생성일: 2025-05-12 00:08:34
