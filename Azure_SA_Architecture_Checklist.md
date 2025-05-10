# Azure 기반 SA 고려사항 체크리스트

## 1. 아키텍처 설계 원칙 (Microsoft Well-Architected Framework 기준)

- ✅ **신뢰성**: 장애 복구, 백업, 장애 조치(Failover), Availability Zones 고려
- ✅ **보안**: IAM, NSG, Azure Defender, Key Vault 적용
- ✅ **비용 최적화**: 예약 인스턴스, 비용 분석, Auto-scaling
- ✅ **운영 우수성**: 모니터링, 로그 수집, CI/CD 파이프라인 설계
- ✅ **성능 효율성**: 캐싱(Azure Redis), CDN, App Service Plan 적정화

---

## 2. 클라우드 구성 요소 및 서비스 선택

- 🧱 **컴퓨팅**: Azure VM, App Service, AKS, Functions 등 선택
- 📦 **스토리지**: Blob, Files, Disk, Queue Storage
- 🗃️ **DB 선택**: Azure SQL, Cosmos DB, PostgreSQL, MySQL
- 🌐 **네트워크**: VNet, Load Balancer, App Gateway, Front Door
- 🔐 **보안/ID 관리**: Azure AD, Key Vault, NSG, Defender for Cloud
- ⚙️ **DevOps**: Azure DevOps, GitHub Actions, ARM/Bicep/Terraform
- 📈 **모니터링**: Azure Monitor, Log Analytics, Application Insights

---

## 3. 네트워크 설계 및 보안

- VNet/Subnet 설계 (Hub & Spoke 구조 고려)
- NSG, UDR, Application Gateway, WAF 구성
- Private Endpoint / Service Endpoint 고려
- ExpressRoute 또는 VPN Gateway 연결
- Azure Firewall 및 Defender 적용

---

## 4. 인증 및 권한 관리

- Azure AD 기반 SSO, RBAC 적용
- 최소 권한 원칙(Least Privilege) 설계
- Managed Identity 사용
- Key Vault를 통한 시크릿 및 인증서 관리

---

## 5. 고가용성 / 재해복구 (HA/DR)

- Availability Set / Zone 적용
- Azure Load Balancer를 통한 다중 인스턴스 구성
- Azure Site Recovery 활용한 DR 시나리오
- 백업 정책 수립 및 테스트
- 스토리지 GRS/RA-GRS 구성

---

## 6. IaC (Infrastructure as Code)

- ARM Template / Bicep / Terraform 활용
- GitOps 및 DevOps 파이프라인 통합
- 환경별 배포 자동화 및 롤백 전략 포함

---

## 7. 모니터링 및 운영

- Azure Monitor, Log Analytics, App Insights 설정
- 경고(Alert), 대시보드 구성
- Azure Advisor를 통한 운영 최적화 가이드 수신

---

## 8. 거버넌스 및 컴플라이언스

- Management Group / Subscription 구조 설계
- Azure Policy, Blueprint 적용
- 리소스 태그(Tag) 전략 수립
- RBAC 정책 정의 및 문서화

---

## 9. 비용 최적화 및 예산 관리

- Reserved Instances, Spot VM 활용
- Auto-shutdown, Autoscale 설정
- Azure Cost Management 및 Budget Alert 활용

---

## 10. 문서화 및 운영 인수인계

- 아키텍처 다이어그램 (네트워크, 워크플로우 포함)
- 운영 매뉴얼, 설정 문서화
- 장애 대응 프로세스 및 테스트 계획 수립

---

> 📝 작성자: Azure 기반 시스템 설계 책임자 (SA)
> 📅 최신화: 2025년 5월
