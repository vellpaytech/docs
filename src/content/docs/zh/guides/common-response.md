---
title: 公共响应
description: 所有 VellPay 商户 API 统一使用的响应结构。
---

所有国家、所有接口统一使用以下响应结构。具体业务字段位于 `data`，并在各接口页面单独说明。

## 响应参数

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `code` | Integer | 是 | 响应状态码，`200` 表示接口请求处理成功 |
| `data` | Object / Array / null | 是 | 业务响应数据，结构以具体接口为准 |
| `msg` | String | 否 | 响应说明或具体错误信息 |
| `tid` | String | 是 | 请求追踪标识，排查问题时需要提供 |

## 成功响应示例

```json
{
  "code": 200,
  "data": {},
  "msg": "success",
  "tid": "747bbf80261844ed85b809212aab0d81"
}
```

## 错误响应示例

```json
{
  "code": 414,
  "data": null,
  "msg": "paymentType is invalid",
  "tid": "747bbf80261844ed85b809212aab0d81"
}
```

`code` 非 `200` 时应按失败处理，并保存 `tid`。错误码含义和处理建议参见[公共错误码](/zh/guides/error-codes/)。
