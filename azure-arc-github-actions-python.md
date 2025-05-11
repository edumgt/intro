
# Azure Arc 설명 및 GitHub Actions + Python 사용 사례

---

## ✅ Azure Arc란?

### 📌 정의
**Azure Arc**는 Azure 서비스 및 관리 기능을 **온프레미스, 다른 클라우드, 엣지 환경의 인프라에 확장**할 수 있도록 해주는 플랫폼입니다.

즉, **Azure 외부 리소스도 Azure Portal과 동일하게 관리**할 수 있게 해줍니다.

---

### 🔍 주요 기능

| 기능 | 설명 |
|------|------|
| **서버 관리** | 온프레미스 또는 AWS/GCP VM을 Azure 리소스처럼 등록하고 모니터링 가능 |
| **Kubernetes 관리** | 외부 K8s 클러스터를 Azure Kubernetes Service처럼 관리 |
| **데이터 서비스** | Azure SQL Managed Instance, PostgreSQL 등 데이터 서비스를 온프레미스에서 운영 가능 |
| **정책 적용** | Azure Policy를 Arc 대상에 적용 가능 |
| **보안 통합** | Defender for Cloud, Log Analytics, Azure Monitor 연동 가능 |

---

### 📦 지원 대상

- 물리 서버
- 가상 머신 (on-prem / AWS / GCP)
- Kubernetes 클러스터 (EKS, GKE 포함)
- 데이터 서비스 (SQL, PostgreSQL 등)

---

## ✅ GitHub Actions + Python 사용 사례

### 🔹 목적
GitHub에 Push 시, 자동으로 Python 애플리케이션을 테스트하고 배포하는 워크플로우

---

### 📁 프로젝트 구조 예시

```
my-python-app/
├── app.py
├── requirements.txt
└── .github/
    └── workflows/
        └── python-app.yml
```

---

### 📄 `.github/workflows/python-app.yml`

```yaml
name: Python CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: 코드 체크아웃
      uses: actions/checkout@v3

    - name: Python 설치
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: 의존성 설치
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    - name: 유닛 테스트 실행
      run: |
        pytest

    - name: 애플리케이션 실행
      run: |
        python app.py
```

---

### 📄 `requirements.txt`

```
flask
pytest
```

---

### 📄 `app.py`

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from GitHub Actions + Python!"

if __name__ == "__main__":
    app.run()
```

---

## ✅ GitHub Actions 사용 효과

| 장점 | 설명 |
|------|------|
| CI/CD 자동화 | 코드 푸시 시 테스트 및 배포 자동 수행 |
| 협업 최적화 | Pull Request 병합 전 자동 검증 |
| Azure 연동 가능 | Azure App Service, Azure Container Registry 등과 통합 가능 |
| 유연한 실행 환경 | Python, Node.js, Java 등 다양한 런타임 지원 |

---

Azure Arc와 GitHub Actions는 **하이브리드/멀티 클라우드 환경**에서 클라우드 네이티브 개발과 운영을 연결하는 강력한 도구입니다.
