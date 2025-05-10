# Azure 성능 효율성 상세 설명 (프린트용)

## ✅ 1. 애플리케이션 병목 제거

- Application Insights 또는 Visual Studio Profiler를 통해 병목 지점 식별
- 느린 SQL 쿼리 최적화 및 인덱스 추가
- 병렬 처리(Task), 큐 기반 처리로 성능 분산
- API 관리와 Throttling으로 처리 속도 제어
- Azure Monitor로 실시간 트래픽과 성능 모니터링

---

## ✅ 2. Redis 캐시 적용

- 자주 읽고 변경이 적은 데이터를 Redis에 저장
- 예: 상품 목록, 코드값, 사용자 세션 정보
- Azure Cache for Redis 인스턴스 생성 후 라이브러리 사용
- 캐시 적중률이 높을수록 응답 속도 및 DB 부하 감소
- Python, .NET 등에서 redis-py, StackExchange.Redis 사용

---

## ✅ 3. Front Door 및 CDN 활용

- Azure Front Door: 글로벌 HTTP 로드 밸런싱 + 캐싱
- Azure CDN: JS, 이미지, CSS 등 정적 콘텐츠 전송 속도 개선
- 사용자 위치 기반 라우팅으로 응답 시간 최소화
- TTFB(Time to First Byte) 개선, 오리진 서버 부하 감소
- HTTPS 자동 구성 및 규칙 기반 경로 분기 설정 가능

---

## ✅ 4. App Service Plan 적절 할당

- 앱 실행에 필요한 VM 리소스(메모리, CPU 등) 계획
- Free, Basic, Standard, Premium, Isolated 구분
- Auto-scale을 통한 수요 기반 리소스 조절
- Standard 이상은 Always On, 스케일 아웃/업 지원
- 초기 개발은 Standard, 운영 단계는 Premium/Isolated 권장
