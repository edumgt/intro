
# Azure App Service와 Azure Front Door 설명 및 Python 예제

## 📘 Azure App Service

Azure App Service는 웹 애플리케이션, REST API, 모바일 백엔드를 위한 완전 관리형 플랫폼(PaaS)입니다.

### 주요 기능
- 다양한 언어 지원: Python, .NET, Java, Node.js 등
- 자동 확장 및 로드 밸런싱
- GitHub, Azure DevOps 등의 지속적 배포 통합
- TLS/SSL, 사용자 지정 도메인, Azure AD 통합 등 보안 기능
- Application Insights를 통한 모니터링 및 진단

### Python 예제 (Flask 앱)

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Azure App Service!'

if __name__ == '__main__':
    app.run()
```

---

## 🌐 Azure Front Door

Azure Front Door는 글로벌 고성능 애플리케이션 전송 네트워크로, CDN과 웹 애플리케이션 방화벽(WAF)을 포함합니다.

### 주요 기능
- 글로벌 로드 밸런싱 (가장 가까운 백엔드로 라우팅)
- 동적 콘텐츠 전송 가속
- WAF를 통한 보안 기능 (OWASP Top 10 보호)
- 종단 간 SSL/TLS 암호화
- 자동 장애 조치

### 사용 예시 (Azure App Service와 통합)

1. Front Door 프로필 생성
2. 사용자 지정 도메인 추가
3. 백엔드 풀에 App Service 추가
4. 라우팅 규칙 설정

---

## 🧩 통합 아키텍처 예시

```
[사용자]
   |
   v
[Azure Front Door]
   |
   v
[Azure App Service (Flask 앱)]
```

전 세계 사용자에게 빠르고 안정적인 웹 서비스 제공

---

## 🔗 참고

- [Azure App Service Docs](https://learn.microsoft.com/en-us/azure/app-service/)
- [Azure Front Door Docs](https://learn.microsoft.com/en-us/azure/frontdoor/)
