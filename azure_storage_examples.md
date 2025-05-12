# Azure Storage 설정의 다양한 예시

Azure Storage는 다양한 유형의 데이터를 저장할 수 있는 범용 클라우드 스토리지 솔루션입니다. Blob, File, Table, Queue 서비스를 포함하며, 다양한 접근 방법과 보안 기능을 제공합니다.

---

## 🔹 스토리지 계정 종류

| 유형 | 용도 |
|------|------|
| **General-purpose v2** | Blob, File, Queue, Table 모든 기능 지원 (가장 일반적) |
| **Blob Storage** | Blob 데이터 저장에 특화 |
| **FileStorage** | 고성능 Azure Files 제공 |
| **BlockBlobStorage** | Premium 성능이 필요한 Blob 저장용 |

---

## 🔹 예시 1: 스토리지 계정 생성 (Azure CLI)

```bash
az storage account create \
  --name mystorageaccount \
  --resource-group myresourcegroup \
  --location koreacentral \
  --sku Standard_LRS \
  --kind StorageV2 \
  --enable-hierarchical-namespace true
```

> `--enable-hierarchical-namespace true`는 Data Lake Storage Gen2를 위한 설정입니다.

---

## 🔹 예시 2: Blob 컨테이너 생성 및 업로드

```bash
az storage container create \
  --name mycontainer \
  --account-name mystorageaccount \
  --public-access off

az storage blob upload \
  --account-name mystorageaccount \
  --container-name mycontainer \
  --name myfile.txt \
  --file ./myfile.txt
```

---

## 🔹 예시 3: SAS 토큰 생성

```bash
az storage container generate-sas \
  --account-name mystorageaccount \
  --name mycontainer \
  --permissions r \
  --expiry 2025-12-31T23:59:00Z \
  --output tsv
```

> 생성된 SAS 토큰을 통해 제한된 시간/권한으로 Blob 접근 가능

---

## 🔹 예시 4: Static 웹 사이트 호스팅 설정

```bash
az storage blob service-properties update \
  --account-name mystorageaccount \
  --static-website \
  --index-document index.html \
  --error-document error.html

az storage blob upload-batch \
  --account-name mystorageaccount \
  --source ./site \
  --destination \$web
```

---

## 🔹 예시 5: 파일 공유 (Azure Files)

```bash
az storage share create \
  --name myshare \
  --account-name mystorageaccount

az storage file upload \
  --share-name myshare \
  --source ./localfile.txt \
  --path remotefile.txt \
  --account-name mystorageaccount
```

---

## 🔹 예시 6: 네트워크 제한 설정 (Private Endpoint 등)

```bash
az storage account update \
  --name mystorageaccount \
  --default-action Deny

az storage account network-rule add \
  --resource-group myresourcegroup \
  --account-name mystorageaccount \
  --vnet-name myvnet \
  --subnet mysubnet
```

---

## 🔹 예시 7: Bicep으로 스토리지 계정 정의

```bicep
resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'mystorageacct'
  location: resourceGroup().location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}
```

---

## 🔹 참고 링크

- [Azure Storage 소개](https://learn.microsoft.com/ko-kr/azure/storage/common/storage-introduction)
- [Azure CLI Storage 명령어](https://learn.microsoft.com/ko-kr/cli/azure/storage)

---

⏱️ 생성일: 2025-05-12 01:09:10
