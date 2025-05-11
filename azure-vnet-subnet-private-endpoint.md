
# Azure 네트워크 구성 요소 설명: VNet, Subnet, Private Endpoint

## ✅ 1. VNet (Virtual Network)

### 📌 정의
Azure 가상 네트워크(VNet)는 **Azure 내에서 리소스들이 안전하게 서로 통신할 수 있도록 하는 가상의 네트워크**입니다.

### 🔍 특징
- IP 주소 범위 지정 (CIDR 형식, 예: `10.0.0.0/16`)
- VM, App Service, Redis, Database 등 다양한 리소스를 이 네트워크에 배치 가능
- 외부와는 인터넷 게이트웨이, VPN Gateway, NAT Gateway, Peering 등으로 연결 가능

---

## ✅ 2. Subnet

### 📌 정의
Subnet(서브넷)은 VNet을 세부적으로 나누는 단위로, **리소스를 논리적으로 그룹화하거나 액세스를 분리**할 수 있습니다.

### 🔍 특징
- VNet의 주소 공간 안에서 하위 주소 범위 지정 (예: `10.0.1.0/24`)
- 리소스 간 통신 정책, NSG(Network Security Group) 할당 가능
- 일부 Azure 리소스(예: Redis Premium, Private Endpoint)는 서브넷에 직접 배치되어야 함

---

## ✅ 3. Private Endpoint

### 📌 정의
Private Endpoint는 Azure PaaS 서비스(예: Redis, SQL Database, Storage 등)에 **VNet 내부 IP로 안전하게 접근할 수 있게 해주는 전용 네트워크 인터페이스**입니다.

### 🔍 역할
- 공용 인터넷 없이 내부 네트워크에서 Azure 서비스 접근 가능
- DNS는 `*.privatelink.*` 도메인을 통해 자동 매핑
- Private IP 주소를 사용하므로 보안성이 높음

### 🧩 구성 예
- Azure Redis Premium 인스턴스를 Private Endpoint로 설정하면 외부에서는 접속 불가
- VM 또는 App Service가 같은 VNet에 속하거나 피어링되면 해당 Redis에 접속 가능

---

## 🔐 관계도 요약

```
Azure Virtual Network (10.0.0.0/16)
│
├── Subnet: appSubnet (10.0.1.0/24) ────── VM, App Service
│
└── Subnet: redisSubnet (10.0.2.0/24) ─── Redis Premium + Private Endpoint
                                          ↓
                                  Private IP: 10.0.2.5
                                          ↓
                             DNS: myredis.privatelink.redis.cache.windows.net
```

---

## ✅ 보안 및 운영상 이점

| 구성 요소 | 주요 이점 |
|-----------|-----------|
| **VNet** | 리소스를 가상 네트워크로 격리 |
| **Subnet** | 보안 그룹(NSG), 라우팅 적용 가능 |
| **Private Endpoint** | Azure 서비스와의 통신을 내부 IP로 제한, 데이터 노출 차단 |
