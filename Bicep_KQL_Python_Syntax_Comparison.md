# Bicep, KQL, Python 언어의 주요 문법 및 토큰 비교

이 문서는 Bicep, KQL (Kusto Query Language), Python 세 가지 언어의 주요 문법과 사용되는 토큰들을 프로그래밍 언어 관점에서 비교 설명합니다.

---

## 1. Bicep (Azure Resource Manager DSL)

Bicep은 Azure 리소스 배포를 위한 선언적 언어입니다. JSON 기반 ARM Template보다 가독성과 작성이 쉬운 것이 특징입니다.

### 기본 구조
```bicep
param location string = resourceGroup().location

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'mystorageacct'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

### 주요 문법 요소
- `param`: 매개변수 선언
- `var`: 변수 선언
- `resource`: Azure 리소스 선언
- `output`: 출력 값 정의
- `module`: 외부 bicep 템플릿 포함

### 주요 토큰
- `=`, `{}`, `[]`, `:`: 구조 지정
- 문자열: `"value"` 또는 `'value'`
- 주석: `// 한 줄 주석`

---

## 2. KQL (Kusto Query Language)

KQL은 Azure Monitor, Log Analytics 등에서 사용되는 쿼리 언어입니다. SQL과 유사하지만 스트리밍 데이터 분석에 최적화되어 있습니다.

### 기본 구조
```kql
AzureActivity
| where OperationName == "Create or Update Virtual Machine"
| summarize count() by ResourceGroup, bin(TimeGenerated, 1h)
```

### 주요 문법 요소
- 파이프 (`|`) 연산자: 명령 연결
- `where`, `summarize`, `project`, `extend`, `join`, `sort by`
- `let`: 변수 선언
- `datatable`: 인라인 테이블 생성

### 주요 토큰
- 키워드: `where`, `project`, `summarize`, `order by`
- 연산자: `==`, `!=`, `>`, `<`, `in`, `contains`
- 시간 함수: `ago()`, `bin()`, `datetime()`

---

## 3. Python (범용 프로그래밍 언어)

Python은 범용 목적의 고수준 언어로, 데이터 처리, 웹 개발, 인공지능 등 다양한 분야에서 활용됩니다.

### 기본 구조
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Azure")
```

### 주요 문법 요소
- `def`: 함수 정의
- `class`: 클래스 정의
- `import`: 모듈 불러오기
- `if`, `for`, `while`, `try-except` 등 제어문
- 리스트, 딕셔너리, 튜플 등 컬렉션 타입

### 주요 토큰
- 연산자: `=`, `+`, `-`, `*`, `/`, `==`, `!=`
- 식별자: 변수명, 함수명 등
- 문자열: `"..."`, `'...'`
- 주석: `# 한 줄 주석`, `''' 여러 줄 주석 '''`

---

## 요약 비교

| 요소 | Bicep | KQL | Python |
|------|-------|-----|--------|
| 목적 | Azure 리소스 정의 | 로그/데이터 분석 | 범용 프로그래밍 |
| 구조 | 선언형 | 쿼리 기반 | 절차적/객체지향 |
| 주석 | `//` | `//` | `#`, `'''...'''` |
| 변수 선언 | `param`, `var` | `let` | `=`, `def` 내부 |
| 문자열 | `'value'` | `"value"` | `'value'`, `"value"` |

---

_Last updated: 2025-05-11_
