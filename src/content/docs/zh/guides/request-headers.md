---
title: 公共请求头
description: 所有 VellPay 商户接口共享的 Header 参数。
---

所有国家、所有接口统一使用以下请求头，接口页面不再重复定义。

| Header | 类型 | 必填 | 长度 | 说明 |
|---|---|---|---:|---|
| `Content-Type` | String | 是 | - | 固定为 `application/json` |
| `timestamp` | String | 是 | 13 | 当前毫秒时间戳，与平台时间差不得超过 5 分钟 |
| `nonce` | String | 是 | - | 单次请求随机字符串，不得重复使用 |
| `appId` | String | 是 | - | VellPay 分配的应用标识 |
| `Authorization` | String | 是 | - | 按 VellPay 鉴权规则生成的签名 |

```http
Content-Type: application/json
timestamp: 1789526400000
nonce: 7db2b04d77ad4315a7650ef3b31a82f1
appId: YOUR_APP_ID
Authorization: YOUR_SIGNATURE
```

## 国家识别

平台优先从请求域名识别国家。正常接入不需要传递 `country` 请求头；仅在域名无法识别国家时，网关才会读取备用国家请求头。
