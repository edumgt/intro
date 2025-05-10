# Azure 핵심 서비스 및 고급 구성 요소 설명

## ✅ 1. Key Vault

- 암호, API 키, 인증서 등 보안 정보 저장
- RBAC 또는 정책 기반 액세스 제어
- 구성 예: `https://<vault-name>.vault.azure.net/secrets/dbPassword/`

## ✅ 2. Application Gateway + WAF

- L7(Web) 기반 로드 밸런서로 SSL 종료, 쿠키 기반 세션 유지
- WAF(Web Application Firewall) 포함: OWASP 룰 기반 공격 차단
- 경로 기반 라우팅, 인증서 관리 가능

## ✅ 3. Azure Load Balancer vs Traffic Manager

| 항목 | Load Balancer | Traffic Manager |
|------|---------------|-----------------|
| 계층 | L4 (TCP/UDP)   | DNS 기반        |
| 사용 위치 | VM 간 부하 분산 | 글로벌 앱 라우팅 |
| 라우팅 방식 | IP, 포트 기반 | 가중치, 성능, 장애 조치 |
| 내부/외부 | 둘 다 가능     | 외부 트래픽 전용 |
| 특징 | 빠른 응답, 저지연 | 글로벌 고가용성 구성 |

## ✅ 4. ARM Template 예시

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2022-09-01",
      "name": "mystorageacct",
      "location": "koreacentral",
      "sku": { "name": "Standard_LRS" },
      "kind": "StorageV2",
      "properties": {}
    }
  ]
}
```

## ✅ 5. Bicep 예시

```bicep
resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'mystorageacct'
  location: 'koreacentral'
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {}
}
```

## ✅ 6. Log Analytics 쿼리 기반 분석 (Kusto Query Language - KQL)

```kusto
AzureActivity
| where ResourceGroup == "prod-rg"
| where ActivityStatus == "Failed"
| summarize Count = count() by ResourceProviderName, bin(TimeGenerated, 1h)
| order by Count desc
```

- 활동 로그에서 특정 그룹 내 실패 이벤트 분석
- `summarize`, `join`, `render` 등 다양한 시각화 가능

## ✅ 7. Blueprint

- Azure Policy + Role Assignment + Resource Template을 패키지화
- 예: 표준 태그, 위치 제한, 모니터링 설정 포함
- ID 기반으로 버전 관리 가능

```json
{
  "properties": {
    "displayName": "KISA ISMS 표준 정책",
    "description": "조직 보안 규정 준수용 블루프린트",
    "targetScope": "subscription",
    "parameters": {},
    "resourceGroups": {
      "core-rg": {
        "description": "공통 리소스 그룹"
      }
    }
  }
}
```

## ✅ 8. Reserved Instance

- VM, SQL, Cosmos DB 등에 1년 또는 3년 약정으로 비용 절감
- 최대 72% 할인 가능
- 예약은 서브스크립션 단위, 해지 가능 (수수료 발생)
- 예: Standard_D2s_v3 VM - 약정 시 시간당 비용 절감

---

📌 이 문서는 고급 Azure 인프라 설계에 필요한 구성 요소를 실무 관점에서 요약한 자료입니다.
