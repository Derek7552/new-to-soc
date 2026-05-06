# SOC 高频术语 Top 100

> 学习目标：全面掌握 SOC 领域常用术语，按工作流 7 个阶段组织，建立系统化认知。

## 全局视图：SOC 运营生命周期

```
┌──────────────────────────  准备阶段  ──────────────────────────┐
│                                                                │
│  ① 防御基座（29）              ② 威胁认知（30）                  │
│  搭团队、建平台、筑防线         了解对手、攻击手法与漏洞           │
│                                                                │
└───────────────┬────────────────────────────────┬───────────────┘
                │                                │
                ▼                                ▼
┌──────────────────────────  执行阶段  ──────────────────────────┐
│                                                                │
│  ③ 监控检测（14）→  ④ 分诊调查（7）→  ⑤ 响应处置（5）           │
│  采数据、跑规则      研判告警、深入取证   遏制、消除、修复        │
│                                                                │
└───────────────────────────────┬────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────  改进阶段  ──────────────────────────┐
│                                                                │
│  ⑥ 恢复运营（3）              ⑦ 度量合规（12）                  │
│  灾备恢复、业务连续             效能指标、框架与合规              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 阶段一：防御基座 — 搭团队、建平台、筑防线（29 个）

> 一切安全运营的起点：先有组织和流程，再有平台和防线。

### 1a. SOC 组织与流程

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 1 | **SOC** | Security Operations Center | 安全运营中心。7×24 监控、检测、分析和响应安全事件的集中化团队与设施 |
| 2 | **CSIRT** | Computer Security Incident Response Team | 计算机安全事件响应团队。专职处理安全事件的团队 |
| 3 | **MDR** | Managed Detection and Response | 托管检测与响应。由第三方提供的 SOC 运营服务 |
| 4 | **SOP** | Standard Operating Procedure | 标准操作规程。针对特定告警类型的标准化分析和处置步骤 |
| 5 | **Runbook** | — | 运维手册。面向特定场景的详细操作步骤 |
| 6 | **Playbook** | — | 响应剧本。事件响应的预定义流程，通常可在 SOAR 中自动执行 |

**流程逻辑**：成立 **SOC** 或 **CSIRT**（也可外包给 **MDR**）→ 编写 **SOP** 规范日常操作 → 将常见场景整理为 **Runbook** → 把可自动化的流程编排为 **Playbook**。

### 1b. 网络防御架构

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 7 | **NGFW** | Next-Generation Firewall | 下一代防火墙。集成应用识别、IPS、URL 过滤的防火墙 |
| 8 | **IDS** | Intrusion Detection System | 入侵检测系统。检测恶意网络活动并告警 |
| 9 | **IPS** | Intrusion Prevention System | 入侵防御系统。检测并主动阻断恶意活动 |
| 10 | **WAF** | Web Application Firewall | Web 应用防火墙。防御 SQL 注入、XSS 等 Web 攻击 |
| 11 | **DMZ** | Demilitarized Zone | 隔离区。放置对外服务的网络区域，隔离内外网 |
| 12 | **VLAN** | Virtual Local Area Network | 虚拟局域网。在逻辑上隔离网络流量 |
| 13 | **ACL** | Access Control List | 访问控制列表。定义允许或拒绝的网络访问规则 |
| 14 | **VPN** | Virtual Private Network | 虚拟专用网络。加密远程访问通道 |
| 15 | **Proxy** | — | 代理服务器。转发和过滤网络请求，也是重要的日志来源 |
| 16 | **TLS/SSL** | Transport Layer Security / Secure Sockets Layer | 传输层安全协议。加密网络通信 |

**部署逻辑**：**NGFW** 守边界 → **IDS/IPS** 监控流量 → **WAF** 防护 Web 应用 → 用 **DMZ** + **VLAN** + **ACL** 划分网络区域 → **VPN** 保障远程接入 → **Proxy** 管控出站 → **TLS/SSL** 加密传输。

### 1c. 终端防护

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 17 | **AV** | Antivirus | 杀毒软件。基于签名匹配的恶意软件检测 |
| 18 | **EPP** | Endpoint Protection Platform | 终端保护平台。集成 AV、防火墙、设备控制的端点防护 |
| 19 | **EDR** | Endpoint Detection and Response | 终端检测与响应。实时监控终端行为并提供响应能力 |

**演进逻辑**：传统 **AV**（签名查杀）→ **EPP**（多层防护）→ **EDR**（行为检测 + 响应），能力逐层递进。

### 1d. 身份与访问控制

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 20 | **IAM** | Identity and Access Management | 身份与访问管理。管理用户身份、认证和授权 |
| 21 | **PAM** | Privileged Access Management | 特权访问管理。管理和审计特权账号的使用 |
| 22 | **MFA** | Multi-Factor Authentication | 多因素认证。密码 + 手机/硬件令牌等多重验证 |
| 23 | **SSO** | Single Sign-On | 单点登录。一次认证即可访问多个系统 |
| 24 | **AD** | Active Directory | 活动目录。Windows 域环境的核心身份和权限管理服务 |
| 25 | **LDAP** | Lightweight Directory Access Protocol | 轻量目录访问协议。查询和管理目录服务 |
| 26 | **Kerberos** | — | Windows 域认证协议。SOC 需关注票据攻击（Golden/Silver Ticket） |
| 27 | **Zero Trust** | — | 零信任。"永不信任，始终验证"的安全架构理念 |

**逻辑链**：用 **IAM** 管全员身份 → **PAM** 单独管控特权账号 → **MFA** 强化认证 → **SSO** 统一入口 → 底层依赖 **AD** + **LDAP** + **Kerberos** → 架构理念向 **Zero Trust** 演进。

### 1e. 数据保护

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 28 | **DLP** | Data Loss Prevention | 数据防泄漏。防止敏感数据通过邮件/USB/云等渠道外泄 |
| 29 | **CASB** | Cloud Access Security Broker | 云访问安全代理。监控和管控用户对云服务的使用 |

**逻辑链**：**DLP** 防本地数据外泄 → **CASB** 把管控延伸到云端。

---

## 阶段二：威胁认知 — 了解对手、攻击手法与漏洞（30 个）

> 防线建好后，必须了解威胁全貌：谁在攻击、怎么攻击、利用什么漏洞。

### 2a. 情报体系

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 30 | **CTI** | Cyber Threat Intelligence | 网络威胁情报。关于威胁行为者和攻击手法的结构化信息 |
| 31 | **TIP** | Threat Intelligence Platform | 威胁情报平台。聚合、关联和分发威胁情报的工具 |
| 32 | **OSINT** | Open Source Intelligence | 开源情报。从公开信息源收集的情报 |
| 33 | **STIX** | Structured Threat Information Expression | 结构化威胁信息表达。威胁情报的标准化数据格式 |
| 34 | **TAXII** | Trusted Automated Exchange of Intelligence Information | 可信自动化情报交换。威胁情报的标准传输协议 |
| 35 | **IOC** | Indicator of Compromise | 失陷指标。已发生入侵的技术证据（恶意 IP、Hash 等） |
| 36 | **IOA** | Indicator of Attack | 攻击指标。正在进行攻击的行为特征，比 IOC 更关注行为 |

**逻辑链**：建立 **CTI** 情报能力 → 用 **TIP** 平台管理情报 → 从 **OSINT** 等渠道采集 → 用 **STIX** 格式标准化 → 通过 **TAXII** 协议共享 → 落地为可操作的 **IOC**（事后指标）和 **IOA**（事中行为）。

### 2b. 攻击框架与对手画像

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 37 | **ATT&CK** | Adversarial Tactics, Techniques and Common Knowledge | MITRE 攻击知识库。按战术和技术编目已知攻击行为 |
| 38 | **TTP** | Tactics, Techniques and Procedures | 战术、技术和程序。攻击者行为模式的三层描述 |
| 39 | **APT** | Advanced Persistent Threat | 高级持续性威胁。有组织的长期定向攻击团体 |

**逻辑链**：**ATT&CK** 是理解攻击的"字典" → 每个攻击者有独特的 **TTP** 指纹 → **APT** 是最需警惕的高级对手。

### 2c. 漏洞管理

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 40 | **CVE** | Common Vulnerabilities and Exposures | 通用漏洞披露。公开漏洞的唯一编号体系 |
| 41 | **CVSS** | Common Vulnerability Scoring System | 通用漏洞评分系统。0–10 分衡量漏洞严重性 |
| 42 | **0-day** | Zero-Day | 零日漏洞。尚无补丁的漏洞，被利用时防御方毫无准备 |

**逻辑链**：每个漏洞分配 **CVE** 编号 → 用 **CVSS** 评估严重性并排优先级 → 最危险的是还没有补丁的 **0-day**。

### 2d. 恶意软件家族

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 43 | **Malware** | Malicious Software | 恶意软件。包括病毒、木马、蠕虫、勒索软件等总称 |
| 44 | **Ransomware** | — | 勒索软件。加密文件并索要赎金 |
| 45 | **RAT** | Remote Access Trojan | 远程访问木马。允许攻击者远程控制受害者系统 |
| 46 | **Rootkit** | — | 内核级隐藏工具。深度潜伏在操作系统中，极难检测 |
| 47 | **Dropper** | — | 投放器。负责释放和安装实际恶意载荷的初始程序 |
| 48 | **Payload** | — | 载荷。攻击中实际执行恶意功能的代码 |

**逻辑链**：**Malware** 是总称 → **Dropper** 先落地 → 释放 **Payload** → 可能是 **Ransomware**（加密勒索）或 **RAT**（远程控制）→ 高级攻击还可能植入 **Rootkit** 深度隐藏。

### 2e. 攻击技术图谱（按攻击链先后）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 49 | **Credential Stuffing** | — | 撞库攻击。用泄露的账号密码尝试登录其他服务 |
| 50 | **DoS / DDoS** | Denial of Service / Distributed DoS | 拒绝服务攻击。通过大量流量使目标不可用 |
| 51 | **MitM** | Man-in-the-Middle | 中间人攻击。截获并可能篡改通信双方的数据 |
| 52 | **Privilege Escalation** | — | 权限提升。攻击者从低权限获取高权限 |
| 53 | **Lateral Movement** | — | 横向移动。从已攻陷主机向网络中其他系统扩散 |
| 54 | **Persistence** | — | 持久化。在系统中建立长期驻留机制 |
| 55 | **C2 / C&C** | Command and Control | 命令与控制。攻击者远程操控被入侵系统的通信通道 |
| 56 | **DGA** | Domain Generation Algorithm | 域名生成算法。自动生成大量 C2 域名以规避封锁 |
| 57 | **Beaconing** | — | 信标通信。被控主机定期向 C2 服务器发送心跳请求 |
| 58 | **Living off the Land (LotL)** | — | 就地取材攻击。利用系统自带工具（PowerShell、WMI）执行攻击 |
| 59 | **Exfiltration** | — | 数据渗出。将窃取的数据传出目标网络 |

**按攻击链顺序理解**：**Credential Stuffing** / **DoS** / **MitM**（初始攻击）→ **Privilege Escalation**（提权）→ **Lateral Movement**（横向扩散）→ **Persistence**（建立据点）→ 通过 **C2** 远程控制（**DGA** 生成域名、**Beaconing** 保持连接）→ 用 **LotL** 规避检测 → 最终 **Exfiltration** 窃取数据。

---

## 阶段三：监控检测 — 采集数据、匹配规则、生成告警（14 个）

> 防线就绪、敌情明确后，进入日常值守：让数据流进来，让规则跑起来，让告警弹出来。

### 3a. 检测平台

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 60 | **SIEM** | Security Information and Event Management | 安全信息与事件管理。集中收集、关联和分析日志并生成告警 |
| 61 | **XDR** | Extended Detection and Response | 扩展检测与响应。跨终端/网络/云/邮件的统一检测 |
| 62 | **NDR** | Network Detection and Response | 网络检测与响应。基于网络流量的威胁检测 |
| 63 | **UEBA** | User and Entity Behavior Analytics | 用户和实体行为分析。基于机器学习检测异常行为 |
| 64 | **SOAR** | Security Orchestration, Automation and Response | 安全编排与自动化。将检测到响应的流程自动化 |

**平台协作**：**SIEM** 汇聚全量日志做关联分析 → **XDR** 跨域联合检测 → **NDR** 专注网络层 → **UEBA** 补充行为异常检测 → **SOAR** 自动化编排处置动作。

### 3b. 数据采集层

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 65 | **PCAP** | Packet Capture | 网络数据包捕获。完整记录网络通信内容 |
| 66 | **NetFlow** | — | 网络流量元数据。记录源/目的/端口/字节数，不含载荷 |
| 67 | **DNS** | Domain Name System | 域名系统。域名解析日志是 C2 检测和情报分析的重要数据源 |
| 68 | **DPI** | Deep Packet Inspection | 深度包检测。检查数据包的应用层内容 |

**数据分层**：**NetFlow** 看流量概貌（谁和谁通信）→ **DNS** 日志看域名解析（访问了什么）→ **DPI** 深入看应用层 → **PCAP** 全量抓包做最终取证。

### 3c. 检测规则

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 69 | **Sigma** | — | 通用日志检测规则格式。跨 SIEM 平台的告警规则标准 |
| 70 | **YARA** | — | 恶意软件分类规则引擎。通过模式匹配识别恶意文件 |
| 71 | **Hash** | — | 哈希值。文件的唯一指纹（MD5/SHA1/SHA256），用于恶意文件比对 |

**规则分工**：**Sigma** 匹配日志行为 → **YARA** 匹配文件特征 → **Hash** 做精确的已知恶意文件比对。

### 3d. 告警质量

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 72 | **FP** | False Positive | 误报。告警误判为威胁 |
| 73 | **TP** | True Positive | 真阳性。告警准确识别了真实威胁 |
| 74 | **FN** | False Negative | 漏报。真实威胁未被检测到，比误报危害更大 |

**核心关系**：检测的目标是最大化 **TP**、最小化 **FP** 和 **FN** — 太多 **FP** 淹没分析师，**FN** 则意味着威胁被漏掉。

---

## 阶段四：分诊调查 — 告警研判、深入取证（7 个）

> 告警弹出后，分析师开始工作：快速判断优先级，确认真假，必要时深入取证。

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 75 | **TDIR** | Threat Detection, Investigation and Response | 威胁检测、调查与响应。SOC 核心工作流的完整闭环 |
| 76 | **Triage** | — | 分诊。对告警做快速判断，确定优先级和真假阳性 |
| 77 | **Sandbox** | — | 沙箱。在隔离环境中执行可疑文件，观察其行为 |
| 78 | **DFIR** | Digital Forensics and Incident Response | 数字取证与事件响应。事件调查中的证据收集与分析 |
| 79 | **RCA** | Root Cause Analysis | 根因分析。找出安全事件的根本原因而非表面症状 |
| 80 | **CoC** | Chain of Custody | 证据保管链。记录数字证据的完整流转过程，确保法律效力 |
| 81 | **IOT** | Indicator of Testing | 测试指标。区分真实攻击与渗透测试/红队活动的标记 |

**工作流程**：进入 **TDIR** 循环 → **Triage** 快速分诊（排除 **IOT** 测试活动）→ 可疑文件扔进 **Sandbox** 观察行为 → 确认后启动 **DFIR** 取证 → **RCA** 追根因 → 全程维护 **CoC** 证据链。

---

## 阶段五：响应处置 — 遏制、消除、修复（5 个）

> 调查确认入侵后，立即行动：先控制局面，再清除威胁，最后修补根因。

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 82 | **IR** | Incident Response | 事件响应。对安全事件进行遏制、消除、恢复和复盘的完整流程 |
| 83 | **Containment** | — | 遏制。限制安全事件的影响范围（如隔离主机、封锁 IP） |
| 84 | **Eradication** | — | 消除。清除环境中的威胁因素（恶意软件、后门、恶意账号） |
| 85 | **Remediation** | — | 修复。修补导致事件的根本原因（补丁、配置加固） |

**处置顺序**：启动 **IR** 流程 → 先 **Containment** 止血（隔离受感染系统）→ 再 **Eradication** 清除威胁 → 最后 **Remediation** 修补漏洞防止复发。

---

## 阶段六：恢复运营 — 灾备恢复、业务连续（3 个）

> 威胁清除后，将系统和业务恢复到正常状态。

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 86 | **BCP** | Business Continuity Plan | 业务连续性计划。确保重大事件发生时业务能持续运行 |
| 87 | **DR** | Disaster Recovery | 灾难恢复。系统和数据的恢复计划与能力 |
| 88 | **RTO / RPO** | Recovery Time Objective / Recovery Point Objective | 恢复时间目标 / 恢复点目标。RTO 是能忍受的最长停机时间，RPO 是能接受的最大数据丢失量 |

**逻辑链**：按 **BCP** 计划保障业务连续 → 执行 **DR** 灾难恢复 → **RTO/RPO** 是衡量恢复是否达标的核心指标。

---

## 阶段七：度量合规 — 效能衡量与合规治理（12 个）

> 贯穿所有阶段的闭环：用数据衡量 SOC 效能，用框架确保合规。

### 7a. SOC 效能度量

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 89 | **MTTD** | Mean Time to Detect | 平均检测时间。威胁进入环境到被发现的平均时长 |
| 90 | **MTTA** | Mean Time to Acknowledge | 平均确认时间。告警触发到分析师开始处理的平均时长 |
| 91 | **MTTR** | Mean Time to Respond | 平均响应时间。确认事件到完成遏制/修复的平均时长 |
| 92 | **MTBC** | Mean Time Between Compromises | 平均失陷间隔。两次安全事件之间的平均时长 |
| 93 | **SLA** | Service Level Agreement | 服务等级协议。与业务方约定的响应时效等量化承诺 |
| 94 | **SLO** | Service Level Objective | 服务等级目标。SLA 内的具体可量化目标值 |
| 95 | **KPI** | Key Performance Indicator | 关键绩效指标。如告警关闭率、MTTD/MTTR、误报率等 |

**度量链路**：**MTTD**（发现多快）→ **MTTA**（响应多快）→ **MTTR**（处置多快）→ **MTBC**（多久出事一次）→ 汇总为 **KPI** → 写入 **SLA/SLO** 作为对业务方的承诺。

### 7b. 合规框架与治理

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 96 | **NIST** | National Institute of Standards and Technology | 美国国家标准与技术研究院。发布 CSF（网络安全框架）等权威标准 |
| 97 | **ISO 27001** | — | 信息安全管理体系国际标准。组织级安全管理认证 |
| 98 | **GDPR** | General Data Protection Regulation | 通用数据保护条例。欧盟数据隐私法规，违规通报时限 72 小时 |
| 99 | **PCI DSS** | Payment Card Industry Data Security Standard | 支付卡行业数据安全标准。涉及支付数据的安全合规要求 |
| 100 | **GRC** | Governance, Risk and Compliance | 治理、风险与合规。组织级安全管理的三大支柱 |

**合规体系**：以 **GRC** 为整体治理框架 → 参照 **NIST** CSF 建立安全能力 → 通过 **ISO 27001** 体系认证 → 满足行业法规（**GDPR** / **PCI DSS**）的具体要求。

---

## 速查索引

按字母排序，括号内为编号。

```
0-day(42)  ACL(13)  AD(24)  APT(39)  ATT&CK(37)  AV(17)
BCP(86)  Beaconing(57)  C2(55)  CASB(29)  CoC(80)  Containment(83)
Credential Stuffing(49)  CSIRT(2)  CTI(30)  CVE(40)  CVSS(41)
DFIR(78)  DGA(56)  DLP(28)  DMZ(11)  DNS(67)  DoS/DDoS(50)
DPI(68)  DR(87)  Dropper(47)  EDR(19)  EPP(18)  Eradication(84)
Exfiltration(59)  FN(74)  FP(72)  GDPR(98)  GRC(100)  Hash(71)
IAM(20)  IDS(8)  IOA(36)  IOC(35)  IOT(81)  IPS(9)  IR(82)
ISO 27001(97)  Kerberos(26)  KPI(95)  Lateral Movement(53)
LDAP(25)  LotL(58)  Malware(43)  MDR(3)  MFA(22)  MitM(51)
MTBC(92)  MTTA(90)  MTTD(89)  MTTR(91)  NDR(62)  NetFlow(66)
NGFW(7)  NIST(96)  OSINT(32)  PAM(21)  Payload(48)  PCAP(65)
PCI DSS(99)  Persistence(54)  Playbook(6)  Privilege Escalation(52)
Proxy(15)  Ransomware(44)  RAT(45)  RCA(79)  Remediation(85)
Rootkit(46)  RTO/RPO(88)  Runbook(5)  Sandbox(77)  Sigma(69)
SIEM(60)  SLA(93)  SLO(94)  SOAR(64)  SOC(1)  SOP(4)  SSO(23)
STIX(33)  TAXII(34)  TDIR(75)  TIP(31)  TLS/SSL(16)  TP(73)
Triage(76)  TTP(38)  UEBA(63)  VLAN(12)  VPN(14)  WAF(10)
XDR(61)  YARA(70)  Zero Trust(27)
```
