# SOC 高频术语 Top 20

> 学习目标：掌握 SOC 日常工作中出现频率最高的 20 个核心术语，建立基本沟通词汇表。

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 1 | **SOC** | Security Operations Center | 安全运营中心。负责 7×24 小时监控、检测、分析和响应安全事件的集中化团队与设施 |
| 2 | **SIEM** | Security Information and Event Management | 安全信息与事件管理。SOC 的核心平台，集中收集、关联和分析安全日志并生成告警 |
| 3 | **SOAR** | Security Orchestration, Automation and Response | 安全编排、自动化与响应。将告警处置流程自动化，减少重复性人工操作 |
| 4 | **EDR** | Endpoint Detection and Response | 终端检测与响应。部署在终端上，实时监控进程、文件、网络等行为并提供响应能力 |
| 5 | **XDR** | Extended Detection and Response | 扩展检测与响应。跨终端、网络、云、邮件等多源数据的统一检测和响应平台 |
| 6 | **TDIR** | Threat Detection, Investigation and Response | 威胁检测、调查与响应。描述 SOC 核心工作流的完整闭环 |
| 7 | **MTTD** | Mean Time to Detect | 平均检测时间。从威胁进入环境到被发现的平均时长，衡量检测能力的关键指标 |
| 8 | **MTTR** | Mean Time to Respond | 平均响应时间。从确认事件到完成遏制/修复的平均时长，衡量响应效率的关键指标 |
| 9 | **IOC** | Indicator of Compromise | 失陷指标。用于识别已发生入侵的技术证据，如恶意 IP、域名、文件 Hash |
| 10 | **TTP** | Tactics, Techniques and Procedures | 战术、技术和程序。描述攻击者行为模式，比 IOC 更持久、更难改变 |
| 11 | **ATT&CK** | Adversarial Tactics, Techniques and Common Knowledge | MITRE 发布的攻击知识库框架，按战术和技术分类编目已知攻击行为 |
| 12 | **IR** | Incident Response | 事件响应。对已确认安全事件进行遏制、消除、恢复和复盘的完整流程 |
| 13 | **CTI** | Cyber Threat Intelligence | 网络威胁情报。关于威胁行为者、攻击手法和防御建议的结构化信息 |
| 14 | **C2 / C&C** | Command and Control | 命令与控制。攻击者远程操控被入侵系统的通信通道 |
| 15 | **FP / TP** | False Positive / True Positive | 误报 / 真阳性。FP 是告警误判为威胁，TP 是告警准确识别了真实威胁 |
| 16 | **APT** | Advanced Persistent Threat | 高级持续性威胁。有组织、有资源的攻击团体，长期潜伏并针对特定目标 |
| 17 | **IDS / IPS** | Intrusion Detection / Prevention System | 入侵检测/防御系统。监控网络流量，检测（IDS）或主动阻断（IPS）恶意活动 |
| 18 | **DLP** | Data Loss Prevention | 数据防泄漏。监控和防止敏感数据通过邮件、USB、云存储等渠道外泄 |
| 19 | **CVE** | Common Vulnerabilities and Exposures | 通用漏洞披露。为每个公开漏洞分配唯一编号（如 CVE-2024-3094） |
| 20 | **SLA** | Service Level Agreement | 服务等级协议。SOC 与业务方约定的告警响应时间、处置时效等量化指标 |

## 一句话记忆法

> SOC 用 **SIEM** 收日志、生告警，靠 **SOAR** 自动化处置，通过 **EDR/XDR** 看终端和全局，
> 核心工作流是 **TDIR**，用 **MTTD/MTTR** 衡量效率，
> 分析时看 **IOC** 和 **TTP**，映射到 **ATT&CK** 框架，
> 确认 **TP** 后走 **IR** 流程，参考 **CTI** 情报做决策。
