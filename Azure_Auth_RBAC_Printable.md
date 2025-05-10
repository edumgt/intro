# Azure 인증 및 인가 설계 (프린트용)

## ✅ Azure AD 기반 사용자 인증 (Authentication)

### 🔹 개요
Azure Active Directory(Azure AD)는 사용자 인증, 디바이스 인증, 멀티팩터 인증(MFA), SSO를 포함한 중앙 인증 서비스를 제공합니다.

### 🔹 주요 기능 요약

- **SSO (Single Sign-On)**: 한 번 로그인으로 M365, 자체 앱 등 연동
- **MFA**: OTP, 전화, 앱 인증 등 다단계 인증
- **Conditional Access**: 조건별 정책 설정 (IP, 디바이스, 앱)
- **B2B / B2C 인증**: 외부 협력사 초대 또는 고객용 로그인 처리
- **ID 연동**: Google, Okta, ADFS 등 외부 IdP 연계

---

## ✅ MSAL 기반 OAuth2 인증 앱 예제 (Python Flask)

```python
from flask import Flask, redirect, url_for, session
from msal import ConfidentialClientApplication

app = Flask(__name__)
app.secret_key = 'YOUR_SECRET'

CLIENT_ID = 'your-client-id'
CLIENT_SECRET = 'your-client-secret'
AUTHORITY = 'https://login.microsoftonline.com/<tenant-id>'
REDIRECT_URI = 'http://localhost:5000/getAToken'
SCOPE = ['User.Read']

@app.route("/")
def index():
    return '<a href="/login">Login with Azure AD</a>'

@app.route("/login")
def login():
    app = ConfidentialClientApplication(CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET)
    auth_url = app.get_authorization_request_url(SCOPE, redirect_uri=REDIRECT_URI)
    return redirect(auth_url)

@app.route("/getAToken")
def authorized():
    return "Access Token received (handle parsing here)"
```

---

## ✅ Azure RBAC 기반 사용자 인가 (Authorization)

### 🔹 주요 개념

- **Role**: 권한 집합 (예: Reader, Contributor, Custom)
- **Scope**: 권한 적용 범위 (Subscription, RG, 리소스 등)
- **Assignment**: 사용자/그룹에 Role + Scope 할당

### 🔹 기본 역할 예시

| 역할            | 설명                                     |
|-----------------|------------------------------------------|
| Owner           | 전체 권한 + 권한 부여 가능               |
| Contributor     | 생성/수정 가능, 권한 부여는 불가         |
| Reader          | 읽기 전용                                |
| User Access Admin | 권한 관리 가능                         |

---

## ✅ RBAC 정책 JSON 템플릿 (Custom Role 예)

```json
{
  "Name": "Read Storage Only",
  "IsCustom": true,
  "Description": "스토리지 계정만 읽기 가능한 역할",
  "Actions": [
    "Microsoft.Storage/storageAccounts/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/<subscription-id>"
  ]
}
```

---

## ✅ 인증/인가 흐름 요약

1. 사용자가 앱에 로그인 요청
2. Azure AD가 인증 후 ID Token/Access Token 발급
3. 앱은 Access Token을 포함하여 리소스 요청
4. Azure는 RBAC 정책 확인 후 접근 허용/거부

---

📌 최소 권한 원칙을 따르고, 그룹 기반 RBAC 및 관리형 ID를 통해 보안 수준을 향상시킬 것.
