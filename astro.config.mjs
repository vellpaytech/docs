import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

const base = "/vellpaydocs";

const country = (label, slug, extraItems = []) => ({
  label,
  collapsed: true,
  items: [
    { label: "代收创建", link: `/${slug}/payin/create` },
    { label: "代收查询", link: `/${slug}/payin/query` },
    { label: "代付创建", link: `/${slug}/payout/create` },
    { label: "代付查询", link: `/${slug}/payout/query` },
    { label: "收银台创建", link: `/${slug}/checkout/create` },
    { label: "余额查询", link: `/${slug}/inquire/balance` },
    ...extraItems,
  ],
});

export default defineConfig({
  site: "https://vellpaytech.github.io",
  base,
  integrations: [
    starlight({
      title: "VellPay Developers",
      description: "VellPay 统一支付 API 开发者文档",
      defaultLocale: "zh",
      locales: { zh: { label: "中文", lang: "zh-CN" } },
      head: [
        { tag: "meta", attrs: { name: "theme-color", content: "#07111f" } },
        { tag: "link", attrs: { rel: "icon", type: "image/svg+xml", href: `${base}/favicon.svg` } },
      ],
      sidebar: [
        { label: "开发指南", items: [
          { label: "快速开始", slug: "guides/quick-start" },
          { label: "创建密钥", slug: "guides/create-keys" },
          { label: "接入指引", slug: "guides/getting-started" },
          { label: "公共请求头", slug: "guides/request-headers" },
          { label: "接口鉴权", slug: "guides/authentication" },
          { label: "公共错误码", slug: "guides/error-codes" },
        ]},
        { label: "亚洲", items: [
          country("🇮🇩 印尼", "indonesia"), country("🇻🇳 越南", "vietnam"), country("🇰🇷 韩国", "korea"),
          country("🇰🇭 柬埔寨", "cambodia", [
            { label: "KYC 创建", link: "/cambodia/kyc/create" },
            { label: "KYC 查询", link: "/cambodia/kyc/query" },
          ]),
          country("🇮🇳 印度", "india"),
        ]},
        { label: "拉丁美洲", items: [
          country("🇨🇴 哥伦比亚", "colombia"),
          country("🇦🇷 阿根廷", "argentina", [
            { label: "悬账列表", link: "/argentina/suspense/list" },
            { label: "凭证查询", link: "/argentina/suspense/query" },
            { label: "悬账补单", link: "/argentina/suspense/reorder" },
          ]),
          country("🇧🇷 巴西", "brazil"),
        ]},
      ],
      components: { ContentPanel: "./src/components/ContentPanel.astro" },
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
