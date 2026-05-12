# 大平台型 SOC：以 Palo Alto Cortex 为例

> 学习目标：理解大平台型 SOC 的产品形态、典型代表 Palo Alto Cortex，以及它如何从传统 SIEM/SOAR 演进到 AgentiX 的 AI 化反击。

## 什么是大平台型 SOC

**大平台型 SOC** 指由一家厂商提供从数据采集、存储、检测、响应、攻击面管理到 AI 编排的全栈一体化产品套件。

它的核心理念是：**用一家厂商的整套平台替换掉客户的多厂商工具栈**（SIEM + XDR + SOAR + ASM + ...）。

判断一个平台是不是大平台型，看三个特征：

1. **模块繁多**：SIEM、XDR、SOAR、ASM 等通常都有
2. **统一数据湖**：所有遥测数据汇入厂商专有数据湖
3. **企业级定价**：通常 $100K+/年起步，按用户数 + 数据摄入 + 模块授权多层叠加

## 代表产品：Palo Alto Cortex

Palo Alto Networks 的 Cortex 系列是大平台型 SOC 的典型代表。它本身就是由多个产品组成的"平台中的平台"。

### 一句话定位

**"面向现代 SOC 的唯一自主平台。"**

### 模块全景

| 模块 | 全称 | 角色 |
|------|------|------|
| **Cortex XSIAM** | Extended Security Intelligence & Automation Management | 核心 SOC 平台（SIEM + 数据湖 + 自动化分析） |
| **Cortex XDR** | Extended Detection and Response | 端点检测与响应（EDR/XDR） |
| **Cortex XSOAR** | Security Orchestration, Automation and Response | 安全编排自动化（前身为 Demisto） |
| **Cortex Xpanse** | — | 外部攻击面管理（ASM） |
| **Cortex AgentiX** | — | Agentic AI 编排引擎（2025-10 发布） |
| **Cortex XDL** | Extended Data Lake | 统一数据湖（所有模块的底座） |
| **Cortex Cloud ASPM** | Application Security Posture Management | 云应用安全态势管理 |

模块间关系简化图：

```
         ┌─────────────────────────────────────┐
         │    Cortex AgentiX（AI Agent 层）     │
         └────────┬───────────────────┬────────┘
                  │                   │
    ┌─────────────┴────┐    ┌─────────┴─────────┐
    │ XSIAM            │    │ XSOAR              │
    │ (SIEM + 分析)    │    │ (SOAR 自动化)      │
    └────────┬─────────┘    └─────────┬─────────┘
             │                        │
    ┌────────┴────────────────────────┴────────┐
    │      Cortex XDL（统一数据湖）             │
    └──────┬───────────┬───────────┬───────────┘
           │           │           │
        ┌──┴──┐    ┌───┴───┐   ┌───┴────┐
        │ XDR │    │Xpanse │   │ Cloud  │
        │终端 │    │攻击面 │   │ ASPM   │
        └─────┘    └───────┘   └────────┘
```

### 目标客户

Cortex 主要面向**大型企业 / 政府 / 军方**：

- Fortune 83 客户、Fortune 2000 中 54% 覆盖
- 美军 6 大军种、多国政府
- PeerSpot 数据显示大型企业用户占比 63%

**不是中小企业的菜** —— 价格、复杂度、专业服务要求都门槛极高。

### 优点（用户高频反馈）

| 优势 | 用户原话 |
|------|---------|
| **统一数据湖** | "所有日志终于不再分散在各种 SIEM 里" |
| **AI 检测** | "误报、漏报都明显减少" |
| **响应提速** | "响应时间缩短约 20%" / 官方宣传"98%" |
| **集成丰富** | "700+ 数据连接器，主流工具都开箱接入" |
| **GUI 友好** | "界面有冲击力，新人也愿意上手" |
| **企业级治理** | RBAC、审计、合规视图齐全 |

### 缺点（用户高频反馈）

| 短板 | 用户原话 |
|------|---------|
| **复杂度高** | "tuning 路径太多，不知道从哪里开始" |
| **学习曲线陡** | "需要技术资源专门配置" |
| **价格昂贵** | 政府采购约 £115/unit + 专业服务，"小团队负担不起" |
| **集成有偏差** | "标准集成范围有限，部分集成调优不到位" |
| **未调优时误报多** | "如果没配好，会被大量误报淹没" |
| **数据湖锁定** | 多家评测点名 "Vendor Lock-in by Design" |

### Cortex AgentiX：传统巨头的 AI 化反击

2025 年 10 月，Palo Alto Networks 推出 Cortex **AgentiX**，正面回应 Dropzone / Exaforce 等 AI 原生创业公司的冲击。

#### AgentiX 的核心架构

- **基础**：基于 XSOAR 沉淀的 1300+ Playbook 和 12 亿次真实剧本执行训练数据
- **能力**：1100+ 集成、内置 MCP 支持
- **AI 角色**：基于"人物画像"的系统智能体（persona-based system agents）
  - Email Threat Agent（邮件威胁调查）
  - Endpoint Forensics Agent（终端取证）
  - Threat Intel Enrichment Agent（情报富化）
  - Network Security Agent（网络安全）
  - Cloud Security Posture Agent（云态势）
  - IT Operations Agent（IT 运营）

#### 与 Dropzone 的本质区别

- **Dropzone**：从零搭建 AI Agent，靠 LLM + 内置情报 + 上下文记忆
- **Cortex AgentiX**：**把 LLM Agent 嫁接到既有 SOAR 体系上**，用海量 Playbook 训练数据作为护城河

简单比喻：
- Dropzone 是"新生代 AI 原生分析师"
- AgentiX 是"老牌剧本库 + 上面装了 AI 大脑"

两者目前还在不同细分市场（中型 vs 大型企业），但**长期会正面竞争**。

## 大平台型 vs AI 原生型：怎么选

### 适合选 Cortex 大平台

- 大型企业、政府、合规重监管行业
- 已有 Splunk / CrowdStrike / Demisto 等多套工具，想做整合
- 有专业 SOC 团队和实施资源（或者外采 MDR）
- 预算充足（$500K+/年量级）
- 需要全栈一体化、企业级治理

### 适合选 AI 原生平台（Dropzone 类）

- 中型企业、MSSP、3-50 人 SOC
- 已有 SIEM/EDR 但人力扩展性不足
- 需要快速部署见效（1 小时-1 周）
- 中等预算（$30K-$100K/年量级）
- 接受聚焦 Tier 1 调查，全生命周期靠组合

### 混合架构是大趋势

实际场景中，越来越多企业采用 **「Cortex / Splunk / Sentinel 做底座 + Dropzone / Exaforce 做 AI 分析师」** 的混合架构。

这是因为：
- 大平台短期内仍是数据采集与存储基础设施
- AI 原生产品在调查工种上更专精
- MCP 等开放协议正让两者协作变得更容易

## 新人怎么入门 Cortex 平台

### 第一步：先看清模块边界

新人最容易"模块混淆"，先记住：

| 想做什么 | 用哪个模块 |
|---------|-----------|
| 看告警、查日志、运行查询 | XSIAM |
| 调端点、隔离主机 | XDR |
| 跑自动化响应剧本 | XSOAR |
| 看外部资产暴露 | Xpanse |
| 让 AI Agent 替你调查 | AgentiX |
| 看公司云应用安全态势 | Cloud ASPM |

### 第二步：从 XSIAM 入手

如果你的公司在用 Cortex，**XSIAM 是你 80% 时间会用到的模块**。重点学：
- XSIAM 告警工作台（incident queue）
- XQL 查询语言（类似 Splunk SPL）
- 关联规则与检测规则的工作机制
- 数据集（Datasets）与解析器的概念

### 第三步：理解 XSOAR Playbook

XSOAR 是 SOC 自动化的代名词。新人需要：
- 看懂一个 Playbook 的执行流程
- 理解任务（Task）、剧本（Playbook）、操作手册（Runbook）的层次
- 能修改简单的 Playbook 参数（不一定要自己写）

### 第四步：观察 AgentiX 给你做了什么

如果你的公司启用了 AgentiX，主动去看每个 AI Agent 的：
- 接到了什么告警
- 调用了哪些工具
- 做出了什么判断
- 你和你同事最后批准 / 否决了什么

**这是你学习"AI 怎么做 SOC 工作"的第一手材料。**

## 同赛道其他大平台

除了 Cortex，大平台型 SOC 还有：

| 产品 | 特点 |
|------|------|
| **Splunk Enterprise Security**（Cisco） | SPL 查询语言生态强大，2026 推出 Agentic AI 模块 |
| **Microsoft Sentinel + Defender XDR** | 云原生、与 Microsoft 365 / Azure 深度集成、Security Copilot |
| **CrowdStrike Falcon** | 以 EDR 为底座的平台化扩展，Charlotte AI（强调 Human-in-Loop） |
| **IBM QRadar Suite** | 老牌 SIEM，向 AI 化平台演进 |
| **Stellar Cyber Open XDR** | 开放架构，特别适合 MSSP |

## 一句话总结

**Cortex 是大平台型 SOC 的代表 —— 全栈一体、企业级深度、定价高、复杂度高。它的 AgentiX 是传统巨头对 AI 原生创业公司的反击。新人需要理解大平台模块结构，并观察 AI 化是怎么发生的。**

## 下一步

- [SOC 范式迁移](../01-fundamentals/soc-paradigm-shift.md) —— 理解 Cortex 的演进背景
- [AI 原生 SOC 平台](ai-soc-platforms.md) —— 对照看：从零搭建的 AI 原生平台是什么样
- [SIEM 入门](siem.md) —— XSIAM 之下的 SIEM 基础概念
- [告警分诊与响应](../03-processes/triage-and-response.md) —— 使用 Cortex 的具体工作流
