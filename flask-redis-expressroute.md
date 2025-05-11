
# Python Flask + Azure Redis 예제 및 ExpressRoute 설명

---

## ✅ Python, Flask, Azure Redis를 사용한 코드 성정보 처리 예제

### 🔹 목적
성 정보(예: 사용자의 상태, 성별 등)를 Azure Redis에 저장하고, Flask API를 통해 이를 처리합니다.

### 🔹 사전 준비
- Azure Redis 인스턴스 생성 (Premium/Standard)
- Python 환경: `pip install flask redis`

### 🔹 예제 코드 (`app.py`)
```python
from flask import Flask, request, jsonify
import redis
import os

app = Flask(__name__)

# Redis 연결 정보
redis_host = os.getenv('REDIS_HOST', 'your-redis-host.redis.cache.windows.net')
redis_port = 6380
redis_password = os.getenv('REDIS_PASSWORD', 'your-redis-access-key')

r = redis.StrictRedis(
    host=redis_host,
    port=redis_port,
    password=redis_password,
    ssl=True,
    decode_responses=True
)

@app.route('/set_gender', methods=['POST'])
def set_gender():
    data = request.json
    user_id = data.get('user_id')
    gender = data.get('gender')

    if not user_id or not gender:
        return jsonify({'error': 'Missing user_id or gender'}), 400

    r.set(f"user:{user_id}:gender", gender)
    return jsonify({'message': 'Gender saved'})

@app.route('/get_gender/<user_id>', methods=['GET'])
def get_gender(user_id):
    gender = r.get(f"user:{user_id}:gender")
    if gender:
        return jsonify({'user_id': user_id, 'gender': gender})
    else:
        return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
```

---

## ✅ ExpressRoute란?

### 📌 정의
**ExpressRoute**는 Azure 데이터 센터와 **온프레미스 네트워크를 전용 회선을 통해 연결**하는 서비스입니다.  
일반 인터넷 대신 **사설 네트워크**로 연결되기 때문에 **보안성, 신뢰성, 속도**가 뛰어납니다.

---

### 🔍 주요 특징
- 인터넷을 통하지 않고 Azure와 통신 (예: VPN과 차이점)
- **높은 대역폭** 및 **낮은 지연 시간** 제공
- **BGP 기반 라우팅** 지원
- Microsoft 365, Dynamics 365도 ExpressRoute로 연결 가능 (옵션 설정 시)

---

### ✅ ExpressRoute 연결 유형

| 유형                  | 설명 |
|-----------------------|------|
| **Private Peering**   | 온프레미스 ↔ VNet 연결 (가상 머신, Redis 등) |
| **Microsoft Peering** | 온프레미스 ↔ Microsoft 공용 서비스 (Azure Storage, SQL, 365 등) |
| **Azure Public Peering** *(단종됨)* | 이전에는 공용 Azure 서비스 연결 용도였으나 현재는 Microsoft Peering으로 통합 |

---

### ✅ VPN Gateway vs ExpressRoute

| 항목 | VPN Gateway | ExpressRoute |
|------|-------------|---------------|
| 연결 경로 | 공용 인터넷 | 사설 전용망 |
| 보안성 | 암호화된 인터넷 경로 | 전용 회선 (더 안전) |
| 성능 | 중간 ~ 낮음 | 매우 높음 (10Gbps 이상 가능) |
| SLA | 낮음 | 높음 (엔터프라이즈 급) |
| 비용 | 상대적으로 저렴 | 비교적 고가 (전용 회선 요금 포함) |

---

## ✅ ExpressRoute를 사용하는 이유
- **보안 데이터 전송 필요** (예: 금융, 의료)
- **대량의 데이터 이동 필요** (백업, 분석 등)
- **하이브리드 클라우드** 환경 구축

