import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'New to SOC',
  description: 'SOC 新人学习指南 + 行业观察',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,

  srcExclude: [
    '**/技术方案-VitePress-站点化-*.md',
    '**/README.md',
  ],

  themeConfig: {
    nav: [
      { text: '指南', link: '/01-fundamentals/what-is-soc' },
      { text: '工具', link: '/02-tools/siem' },
      { text: '流程', link: '/03-processes/triage-and-response' },
      { text: '技能', link: '/04-skills/log-analysis' },
      { text: '资源', link: '/05-resources/learning-resources' },
      { text: '产品视角', link: '/product-thinking' },
      { text: 'GitHub', link: 'https://github.com/Derek7552/new-to-soc' },
    ],

    sidebar: {
      '/01-fundamentals/': [
        {
          text: 'SOC 基础',
          items: [
            { text: '什么是 SOC', link: '/01-fundamentals/what-is-soc' },
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
      '/product-thinking': [
        {
          text: '产品视角',
          items: [
            { text: '产品思考', link: '/product-thinking' },
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
