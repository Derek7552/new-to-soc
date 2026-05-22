import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'New to SOC',
  description: 'SOC 新人学习指南 + 行业观察',
  lang: 'zh-CN',
  base: '/new-to-soc/',
  cleanUrls: true,
  lastUpdated: true,

  srcExclude: [
    '**/技术方案-VitePress-站点化-*.md',
    '**/README.md',
  ],

  themeConfig: {
    nav: [
      { text: '基础概念', link: '/01-fundamentals/what-is-soc' },
      { text: '常用工具', link: '/02-tools/siem' },
      { text: '运营流程', link: '/03-processes/triage-and-response' },
      { text: '技术能力', link: '/04-skills/log-analysis' },
      { text: '学习资源', link: '/05-resources/learning-resources' },
      { text: '业务视角', link: '/06-pm-perspective/01-market-landscape' },
      { text: 'GitHub', link: 'https://github.com/Derek7552/new-to-soc' },
    ],

    sidebar: {
      '/01-fundamentals/': [
        {
          text: 'SOC 基础',
          items: [
            { text: '什么是 SOC', link: '/01-fundamentals/what-is-soc' },
            { text: '安全运营是在运营什么', link: '/01-fundamentals/what-security-operations-operates-on' },
            { text: 'CIA 三要素', link: '/01-fundamentals/cia-triad' },
            { text: '网络攻击链', link: '/01-fundamentals/cyber-kill-chain' },
            { text: '常见威胁类型', link: '/01-fundamentals/common-threats' },
            { text: 'SOC 范式迁移', link: '/01-fundamentals/soc-paradigm-shift' },
            { text: '高频术语 Top 20', link: '/01-fundamentals/glossary-top20' },
            { text: '高频术语 Top 100', link: '/01-fundamentals/glossary-top100' },
          ],
        },
      ],
      '/02-tools/': [
        {
          text: '常用工具',
          items: [
            { text: 'SIEM 入门', link: '/02-tools/siem' },
            { text: 'Cortex 大平台', link: '/02-tools/cortex-platform' },
            { text: 'AI 原生 SOC 平台', link: '/02-tools/ai-soc-platforms' },
          ],
        },
      ],
      '/03-processes/': [
        {
          text: '运营流程',
          items: [
            { text: '告警分诊与响应', link: '/03-processes/triage-and-response' },
            { text: '漏洞管理流程', link: '/03-processes/vulnerability-management' },
            { text: '安全运营方法论', link: '/03-processes/security-operations-methodology' },
          ],
        },
      ],
      '/04-skills/': [
        {
          text: '技术能力',
          items: [
            { text: '日志分析', link: '/04-skills/log-analysis' },
            { text: '与 AI Agent 协作', link: '/04-skills/working-with-ai-agents' },
          ],
        },
      ],
      '/05-resources/': [
        {
          text: '学习资源',
          items: [
            { text: '学习资源汇总', link: '/05-resources/learning-resources' },
          ],
        },
      ],
      '/06-pm-perspective/': [
        {
          text: '业务视角',
          items: [
            { text: '市场全景', link: '/06-pm-perspective/01-market-landscape' },
            { text: '用户画像与 JTBD', link: '/06-pm-perspective/02-user-personas' },
            { text: '产品版图与竞品', link: '/06-pm-perspective/03-product-landscape' },
            { text: 'AI 原生 SOC 深度解析', link: '/06-pm-perspective/04-ai-soc-deep-dive' },
            { text: '技术架构决策', link: '/06-pm-perspective/05-technology-architecture' },
            { text: '商业模式与定价', link: '/06-pm-perspective/06-business-models' },
            { text: '运营流程与指标', link: '/06-pm-perspective/07-operations-and-metrics' },
            { text: '企业采购决策', link: '/06-pm-perspective/08-buying-evaluation' },
          ],
        },
        {
          text: '设计原则',
          items: [
            { text: '产品思考（设计原则摘要）', link: '/product-thinking' },
          ],
        },
      ],
    },

    search: { provider: 'local' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Derek7552/new-to-soc' },
    ],

    outline: { level: [2, 3], label: '本页内容' },

    docFooter: { prev: '上一页', next: '下一页' },

    lastUpdatedText: '最后更新于',

    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2026 Derek7552',
    },
  },
})
