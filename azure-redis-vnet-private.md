
# Azure Redis 설정 가이드 (VNet + Private Endpoint + Bicep 포함)

## 1. Azure Redis 기본 설정 (CLI)

```bash
# 변수 설정
RESOURCE_GROUP=myResourceGroup
REDIS_NAME=myRedisCache
LOCATION=koreacentral
SKU=Standard
VM_SIZE=C1

# 리소스 그룹 생성
az group create --name $RESOURCE_GROUP --location $LOCATION

# Redis 인스턴스 생성
az redis create \
  --name $REDIS_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku $SKU \
  --vm-size $VM_SIZE \
  --enable-non-ssl-port false
```

## 2. ARM 템플릿 예시

```json
{
  "type": "Microsoft.Cache/Redis",
  "apiVersion": "2023-04-01",
  "name": "[parameters('redisCacheName')]",
  "location": "[parameters('location')]",
  "properties": {
    "enableNonSslPort": false
  },
  "sku": {
    "name": "[parameters('skuName')]",
    "family": "C",
    "capacity": "[parameters('skuCapacity')]"
  }
}
```

## 3. Redis + VNet + Private Endpoint (Azure CLI)

```bash
# 변수 설정
RESOURCE_GROUP=myRedisRG
LOCATION=koreacentral
REDIS_NAME=myPrivateRedis
VNET_NAME=myRedisVNet
SUBNET_NAME=myRedisSubnet
PE_NAME=myRedisPrivateEndpoint

# VNet/Subnet 생성
az network vnet create \
  --resource-group $RESOURCE_GROUP \
  --name $VNET_NAME \
  --subnet-name $SUBNET_NAME \
  --location $LOCATION \
  --address-prefix 10.0.0.0/16 \
  --subnet-prefix 10.0.1.0/24

# Subnet 수정
az network vnet subnet update \
  --resource-group $RESOURCE_GROUP \
  --vnet-name $VNET_NAME \
  --name $SUBNET_NAME \
  --disable-private-endpoint-network-policies true

# Redis 생성
az redis create \
  --name $REDIS_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Premium \
  --vm-size P1 \
  --subnet-id <subnet-id> \
  --enable-non-ssl-port false

# Private Endpoint 생성
az network private-endpoint create \
  --name $PE_NAME \
  --resource-group $RESOURCE_GROUP \
  --vnet-name $VNET_NAME \
  --subnet $SUBNET_NAME \
  --private-connection-resource-id $(az redis show --name $REDIS_NAME --resource-group $RESOURCE_GROUP --query id -o tsv) \
  --group-id redisCache \
  --connection-name "${REDIS_NAME}-pe"
```

## 4. Bicep 템플릿 (확장 버전)

```bicep
@description('Azure Region')
param location string = 'koreacentral'

@description('Redis Cache 이름')
param redisName string = 'myPrivateRedis'

@description('VNet 이름')
param vnetName string = 'myRedisVNet'

@description('Subnet 이름')
param subnetName string = 'myRedisSubnet'

@description('Private Endpoint 이름')
param peName string = 'myRedisPrivateEndpoint'

@description('Private DNS Zone 이름')
param privateDnsZoneName string = 'privatelink.redis.cache.windows.net'

var vnetAddressPrefix = '10.0.0.0/16'
var subnetPrefix = '10.0.1.0/24'

resource vnet 'Microsoft.Network/virtualNetworks@2023-04-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [vnetAddressPrefix]
    }
    subnets: [
      {
        name: subnetName
        properties: {
          addressPrefix: subnetPrefix
          privateEndpointNetworkPolicies: 'Disabled'
        }
      }
    ]
  }
}

resource redis 'Microsoft.Cache/Redis@2023-04-01' = {
  name: redisName
  location: location
  sku: {
    name: 'Premium'
    family: 'P'
    capacity: 1
  }
  properties: {
    subnetId: vnet::subnets[0].id
    enableNonSslPort: false
    minimumTlsVersion: '1.2'
  }
}

resource privateDnsZone 'Microsoft.Network/privateDnsZones@2023-04-01' = {
  name: privateDnsZoneName
  location: 'global'
  properties: {}
}

resource vnetLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2023-04-01' = {
  name: 'vnetLink'
  parent: privateDnsZone
  location: 'global'
  properties: {
    virtualNetwork: {
      id: vnet.id
    }
    registrationEnabled: false
  }
}

resource privateEndpoint 'Microsoft.Network/privateEndpoints@2023-04-01' = {
  name: peName
  location: location
  properties: {
    subnet: {
      id: vnet::subnets[0].id
    }
    privateLinkServiceConnections: [
      {
        name: 'redisPrivateConnection'
        properties: {
          privateLinkServiceId: redis.id
          groupIds: [ 'redisCache' ]
        }
      }
    ]
  }
}

resource dnsZoneGroup 'Microsoft.Network/privateEndpoints/dnsZoneGroups@2023-04-01' = {
  name: 'default'
  parent: privateEndpoint
  properties: {
    privateDnsZoneConfigs: [
      {
        name: 'dnsconfig'
        properties: {
          privateDnsZoneId: privateDnsZone.id
        }
      }
    ]
  }
}
```
