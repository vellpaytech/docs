---
title: 接口鉴权
description: VellPay RSA 签名、请求验签和回调验签规则。
---

## 加密方式

| 项目 | 取值 |
|---|---|
| 密钥算法 | RSA |
| 密钥长度 | 1024 bit |
| 签名算法 | SHA1WithRSA |
| 签名编码 | Base64 |
| 私钥格式 | PKCS8 |

商户使用自己的私钥签名，VellPay 使用商户公钥验签。平台回调使用平台私钥签名，商户使用平台公钥验签。接入前请先完成[创建密钥](/zh/guides/create-keys/)和公钥交换。

## 请求鉴权流程

1. 生成 13 位毫秒时间戳 `timestamp`。平台允许请求时间与平台当前时间相差不超过 5 分钟。
2. 为每次请求生成随机字符串 `nonce` 同一个 `appId` 在24小时不得重复使用相同 `nonce`。
3. 请求体字段名按照 ASCII 进行升序排序, 拼接为 a=1&b=2, 只对有值字段进行排序 (空值和空字符不参与加签)
4. 对排序结果后增加 nonce=123, 排序后为 a=1&b=2&nonce=123
6. 使用商户 PKCS8 私钥和 `SHA1WithRSA` 对签名原文加签，并将结果进行 Base64 编码。
7. 将签名结果放入请求头 `authorization`。


## 签名原文示例

请求体：

```json
{
  "merchantOrderNo": "ORDER202609170001",
  "transactionAmount": "100",
  "paymentType": "QR",
  "description": "test order"
}
```

请求头中的 `nonce`：

```text
7db2b04d77ad4315a7650ef3b31a82f1
```

排序并拼接后的签名原文：

```text
description=test order&merchantOrderNo=ORDER202609170001&paymentType=QR&transactionAmount=100&nonce=7db2b04d77ad4315a7650ef3b31a82f1
```

空值、`null` 和空字符串不参与签名。数组或对象字段使用请求 JSON 解析后的字符串形式参与拼接，商户侧必须确保生成方式与实际发送内容一致。

## Java 签名示例

```java
public static String sign(String content, String privateKey) throws Exception {
    byte[] keyBytes = Base64.getDecoder().decode(privateKey);
    PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
    PrivateKey key = KeyFactory.getInstance("RSA").generatePrivate(keySpec);

    Signature signature = Signature.getInstance("SHA1WithRSA");
    signature.initSign(key);
    signature.update(content.getBytes(StandardCharsets.UTF_8));
    return Base64.getEncoder().encodeToString(signature.sign());
}
```

传入方法的私钥应移除 PEM 头尾、空格和换行。

## 完整请求头示例

```http
appId: A2601010001ID001
timestamp: 1789526400000
nonce: 7db2b04d77ad4315a7650ef3b31a82f1
authorization: BASE64_RSA_SIGNATURE
```

国家优先由请求域名识别，商户正常接入时不需要发送 `country` 请求头。

## 回调验签与幂等

- 使用 VellPay 平台公钥验证回调签名。
- 验签规则与请求签名规则保持一致。
- 回调处理必须以商户订单号或平台订单号实现幂等。
- 回调验签成功并完成业务处理后，按照对应回调协议返回成功结果。
- 不应仅依赖回调；未收到回调时应通过查询接口确认最终状态。

## 常见验签失败原因

- 使用了错误环境或错误应用对应的密钥。
- 私钥包含 PEM 头尾、空格或换行。
- 字段排序方式不是 ASCII 升序。
- 空字段参与了签名。
- `nonce` 与请求头中的值不一致。
- 签名使用的请求体与最终发送的 JSON 内容不一致。
- 使用了错误的字符集，应固定为 UTF-8。
