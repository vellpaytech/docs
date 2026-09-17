import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

const api = (label, slug) => ({ label, slug });
const commonApis = [
  api("代收创建", "api/payment-create"), api("代收查询", "api/payment-query"),
  api("代付创建", "api/payout-create"), api("代付查询", "api/payout-query"),
  api("收银台创建", "api/checkout-create"), api("余额查询", "api/balance"),
];
const country = (label, code, extraItems = []) => ({
  label,
  collapsed: true,
  items: [
    ...commonApis.map(({ label, slug }) => ({ label, link: `/${slug}?country=${code.toUpperCase()}` })),
    ...extraItems,
  ],
});

export default defineConfig({
  site: "https://docs.vellpay.example",
  integrations: [
    starlight({
      title: "VellPay Developers",
      description: "VellPay 统一支付 API 开发者文档",
      defaultLocale: "zh",
      locales: { zh: { label: "中文", lang: "zh-CN" } },
      head: [
        { tag: "meta", attrs: { name: "theme-color", content: "#07111f" } },
        { tag: "link", attrs: { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" } },
      ],
      sidebar: [
        { label: "开发指南", items: [
          { label: "快速开始", slug: "guides/quick-start" },
          { label: "创建密钥", slug: "guides/create-keys" },
          { label: "接入指引", slug: "guides/getting-started" },
          { label: "公共请求头", slug: "guides/request-headers" },
          { label: "接口鉴权", slug: "guides/authentication" },
        ]},
        { label: "亚洲", items: [
          country("🇮🇩 印尼", "id"), country("🇻🇳 越南", "vn"), country("🇰🇷 韩国", "kr"),
          country("🇰🇭 柬埔寨", "kh", [
            { label: "KYC 创建", slug: "api/kyc-create" },
            { label: "KYC 查询", slug: "api/kyc-query" },
          ]),
          country("🇮🇳 印度", "in"),
        ]},
        { label: "拉丁美洲", items: [
          country("🇨🇴 哥伦比亚", "co"),
          country("🇦🇷 阿根廷", "ar", [
            { label: "悬账列表", slug: "api/suspense-list" }, { label: "凭证查询", slug: "api/suspense-query" },
            { label: "悬账补单", slug: "api/suspense-reorder" },
          ]),
          country("🇧🇷 巴西", "br"),
        ]},
      ],
      components: { ContentPanel: "./src/components/ContentPanel.astro" },
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
