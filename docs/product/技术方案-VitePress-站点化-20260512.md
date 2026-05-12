---
title: 技术方案 - VitePress 站点化 new-to-soc 学习指南
date: 2026-05-12
type: 技术方案讨论 (discuss-tech)
status: 待用户决策
author: Claude (架构师视角)
---

# 技术方案：用 VitePress 把 new-to-soc 学习指南站点化

> **讨论模式**：定向方案对比（B）—— 选型已倾向 VitePress，本文档负责验证决策、对比落地路径、给出可执行步骤。

---

## 0. TL;DR（30 秒结论）

| 项 | 结论 | 关键理由 |
|---|---|---|
| **静态站框架** | ✅ VitePress 1.x | 中文文档场景天花板高、原生 Markdown 兼容、构建快 |
| **目录布局** | ✅ 复用 `docs/`，新增 `docs/.vitepress/` | 现有 15 篇相对链接全部可直接工作，零迁移成本 |
| **侧边栏** | ✅ 手写显式声明（不自动生成） | 数字前缀目录的顺序需稳定可控 |
| **首页** | ✅ Hero + Features 模板 | 复用 README 文案，5 分钟就能写完 |
| **搜索** | ✅ 一期 local search，二期升级 Algolia | 15 篇内容用 local 完全够 |
| **图片** | ✅ 暂无图片，预留 `docs/public/` | 后续图片放这里，URL 形如 `/xxx.png` |
| **跨文档链接** | ✅ 现状基本无需修改 | VitePress 自动把 `.md` 链接转为 HTML 路由 |
| **数字前缀** | ⚠️ **保留** `01-fundamentals` 出现在 URL 中 | 重命名收益小、风险大（破坏外链） |
| **`docs/product/` 是否上线** | ✅ **排除**站点（仅保留 git 仓库） | 非学习内容，对读者有干扰 |
| **`product-thinking.md` 是否上线** | ⚠️ 由用户决策（建议排除） | 同上 |
| **部署平台** | ✅ **Cloudflare Pages**（首选） / Vercel（备选） | 国内访问性优于 GitHub Pages，免费额度够用 |
| **CI** | ✅ 平台原生构建（无需自写 GH Actions） | Cloudflare/Vercel 监听 git push 自动构建 |

---

## 1. 静态站框架选型对比

### 1.1 候选清单

| 框架 | 技术栈 | 主要受众 | 中文支持 |
|---|---|---|---|
| **VitePress** | Vite + Vue 3 | 文档站、技术博客 | ✅ 一流（Vue.js 中文文档官方使用） |
| Docusaurus | React + Webpack/Rspack | 大型开源项目文档 | ✅ 良好（i18n 完善但更重） |
| Nextra | Next.js + MDX | Notion 风格的现代文档 | ✅ 良好 |
| MkDocs Material | Python + Jinja2 | 偏技术文档 / 内部 wiki | ✅ 良好 |
| Astro Starlight | Astro | 极致性能、岛屿架构 | ✅ 良好（较新） |

### 1.2 维度对比

| 维度 | VitePress | Docusaurus | Nextra | MkDocs Material | Astro Starlight | 权重 |
|---|---|---|---|---|---|---|
| **零改造迁移现有 .md** | ✅ | ⚠️（需 docusaurus-config） | ⚠️（需 MDX 思维） | ✅ | ✅ | **高** |
| **首次构建 + 启动速度** | ✅ Vite 极快 | ⚠️ Webpack 慢 | ✅ Next.js 中等 | ✅ Python 中等 | ✅ Astro 快 | 高 |
| **中文 URL anchor** | ✅ 默认支持 | ✅ | ✅ | ✅ | ✅ | 高 |
| **侧边栏配置心智** | ✅ 一份 config.ts | ⚠️ JS + Markdown 双声明 | ⚠️ `_meta.json` | ✅ mkdocs.yml | ✅ frontmatter+config | 中 |
| **生态/插件丰富度** | ⚠️ 中等 | ✅ 最丰富 | ✅ Next 生态 | ✅ Python 插件多 | ⚠️ 较新 | 低 |
| **学习曲线** | ✅ 低 | ⚠️ 中 | ⚠️ 中（需懂 Next） | ✅ 低 | ⚠️ 中（Astro 概念新） | 中 |
| **国内访问表现** | ✅ 纯静态、可托管任意 CDN | ✅ 同 | ✅ 同 | ✅ 同 | ✅ 同 | 中 |
| **Vue 生态契合** | ✅ 原生 | ❌ React 系 | ❌ React 系 | — | — | 低 |

### 1.3 钢铁人论证（为什么不选其他方案）

**Docusaurus 最强的论据**：成熟稳定、Meta 官方维护、i18n 与版本化文档（v1/v2/v3）开箱即用。如果是 50+ 篇文档、多语言、多版本的场景，它是更稳的选择。
**为什么仍不选**：当前只有 15 篇中文单语单版本内容，Docusaurus 的复杂度是负担——光是 `docusaurus.config.js`+`sidebars.js`+`i18n` 三套配置就比 VitePress 全部加起来还多。

**MkDocs Material 最强的论据**：搜索体验业界第一、主题成熟度高、Python 生态友好。如果你日常写 Python，这是默认选择。
**为什么仍不选**：用户从 zenmux.ai 案例出发已有 VitePress 倾向，且 MkDocs 需要额外维护 Python 环境（pyenv/venv），对一个纯 Markdown 仓库不必要。

**Astro Starlight 最强的论据**：性能最好、岛屿架构允许局部交互、当下最"潮"。
**为什么仍不选**：太新（2024 才稳定），中文社区资料少，遇到问题排查成本高。文档站不是性能驱动场景。

### 1.4 推荐：VitePress

**正题**：选 VitePress，因为它在「零改造迁移现有 Markdown」「构建速度」「配置简洁度」三个最高权重维度上都得分最高。

**反题**（主动反驳）：VitePress 最大的风险是**生态相对薄弱**——一旦你想做个性化（如自定义文章卡片、复杂的全文检索分面、付费内容拦截），可能找不到现成插件，只能自己写 Vue 组件。

**合题**：当前项目是**纯学习指南**，没有定制化诉求，VitePress 的"够用"恰好匹配。如果未来发展成会员制内容平台或多语言站，可以那时再迁移到 Docusaurus（迁移成本不高，因为底层都是 Markdown）。

**反事实检验**：
- 如果推荐方案失败 → 最可能的原因是「想加复杂功能时找不到现成方案」
- 如果约束变化（如未来要做英文版+中文版双语） → 仍然推荐 VitePress（i18n 也支持），但要重新评估 Docusaurus

---

## 2. 项目目录与构建方案

### 2.1 候选方案

**方案 A：复用 `docs/`，配置目录嵌入 `docs/.vitepress/`**（VitePress 官方默认）

```
new-to-soc/
├── docs/                          ← srcDir
│   ├── .vitepress/
│   │   ├── config.mts             ← 唯一配置入口
│   │   ├── theme/                 ← 主题定制（如需要）
│   │   └── dist/                  ← 构建产物（gitignore）
│   ├── public/                    ← 静态资源（图片等）
│   ├── index.md                   ← 首页（新增）
│   ├── 01-fundamentals/           ← 现有内容，零迁移
│   ├── 02-tools/
│   ├── 03-processes/
│   ├── 04-skills/
│   └── 05-resources/
├── package.json                   ← 新增
├── README.md                      ← 保留（仓库门面）
└── .gitignore                     ← 新增
```

**方案 B：独立 `site/` 目录，把 docs/ 当 srcDir 链接进去**

```
new-to-soc/
├── docs/                          ← 原始 Markdown（不变）
├── site/
│   ├── .vitepress/config.mts      ← srcDir: '../docs'
│   ├── package.json
│   └── ...
└── README.md
```

### 2.2 对比分析

| 维度 | 方案 A（嵌入 docs/） | 方案 B（独立 site/） |
|---|---|---|
| 现有相对链接是否能工作 | ✅ 完全不变 | ✅ 同（srcDir 指向 docs/） |
| 配置就近原则 | ✅ 站点配置紧邻内容 | ⚠️ 配置远离内容，跳目录 |
| 工程复杂度 | ✅ 一个目录搞定 | ⚠️ 双目录，需理解 srcDir |
| 适合的场景 | 文档项目（本案例） | 文档+应用代码混合的 monorepo |
| VitePress 官方默认 | ✅ 是 | — |

### 2.3 推荐：方案 A

**理由**：本项目是**纯文档仓库**，没有应用代码混合的需求。方案 B 的"隔离性"在这个场景下是负价值（增加心智负担、增加配置复杂度）。

**钢铁人**：方案 B 的最强论据是"配置和内容物理隔离，未来如果想加 Vue 应用代码不会污染 docs/"。但这个未来场景不存在——本项目永远是文档仓库。

**第二序效应**：选方案 A 后，**根目录会多出 `package.json`、`node_modules/`、`.gitignore`** ——这些"前端工程文件"出现在一个原本"纯 Markdown 仓库"里，对只想读 README 的人略有突兀。但收益（配置就近、心智简单）远大于这点不适感。

---

## 3. 侧边栏 / 顶部导航 / 首页 / 搜索

### 3.1 顶部导航（nav）

```ts
nav: [
  { text: '指南', link: '/01-fundamentals/what-is-soc' },
  { text: '工具', link: '/02-tools/siem' },
  { text: '流程', link: '/03-processes/triage-and-response' },
  { text: '技能', link: '/04-skills/log-analysis' },
  { text: '资源', link: '/05-resources/learning-resources' },
  { text: 'GitHub', link: 'https://github.com/Derek7552/new-to-soc' }
]
```

> 5 个一级类目刚好对应 5 个顶部入口，中文标签更友好。

### 3.2 侧边栏（sidebar）

**候选 A**：自动生成（社区插件 `vitepress-sidebar`）
**候选 B**：手写显式声明

**推荐 B**，理由：
- 数字前缀目录顺序虽然字典序就对，但**未来插入「00-导读」或「02.5-补充」时**自动方案的稳定性差
- 显式声明让标题可以**与文件名解耦**（比如 `cia-triad.md` 在侧边栏显示为「CIA 三要素」而非「Cia Triad」）
- 15 篇内容手写一次性成本极低（5 分钟）

```ts
sidebar: {
  '/01-fundamentals/': [
    { text: 'SOC 基础', items: [
      { text: '什么是 SOC', link: '/01-fundamentals/what-is-soc' },
      { text: 'CIA 三要素', link: '/01-fundamentals/cia-triad' },
      { text: '网络攻击链', link: '/01-fundamentals/cyber-kill-chain' },
      { text: '常见威胁类型', link: '/01-fundamentals/common-threats' },
      { text: 'SOC 范式迁移', link: '/01-fundamentals/soc-paradigm-shift' },
      { text: '高频术语 Top 20', link: '/01-fundamentals/glossary-top20' },
      { text: '高频术语 Top 100', link: '/01-fundamentals/glossary-top100' },
    ]}
  ],
  '/02-tools/': [
    { text: '常用工具', items: [
      { text: 'SIEM 入门', link: '/02-tools/siem' },
      { text: 'Cortex 大平台', link: '/02-tools/cortex-platform' },
      { text: 'AI 原生 SOC 平台', link: '/02-tools/ai-soc-platforms' },
    ]}
  ],
  '/03-processes/': [
    { text: '运营流程', items: [
      { text: '告警分诊与响应', link: '/03-processes/triage-and-response' },
    ]}
  ],
  '/04-skills/': [
    { text: '技术能力', items: [
      { text: '日志分析', link: '/04-skills/log-analysis' },
      { text: '与 AI Agent 协作', link: '/04-skills/working-with-ai-agents' },
    ]}
  ],
  '/05-resources/': [
    { text: '学习资源', items: [
      { text: '学习资源汇总', link: '/05-resources/learning-resources' },
    ]}
  ],
}
```

### 3.3 首页（index.md）

```markdown
---
layout: home

hero:
  name: "New to SOC"
  text: "SOC 新人学习指南"
  tagline: 系统化的安全运营中心入门路径
  actions:
    - theme: brand
      text: 开始学习
      link: /01-fundamentals/what-is-soc
    - theme: alt
      text: GitHub
      link: https://github.com/Derek7552/new-to-soc

features:
  - icon: 🛡️
    title: 基础概念
    details: CIA、攻击链、威胁类型、SOC 范式迁移
    link: /01-fundamentals/what-is-soc
  - icon: 🔧
    title: 常用工具
    details: SIEM、Cortex、AI 原生 SOC 平台
    link: /02-tools/siem
  - icon: 📋
    title: 运营流程
    details: 告警分诊、事件响应、值班流程
    link: /03-processes/triage-and-response
  - icon: 💪
    title: 技术能力
    details: 日志分析、与 AI Agent 协作
    link: /04-skills/log-analysis
---
```

### 3.4 搜索：local vs Algolia

| 方案 | 配置成本 | 中文支持 | 适合规模 | 是否需要联网 |
|---|---|---|---|---|
| **local search**（内置 minisearch） | ✅ 一行配置 | ✅ 良好 | < 100 篇 | ❌ 不需要 |
| **Algolia DocSearch** | ⚠️ 需申请、配置 crawler | ✅ 优秀 | 不限 | ✅ 必须 |

**推荐**：一期用 local search，配置如下：
```ts
themeConfig: {
  search: { provider: 'local' }
}
```
**升级触发条件**：当文档超过 50 篇 / 用户反馈搜索不够智能 → 申请 Algolia DocSearch（开源项目免费）。

---

## 4. 与现有 Markdown 的兼容性处理

### 4.1 是否需要补 front-matter？

**结论：不需要**。VitePress 不强制 front-matter，没有 front-matter 时：
- 标题取自第一个 `#`
- URL 来自文件路径
- 描述来自第一段（用于 SEO）

**例外**：首页（`docs/index.md`）必须用 `layout: home` 才能渲染 Hero 模板。

### 4.2 跨文档相对链接（**关键点**）

现有链接形如：
```markdown
[CIA 三要素与安全基本概念](cia-triad.md)
[事件响应章节](../03-processes/triage-and-response.md)
[SOC 范式迁移](../01-fundamentals/soc-paradigm-shift.md)
```

**好消息**：VitePress 会自动把 `.md` 后缀转为 HTML 路由（甚至建议你这么写，方便 IDE 跳转）。**所有现有链接基本无需修改即可工作**。

**唯一需要小心的**：`README.md` 在 docs/ 之外，如果想链接到它需要单独处理。当前内容里没出现，可不管。

### 4.3 中文 heading anchor

VitePress 默认用 GitHub 风格的 anchor 生成器（基于 `markdown-it-anchor`），支持中文 heading 自动生成 anchor，例如：
```
## 什么是 SOC  →  #什么是-soc
```

**实测建议**：现有内容里同一篇文档没有重复中文标题，无碰撞风险。无需手动指定 `{#custom-id}`。

### 4.4 图片资源放置

当前**没有图片**（grep 验证 `![` 零结果）。未来加图片时建议：

| 放置位置 | 用法 | 适合 |
|---|---|---|
| `docs/public/imgs/xxx.png` | `![alt](/imgs/xxx.png)` | 全局共用图片 |
| `docs/01-fundamentals/imgs/xxx.png` | `![alt](./imgs/xxx.png)` | 单篇专用图片 |

**推荐**：建立 `docs/public/imgs/` 兜底，单篇专用走同级目录。**以一篇内容是否会被多篇引用作为决策依据**。

### 4.5 .DS_Store 处理

仓库当前**没有 `.gitignore`**，且 `.DS_Store` 已被跟踪（git status 显示）。

**第一步要做**：
```bash
# 1. 创建 .gitignore
echo ".DS_Store
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/" > .gitignore

# 2. 从 git 中移除已跟踪的 .DS_Store
git rm --cached .DS_Store docs/.DS_Store
```

### 4.6 docs/product/ 与 product-thinking.md 是否站点化？

> 🔄 **用户决策（2026-05-12）**：纳入站点（不排除）

| 文件 | 决策 | 说明 |
|---|---|---|
| `docs/product/竞品分析报告-AI-Native-SOC-Cortex-vs-Dropzone-20260511.md` | ✅ 纳入 | 作为延伸阅读补充材料 |
| `docs/product/技术方案-VitePress-站点化-20260512.md`（本文件） | ⚠️ 排除 | 工程类元文档，对学习者无价值 |
| `docs/product-thinking.md` | ✅ 纳入 | 用户决定保留 |

**实现策略**：
- 新增「**06-产品视角**」一级类目，把 `docs/product/` 重组到 `docs/06-product/`（或保留 `product/` 但加入侧边栏）
- 技术方案文档单独 `srcExclude`，因为它是本次工程留档

**推荐目录调整**（可选，更整洁）：
```bash
git mv docs/product docs/06-product-perspective
git mv docs/product-thinking.md docs/06-product-perspective/product-thinking.md
```

**对应 config**：
```ts
srcExclude: [
  '**/技术方案-VitePress-站点化-*.md',  // 工程类元文档排除
  '**/README.md'                          // 防止仓库根 README 被当作页面
]
```

**侧边栏新增**（见 §3.2 补充）：
```ts
'/06-product-perspective/': [
  { text: '产品视角', items: [
    { text: '产品思考', link: '/06-product-perspective/product-thinking' },
    { text: 'AI Native SOC 竞品分析（Cortex vs Dropzone）',
      link: '/06-product-perspective/竞品分析报告-AI-Native-SOC-Cortex-vs-Dropzone-20260511' },
  ]}
]
```

> **架构师提醒**：把竞品分析这种"决策类内容"放到学习指南站点里，会**轻微稀释站点定位**（"SOC 新人学习"变成"SOC 新人 + 行业观察"）。如果未来想保持学习指南的纯粹性，建议在首页 Hero 的副标题里就加入「学习指南 + 行业观察」，把扩展定位前置。

---

## 5. 部署平台对比

### 5.1 候选对比

| 维度 | GitHub Pages | Vercel | Cloudflare Pages |
|---|---|---|---|
| **CI 配置难度** | ⚠️ 需写 `.github/workflows/deploy.yml` | ✅ 零配置（连仓库即可） | ✅ 零配置（连仓库即可） |
| **base path 处理** | ⚠️ 需配 `base: '/new-to-soc/'` | ✅ 根域名，无 base 问题 | ✅ 根域名，无 base 问题 |
| **构建环境** | GitHub Actions（Node 任意版本） | Node 自动检测 | Node 自动检测 |
| **国内访问性** | ⚠️ 可访问但偶尔波动 | ⚠️ 可访问但偶尔波动 | ✅ 国内访问最稳 |
| **免费额度** | ✅ 完全免费 | ✅ Hobby 免费（足够） | ✅ Free 计划完全够 |
| **自定义域名 + HTTPS** | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| **构建产物预览（PR）** | ❌ 默认无 | ✅ 每个 PR 一个预览 URL | ✅ 每个 PR 一个预览 URL |
| **构建速度** | 中等 | 快 | 快 |

### 5.2 钢铁人论证

**GitHub Pages 最强的论据**：和 GitHub 仓库强绑定，永不下线、长期最稳。如果你只想"挂上去就忘了"，它最简单。
**为什么仍不推荐**：base path 问题导致首次配置容易踩坑（`/new-to-soc/` 前缀必须在 config 里写死，本地预览和线上路径不一致需要 `--base` 切换）；且 GitHub Pages 在国内偶尔被屏蔽。

**Vercel 最强的论据**：Next.js 系最佳搭档、PR 预览体验业界最好、Edge Network 全球分发。
**为什么仍不推荐**：国内访问性略不如 Cloudflare Pages（Vercel 在国内有时较慢）；且 Vercel 对 Hobby 用户的商业用途限制需注意。

### 5.3 推荐：Cloudflare Pages

**理由**：
- 国内访问最稳（CF 在国内有 PoP）
- 零 CI 配置，连接 GitHub 仓库即可
- 根域名部署，无 base path 问题
- 免费额度对个人项目完全够用（500 次构建/月，无限带宽）

**反事实**：如果未来用户主要在海外 / 想把 PR 预览体验做到极致 → 切到 Vercel。迁移成本极低（重新连接仓库即可）。

**时间轴推演**：
- **现在**：Cloudflare Pages 零配置上线，10 分钟搞定
- **3 个月后**：内容增长到 30+ 篇，仍然在免费额度内
- **12 个月后**：如果想加自定义功能（评论、分析），Cloudflare Workers 提供完整生态

---

## 6. 落地步骤拆解（可直接照做）

> 假设当前在 `/Users/derek/derekrepo/new-to-soc` 目录下。**用户决策完毕后再开始执行**。

### Step 0：清理现有脏文件 + 建 .gitignore

```bash
# 创建 .gitignore
cat > .gitignore <<'EOF'
.DS_Store
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
*.log
EOF

# 移除已被 git 跟踪的 .DS_Store
git rm --cached .DS_Store docs/.DS_Store 2>/dev/null
git add .gitignore
git commit -m "chore: 添加 .gitignore，移除 .DS_Store"
```

### Step 1：初始化 npm 项目 + 安装 VitePress

```bash
npm init -y
npm install -D vitepress

# 修改 package.json，添加 scripts
npm pkg set scripts.docs:dev="vitepress dev docs"
npm pkg set scripts.docs:build="vitepress build docs"
npm pkg set scripts.docs:preview="vitepress preview docs"
```

### Step 2：写配置 `docs/.vitepress/config.mts`

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'New to SOC',
  description: 'SOC 新人学习指南',
  lang: 'zh-CN',
  cleanUrls: true,                          // URL 不带 .html 后缀
  lastUpdated: true,
  srcExclude: [
    'product/**',
    'product-thinking.md',
    '**/README.md',
  ],
  themeConfig: {
    nav: [ /* 见 §3.1 */ ],
    sidebar: { /* 见 §3.2 */ },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Derek7552/new-to-soc' }
    ],
    outline: { level: [2, 3], label: '本页内容' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdatedText: '最后更新于',
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2026 Derek7552'
    }
  }
})
```

### Step 3：写首页 `docs/index.md`

按 §3.3 模板写入。

### Step 4：本地预览

```bash
npm run docs:dev
# → 浏览器打开 http://localhost:5173
```

**自检清单**：
- [ ] 首页 Hero 正常显示
- [ ] 顶部 5 个导航能点
- [ ] 每个分类页面侧边栏分组正确
- [ ] 跨文档链接（如 `[事件响应章节](../03-processes/triage-and-response.md)`）能跳转
- [ ] 中文 heading 的目录锚点工作正常
- [ ] 搜索框能搜出"SOC"、"SIEM" 等关键词

### Step 5：本地构建验证

```bash
npm run docs:build
npm run docs:preview
# 访问 http://localhost:4173 验证生产构建
```

### Step 6：部署到 Cloudflare Pages

1. 登录 https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. 选择 `new-to-soc` 仓库
3. 构建配置：
   - **Framework preset**: VitePress
   - **Build command**: `npm run docs:build`
   - **Build output directory**: `docs/.vitepress/dist`
   - **Node version**: 20（在 Environment variables 里加 `NODE_VERSION=20`）
4. 点击 Deploy，1-2 分钟后获得 `https://new-to-soc.pages.dev` 地址
5.（可选）绑定自定义域名

### Step 7：更新 README.md

在 README 顶部加一行：
```markdown
**📖 在线阅读：https://new-to-soc.pages.dev**
```

---

## 7. 风险与待验证假设

### 7.1 已识别风险

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 中文 heading anchor 在某些复杂标题下生成异常 | 低 | 链接 404 | 本地预览阶段全量点击验证 |
| `srcExclude` 配置不当导致首页 404 | 中 | 站点无法访问 | Step 4 第一时间验证 |
| Cloudflare Pages 构建 Node 版本默认偏低 | 中 | 构建失败 | 显式设置 `NODE_VERSION=20` |
| 未来加更多内容时手写侧边栏维护成本上升 | 中 | 维护负担 | 超过 50 篇时切到 vitepress-sidebar 自动方案 |

### 7.2 待验证假设

- **假设 1**：用户会接受 URL 中保留 `01-fundamentals` 数字前缀（不洁癖于纯英文路径）
- **假设 2**：用户没有「站点必须支持英文版」的诉求（i18n 不是 P0）
- **假设 3**：用户没有「每篇文档需要评论功能」的诉求（不需要接 Giscus/Utterances）

### 7.3 我可能错的地方

- **Cloudflare Pages 国内访问**这一点的判断基于 2025 年的体感数据，2026 年的网络环境可能已变化。如果用户主要受众在海外，建议平移到 Vercel。
- **VitePress local search 的中文分词**：minisearch 对中文是按字符切分（不是真正的分词），15 篇规模下基本无感，但如果未来扩到 50+ 篇可能搜索质量下降明显。

---

## 8. 讨论小结与下一步行动

### 8.1 关键决策点

| 决策点 | 推荐 | 用户需确认 |
|---|---|---|
| 静态站框架 | VitePress | ☐ |
| 目录布局 | 复用 docs/，配置嵌入 docs/.vitepress/ | ☐ |
| `docs/product/` 是否上线 | 排除 | ☐ |
| `docs/product-thinking.md` 是否上线 | 排除（建议） | ☐ |
| 数字前缀是否净化 URL | 保留 | ☐ |
| 部署平台 | Cloudflare Pages | ☐ |
| 搜索方案（一期） | local search | ☐ |

### 8.2 下一步行动（具体到第一条命令）

**用户决策完所有 ☐ 后**，第一条要执行的命令是：

```bash
# Step 0：清理脏文件 + 建 .gitignore
cat > .gitignore <<'EOF'
.DS_Store
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
*.log
EOF
git rm --cached .DS_Store docs/.DS_Store
git add .gitignore && git commit -m "chore: 添加 .gitignore，移除 .DS_Store"
```

之后按 §6 的 Step 1 → Step 7 顺序执行即可，全程预计 **30-60 分钟**（含 Cloudflare 账号配置）。

### 8.3 后续扩展路线（非必须）

| 时机 | 动作 |
|---|---|
| 内容超过 30 篇 | 评估是否引入 vitepress-sidebar 自动生成 |
| 内容超过 50 篇 | 申请 Algolia DocSearch（开源项目免费） |
| 收到读者反馈想加评论 | 集成 Giscus（基于 GitHub Discussions） |
| 想做英文版 | 启用 VitePress i18n（`/en/` 路径） |
| 想加访问统计 | Cloudflare Pages 自带分析 / 接 Plausible |

---

> **本文档归属**：`docs/product/`（不进入站点），仅作为本次工程决策的留档。

---

## 9. 架构决策记录（ADR）

> 本节为用户决策后追加。所有 ADR 状态：**已接受（Accepted）**，日期：**2026-05-12**。

### ADR-001：选用 VitePress 作为静态站框架

- **背景**：需要把 15 篇 Markdown 学习指南转为可访问的站点
- **决策**：使用 VitePress 1.x
- **理由**：零改造迁移、Vite 极速构建、中文支持一流、配置简洁
- **替代方案**：Docusaurus（更重）、MkDocs Material（需 Python 环境）、Astro Starlight（太新）
- **重评估触发**：内容增长到 50+ 篇且需要多语言/多版本 → 重新评估 Docusaurus

### ADR-002：项目目录采用「方案 A」复用 docs/

- **决策**：VitePress 配置嵌入 `docs/.vitepress/`，不引入独立 `site/` 目录
- **理由**：本项目是纯文档仓库，无应用代码混合需求；现有相对链接零改造
- **影响**：根目录新增 `package.json`、`.gitignore`、`node_modules/`
- **重评估触发**：未来若引入 Vue 应用代码 → 考虑切换到方案 B

### ADR-003：docs/product/ 与 product-thinking.md 纳入站点

- **决策**：作为「06-产品视角」一级类目纳入站点（与架构师推荐相反）
- **理由**：用户判断这些内容对读者有价值，扩展了"学习指南"的边界
- **影响**：
  - 站点定位从「纯学习指南」扩展为「学习指南 + 行业观察」
  - 建议首页副标题同步调整
  - 唯一排除项：`技术方案-VitePress-*.md`（工程元文档）
- **重评估触发**：用户调研发现读者对该类目无感 → 移出站点

### ADR-004：URL 保留数字前缀（`01-fundamentals/`）

- **决策**：不重命名目录，URL 形如 `/01-fundamentals/what-is-soc`
- **理由**：维护成本最低、不破坏现有相对链接
- **代价**：URL 略不"美观"，但对 SOC 学习站点无实质影响

### ADR-005：部署到 Cloudflare Pages

- **决策**：使用 Cloudflare Pages 部署，免费二级域名 `new-to-soc.pages.dev`
- **理由**：国内访问最稳、零 CI 配置、根域名免 base path 问题
- **替代方案**：
  - Vercel（PR 预览体验更好但国内访问略慢）
  - GitHub Pages（永不下线但需配 base path + 写 GH Actions）
- **重评估触发**：受众转为海外用户为主 → 切到 Vercel；或想要永不下线保证 → 加挂 GitHub Pages 做备份
- **自定义域名**：暂不购买，未来按需再加（绑定操作 3 分钟）

### ADR-006：一期使用 VitePress local search

- **决策**：`themeConfig.search = { provider: 'local' }`
- **理由**：15 篇规模下 minisearch 完全够用、零联网、一行配置
- **重评估触发**：内容超过 50 篇 / 用户反馈搜索质量下降 → 申请 Algolia DocSearch

---

## 10. 基于决策的最终配置文件（可直接复制）

> 本节为用户决策后追加。所有代码块均为最终落地版本。

### 10.1 最终 `docs/.vitepress/config.mts`

```ts
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
        { text: 'SOC 基础', items: [
          { text: '什么是 SOC', link: '/01-fundamentals/what-is-soc' },
          { text: 'CIA 三要素', link: '/01-fundamentals/cia-triad' },
          { text: '网络攻击链', link: '/01-fundamentals/cyber-kill-chain' },
          { text: '常见威胁类型', link: '/01-fundamentals/common-threats' },
          { text: 'SOC 范式迁移', link: '/01-fundamentals/soc-paradigm-shift' },
          { text: '高频术语 Top 20', link: '/01-fundamentals/glossary-top20' },
          { text: '高频术语 Top 100', link: '/01-fundamentals/glossary-top100' },
        ]},
      ],
      '/02-tools/': [
        { text: '常用工具', items: [
          { text: 'SIEM 入门', link: '/02-tools/siem' },
          { text: 'Cortex 大平台', link: '/02-tools/cortex-platform' },
          { text: 'AI 原生 SOC 平台', link: '/02-tools/ai-soc-platforms' },
        ]},
      ],
      '/03-processes/': [
        { text: '运营流程', items: [
          { text: '告警分诊与响应', link: '/03-processes/triage-and-response' },
        ]},
      ],
      '/04-skills/': [
        { text: '技术能力', items: [
          { text: '日志分析', link: '/04-skills/log-analysis' },
          { text: '与 AI Agent 协作', link: '/04-skills/working-with-ai-agents' },
        ]},
      ],
      '/05-resources/': [
        { text: '学习资源', items: [
          { text: '学习资源汇总', link: '/05-resources/learning-resources' },
        ]},
      ],
      '/product': [
        { text: '产品视角', items: [
          { text: '产品思考', link: '/product-thinking' },
          { text: 'AI Native SOC 竞品分析', link: '/product/竞品分析报告-AI-Native-SOC-Cortex-vs-Dropzone-20260511' },
        ]},
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
```

### 10.2 最终 `docs/index.md`

```markdown
---
layout: home

hero:
  name: "New to SOC"
  text: "SOC 新人学习指南"
  tagline: 系统化的安全运营中心入门路径 · 含行业观察
  actions:
    - theme: brand
      text: 开始学习
      link: /01-fundamentals/what-is-soc
    - theme: alt
      text: GitHub
      link: https://github.com/Derek7552/new-to-soc

features:
  - icon: 🛡️
    title: 基础概念
    details: CIA、攻击链、威胁类型、SOC 范式迁移
    link: /01-fundamentals/what-is-soc
  - icon: 🔧
    title: 常用工具
    details: SIEM、Cortex、AI 原生 SOC 平台
    link: /02-tools/siem
  - icon: 📋
    title: 运营流程
    details: 告警分诊、事件响应、值班流程
    link: /03-processes/triage-and-response
  - icon: 💪
    title: 技术能力
    details: 日志分析、与 AI Agent 协作
    link: /04-skills/log-analysis
  - icon: 📚
    title: 学习资源
    details: 书籍、认证、实验平台、社区
    link: /05-resources/learning-resources
  - icon: 🔭
    title: 产品视角
    details: 行业观察与 AI Native SOC 竞品分析
    link: /product-thinking
---
```

### 10.3 最终 `.gitignore`

```gitignore
.DS_Store
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
*.log
```

### 10.4 最终 `package.json` 关键字段

```json
{
  "name": "new-to-soc",
  "version": "1.0.0",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.5.0"
  }
}
```

---

## 11. 最终落地步骤（基于上述决策的精简版）

```bash
# Step 0: 清理脏文件 + 建 .gitignore
cat > .gitignore <<'EOF'
.DS_Store
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
*.log
EOF
git rm --cached .DS_Store docs/.DS_Store
git add .gitignore && git commit -m "chore: 添加 .gitignore，移除 .DS_Store"

# Step 1: 初始化 npm + 装 VitePress
npm init -y
npm install -D vitepress
npm pkg set scripts.docs:dev="vitepress dev docs"
npm pkg set scripts.docs:build="vitepress build docs"
npm pkg set scripts.docs:preview="vitepress preview docs"

# Step 2: 写 config（按 §10.1 模板，可由 Claude 直接生成）
mkdir -p docs/.vitepress
# → 写入 docs/.vitepress/config.mts

# Step 3: 写首页（按 §10.2 模板）
# → 写入 docs/index.md

# Step 4: 本地预览
npm run docs:dev
# → http://localhost:5173 验证

# Step 5: 本地构建验证
npm run docs:build && npm run docs:preview

# Step 6: 提交并推送
git add .
git commit -m "feat: 引入 VitePress，站点化学习指南"
git push origin main

# Step 7: Cloudflare Pages 控制台连接仓库（GUI 操作）
#   - Framework preset: VitePress
#   - Build command: npm run docs:build
#   - Build output directory: docs/.vitepress/dist
#   - NODE_VERSION=20
```

---

> **决策完成。** 文档结构变化通过 ADR 章节归档，可作为后续重评估的依据。
