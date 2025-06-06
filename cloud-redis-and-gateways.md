
# 클라우드 기반 프로그래밍에서 Redis 사용 목적 및 네트워크 게이트웨이 구성 설명

---

## ✅ Redis 사용 목적

**Redis**(REmote DIctionary Server)는 인메모리 기반의 NoSQL 키-값 저장소로서, 클라우드 환경에서 다음과 같은 목적으로 활용됩니다:

### 📌 주요 목적
- **캐싱**: 자주 조회되는 데이터를 메모리에 저장하여 DB 부하 감소 및 응답 속도 향상
- **세션 저장소**: 사용자 로그인 세션을 서버 간 공유할 수 있도록 중앙 저장
- **메시지 브로커**: Pub/Sub 구조로 마이크로서비스 간 통신 가능
- **Rate Limiting**: API 요청 횟수를 Redis 키로 제어하여 과도한 요청 방지
- **Queue 시스템**: 작업을 순차 처리하는 큐 구현 가능 (ex. background job)

---

## ✅ Redis 활용 사례

| 사용처 | 설명 |
|--------|------|
| 웹 애플리케이션 캐시 | 로그인 정보, 상품 목록, 인기 콘텐츠 등 캐싱 |
| 마이크로서비스 통신 | Redis Pub/Sub 기능을 활용한 이벤트 브로커 |
| 게임 서버 | 사용자 점수, 상태 등을 빠르게 저장 및 조회 |
| 실시간 분석 | 실시간 클릭 수, 방문 수 등을 저장하여 통계 처리 |
| 분산 세션 저장소 | 사용자 인증 상태를 여러 서버에서 공유 |

---

## ✅ Azure 네트워크 게이트웨이 구성 설명

### 🔷 1. 인터넷 게이트웨이 (Internet Gateway)

- Azure에서는 **기본적으로 제공됨**
- 가상 네트워크에 있는 리소스가 **공용 인터넷과 통신**할 수 있게 함
- 퍼블릭 IP가 설정된 VM, Load Balancer 등이 사용

---

### 🔷 2. VPN 게이트웨이 (VPN Gateway)

- **온프레미스 네트워크 ↔ Azure 가상 네트워크**를 안전하게 연결
- **Site-to-Site, Point-to-Site, ExpressRoute** 등 다양한 연결 유형
- IPSec 터널을 통해 암호화된 트래픽 제공

---

### 🔷 3. NAT 게이트웨이 (NAT Gateway)

- **VNet 내부의 사설 IP 리소스들이 인터넷에 나갈 수 있도록 하는 구성**
- **들어오는 트래픽은 차단**, 나가는 트래픽만 허용
- 다수의 리소스에 대해 **고정된 공용 IP** 사용 가능
- 보안상 **인바운드 트래픽을 막고 아웃바운드만 허용**할 때 유용

---

### 🔷 4. VNet Peering

- 서로 다른 **VNet 간에 프라이빗 IP를 통한 통신**을 가능하게 함
- **다른 리전 간 Peering**도 가능 (Global VNet Peering)
- 동일 구독 또는 다른 구독 간에도 연결 가능
- 트래픽은 Azure 백본망을 통해 전달되므로 **빠르고 안전**

---

## ✅ 네트워크 게이트웨이 용도 요약

| 구성요소        | 주요 용도 |
|-----------------|-----------|
| 인터넷 게이트웨이 | Azure VM 등의 인터넷 접속 제공 |
| VPN 게이트웨이     | 온프레미스 ↔ Azure 간 보안 터널 |
| NAT 게이트웨이     | 사설 리소스의 아웃바운드 트래픽만 허용 |
| VNet Peering     | VNet 간 내부 통신을 위한 연결 |

