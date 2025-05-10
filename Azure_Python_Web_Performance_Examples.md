# Python 기반 웹 프레임워크와 Azure 성능 구성 요소 예시

## ✅ 1. Flask vs Django 사용 예시

### Flask 예시 (경량 API 서버)
```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from Flask!"

if __name__ == "__main__":
    app.run(debug=True)
```

- 빠른 프로토타이핑, 단일 파일 앱 개발에 적합
- REST API 서버나 소규모 서비스에 활용

---

### Django 예시 (대규모 웹 앱)
```python
# views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello from Django!")
```

- ORM, 인증, 관리자 페이지 등 내장
- 포털, ERP, LMS 등 복합 비즈니스 로직에 적합

---

## ✅ 2. Application Insights 예시 (Flask 통합)

```python
from opencensus.ext.azure.log_exporter import AzureLogHandler
import logging

logger = logging.getLogger(__name__)
logger.addHandler(AzureLogHandler(connection_string='InstrumentationKey=<your-key>'))

@app.route("/")
def hello():
    logger.warning("Hello route accessed")
    return "Logged to App Insights"
```

- Flask에서도 App Insights 로그 전송 가능
- HTTP 요청, 예외, 사용자 행동 추적 가능

---

## ✅ 3. Azure Redis 설정 (Python)

```python
import redis

r = redis.StrictRedis(
    host='myredis.redis.cache.windows.net',
    port=6380,
    password='your-access-key',
    ssl=True
)

r.set('session:userid:123', 'active')
value = r.get('session:userid:123')
```

- Azure Cache for Redis 생성 후 연결 정보 설정
- 세션, 코드 테이블, 조회 결과 캐싱에 활용

---

## ✅ 4. TTFB (Time To First Byte) 상세 설명

| 항목 | 설명 |
|------|------|
| 정의 | 브라우저가 서버에서 첫 번째 바이트를 수신하는 데 걸리는 시간 |
| 원인 | 느린 백엔드, 미적절한 DB 쿼리, 캐싱 미적용, DNS 지연 등 |
| 개선 방법 |
- CDN 및 Azure Front Door로 전방 캐시 활용
- API 응답 최적화 및 SQL 쿼리 튜닝
- Redis 등 캐시 시스템 도입
- App Insights로 응답 분해(trace) 및 병목 추적

---

📌 이 문서는 Flask/Django 웹 개발 시 Azure 구성 요소와 성능 개선을 함께 고려할 수 있는 실무 예제를 포함합니다.
