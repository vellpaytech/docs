---
title: 公共请求头
description: 所有 VellPay 商户接口共享的 Header 参数。
---

所有国家、所有接口统一使用以下请求头，接口页面不再重复定义。

| Header | 类型 | 必填 | 长度 | 说明 |
|---|---|---|---:|---|
| `appId` | String | 是 | - | VellPay 分配的应用标识 |
| `timestamp` | String | 是 | 13 | 当前毫秒时间戳，与平台时间差不得超过 5 分钟 |
| `nonce` | String | 是 | - | 单次请求随机字符串，不得重复使用 |
| `authorization` | String | 是 | - | 按 VellPay 鉴权规则生成的签名 |

```http
appId: YOUR_APP_ID
timestamp: 1789526400000
nonce: 7db2b04d77ad4315a7650ef3b31a82f1
authorization: YOUR_SIGNATURE
```
