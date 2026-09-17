---
title: 公共错误码
description: VellPay 网关鉴权及商户 API 通用错误码。
---

VellPay 使用响应字段 `code` 表示本次接口调用结果。`code=200` 仅表示接口请求处理成功，交易最终结果仍需结合 `data.status`、订单查询或回调判断。

## 网关鉴权错误

| 错误码 | 异常信息 | 处理建议 |
|---:|---|---|
| `401` | Header country error | 无法从域名或备用请求头识别国家，请确认国家测试域名 |
| `401` | Header appId is invalid | 检查 `appId` 是否属于当前环境和国家，格式及长度是否正确 |
| `401` | Header timestamp not found | 请求头缺少合法的 13 位毫秒时间戳 |
| `401` | Header timestamp expire | 请求时间与平台时间相差超过 5 分钟，请校准服务器时间 |
| `401` | Nonce verify fail | `nonce` 已使用或不合法，请生成新的随机字符串 |
| `401` | authorization verification failed | 检查签名原文、商户私钥、参数排序和 `Authorization` |
| `401` | app not set merchant public key | 当前应用未配置商户公钥，请先完成公钥交换 |
| `413` | json parse error | 请求体不是合法 JSON |
| `415` | body empty | 请求体为空 |
| `416` | gateway maintaining | 网关维护中，请稍后重试 |
| `500` | gateway error | 网关内部错误，请记录 `tid` 并联系 VellPay 技术支持 |

## 通用业务错误

| 错误码 | 异常信息 | 处理建议 |
|---:|---|---|
| `401` | signature verification failed | 签名验证失败，请重新生成签名 |
| `412` | Please try again later | 系统繁忙，请稍后重试 |
| `413` | Request timestamp Timestamp timeout | 请求时间戳超时，请使用当前毫秒时间戳 |
| `414` | parameter validation failed | 参数校验失败，以 `msg` 指出的具体字段为准 |
| `416` | Application not found | 应用不存在，请确认 `appId` 和调用环境 |
| `417` | Merchant account not found | 商户账户不存在或国家账户未开通 |
| `418` | Merchant account is closed | 商户账户已关闭，请联系技术支持 |
| `421` | This payout method is not supported | 当前国家不支持该 `payoutType` |
| `423` | This payment method is not supported | 当前国家不支持该 `paymentType` |
| `424` | This payment method is not configured | 商户未配置该代收方式 |
| `425` | Insufficient merchant balance | 商户可用余额不足 |
| `426` | merchant order duplicate | 商户订单号重复，请检查幂等逻辑或更换订单号 |
| `427` | The callback notification address for collection must not be empty. | 未配置代收回调地址 |
| `429` | The card number does not match the bank code. | 银行账号与银行编码不匹配 |
| `431` | The bank code does not supported. | 当前业务不支持该银行编码 |
| `433` | Payment way not support check out | 当前支付方式不支持收银台 |
| `434` | Merchant order not exist | 商户订单不存在，请检查订单号和接口类型 |
| `448` | request time out | 下游请求超时，请先查询原订单再决定是否重试 |
| `460` | The current payment method is unavailable. | 当前支付方式不可用，请更换方式或稍后重试 |
| `462` | This request failed due to blacklist blocking | 请求被风控黑名单拦截，请检查用户参数 |
| `466` | Payment method fee rate not configured. | 商户未配置该支付方式费率 |
| `473` | Merchant joint verification error | 商户国家、账户、支付方式或费率配置异常 |
| `487` | This API has not yet been made available. | 当前商户或国家尚未开放该接口 |
| `492` | The order amount does not fall within the configured amount range for the selected payment method. | 订单金额不在支付方式允许范围内 |
| `500` | Business Error | 通用业务异常，请记录请求信息和 `tid` 后联系技术支持 |

## 错误响应示例

```json
{
  "code": 414,
  "data": null,
  "msg": "paymentType is invalid",
  "tid": "747bbf80261844ed85b809212aab0d81"
}
```

:::tip
出现未知错误时，请保存完整请求、响应、请求时间、`appId`、商户订单号和 `tid`。不要向技术支持发送商户私钥或完整 `Authorization`。
:::
