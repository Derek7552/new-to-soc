# SOC 高频术语 Top 100

> 学习目标：全面掌握 SOC 领域常用术语，能够无障碍阅读安全报告、与团队高效沟通。

---

## 一、SOC 运营与度量（#1–15）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 1 | **SOC** | Security Operations Center | 安全运营中心。7×24 监控、检测、分析和响应安全事件的集中化团队与设施 |
| 2 | **TDIR** | Threat Detection, Investigation and Response | 威胁检测、调查与响应。SOC 核心工作流的完整闭环 |
| 3 | **MTTD** | Mean Time to Detect | 平均检测时间。威胁进入环境到被发现的平均时长 |
| 4 | **MTTR** | Mean Time to Respond | 平均响应时间。确认事件到完成遏制/修复的平均时长 |
| 5 | **MTTA** | Mean Time to Acknowledge | 平均确认时间。告警触发到分析师开始处理的平均时长 |
| 6 | **MTBC** | Mean Time Between Compromises | 平均失陷间隔。两次安全事件之间的平均时长，衡量整体防御水位 |
| 7 | **SLA** | Service Level Agreement | 服务等级协议。与业务方约定的响应时效等量化指标 |
| 8 | **SLO** | Service Level Objective | 服务等级目标。SLA 内的具体可量化目标值 |
| 9 | **KPI** | Key Performance Indicator | 关键绩效指标。如告警关闭率、MTTD/MTTR、误报率等 |
| 10 | **FP** | False Positive | 误报。告警误判为威胁 |
| 11 | **TP** | True Positive | 真阳性。告警准确识别了真实威胁 |
| 12 | **FN** | False Negative | 漏报。真实威胁未被检测到，比误报危害更大 |
| 13 | **SOP** | Standard Operating Procedure | 标准操作规程。针对特定告警类型的标准化分析和处置步骤 |
| 14 | **Runbook** | — | 运维手册。面向特定场景的详细操作步骤 |
| 15 | **Playbook** | — | 响应剧本。事件响应的预定义流程，通常可在 SOAR 中自动执行 |

## 二、安全平台与工具（#16–30）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 16 | **SIEM** | Security Information and Event Management | 安全信息与事件管理。集中收集、关联和分析日志并生成告警 |
| 17 | **SOAR** | Security Orchestration, Automation and Response | 安全编排、自动化与响应。告警处置流程自动化平台 |
| 18 | **EDR** | Endpoint Detection and Response | 终端检测与响应。终端行为监控与响应 |
| 19 | **XDR** | Extended Detection and Response | 扩展检测与响应。跨终端/网络/云/邮件的统一检测响应 |
| 20 | **MDR** | Managed Detection and Response | 托管检测与响应。由第三方提供的 SOC 运营服务 |
| 21 | **NDR** | Network Detection and Response | 网络检测与响应。基于网络流量的威胁检测平台 |
| 22 | **IDS** | Intrusion Detection System | 入侵检测系统。检测恶意网络活动并告警 |
| 23 | **IPS** | Intrusion Prevention System | 入侵防御系统。检测并主动阻断恶意活动 |
| 24 | **NGFW** | Next-Generation Firewall | 下一代防火墙。集成应用识别、IPS、URL 过滤等能力的防火墙 |
| 25 | **WAF** | Web Application Firewall | Web 应用防火墙。保护 Web 应用免受 SQL 注入、XSS 等攻击 |
| 26 | **DLP** | Data Loss Prevention | 数据防泄漏。防止敏感数据通过邮件/USB/云等渠道外泄 |
| 27 | **CASB** | Cloud Access Security Broker | 云访问安全代理。监控和管控用户对云服务的使用 |
| 28 | **PAM** | Privileged Access Management | 特权访问管理。管理和审计特权账号的使用 |
| 29 | **IAM** | Identity and Access Management | 身份与访问管理。管理用户身份、认证和授权 |
| 30 | **UEBA** | User and Entity Behavior Analytics | 用户和实体行为分析。基于机器学习检测异常行为 |

## 三、威胁情报与攻击框架（#31–45）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 31 | **CTI** | Cyber Threat Intelligence | 网络威胁情报。关于威胁行为者和攻击手法的结构化信息 |
| 32 | **TIP** | Threat Intelligence Platform | 威胁情报平台。聚合、关联和分发威胁情报的工具 |
| 33 | **IOC** | Indicator of Compromise | 失陷指标。已发生入侵的技术证据（恶意 IP、Hash 等） |
| 34 | **IOA** | Indicator of Attack | 攻击指标。正在进行攻击的行为特征，比 IOC 更关注行为 |
| 35 | **TTP** | Tactics, Techniques and Procedures | 战术、技术和程序。攻击者行为模式的三层描述 |
| 36 | **ATT&CK** | Adversarial Tactics, Techniques and Common Knowledge | MITRE 攻击知识库框架。按战术和技术编目攻击行为 |
| 37 | **APT** | Advanced Persistent Threat | 高级持续性威胁。有组织的长期定向攻击团体 |
| 38 | **C2 / C&C** | Command and Control | 命令与控制。攻击者远程操控被入侵系统的通信通道 |
| 39 | **DGA** | Domain Generation Algorithm | 域名生成算法。恶意软件自动生成大量 C2 域名以规避封锁 |
| 40 | **STIX** | Structured Threat Information Expression | 结构化威胁信息表达。威胁情报的标准化数据格式 |
| 41 | **TAXII** | Trusted Automated Exchange of Intelligence Information | 可信自动化情报交换。威胁情报的标准传输协议 |
| 42 | **OSINT** | Open Source Intelligence | 开源情报。从公开信息源收集的情报 |
| 43 | **CVE** | Common Vulnerabilities and Exposures | 通用漏洞披露。公开漏洞的唯一编号体系 |
| 44 | **CVSS** | Common Vulnerability Scoring System | 通用漏洞评分系统。0-10 分衡量漏洞严重性 |
| 45 | **0-day** | Zero-Day | 零日漏洞。尚无补丁的漏洞，被利用时防御方毫无准备 |

## 四、事件响应与取证（#46–60）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 46 | **IR** | Incident Response | 事件响应。对安全事件进行遏制、消除、恢复和复盘的流程 |
| 47 | **CSIRT** | Computer Security Incident Response Team | 计算机安全事件响应团队 |
| 48 | **DFIR** | Digital Forensics and Incident Response | 数字取证与事件响应。事件调查中的证据收集与分析 |
| 49 | **Triage** | — | 分诊。对告警做快速判断，确定优先级和真假阳性 |
| 50 | **Containment** | — | 遏制。限制安全事件的影响范围（如隔离主机、封锁 IP） |
| 51 | **Eradication** | — | 消除。清除环境中的威胁因素（恶意软件、后门、恶意账号） |
| 52 | **Remediation** | — | 修复。修补导致事件的根本原因（补丁、配置加固） |
| 53 | **RCA** | Root Cause Analysis | 根因分析。找出安全事件的根本原因而非表面症状 |
| 54 | **CoC** | Chain of Custody | 证据保管链。记录数字证据的完整流转过程，确保法律效力 |
| 55 | **IOT** | Indicator of Testing | 测试指标。区分真实攻击与渗透测试/红队活动的标记 |
| 56 | **Lateral Movement** | — | 横向移动。攻击者从已攻陷主机向网络中其他系统扩散 |
| 57 | **Persistence** | — | 持久化。攻击者在系统中建立长期驻留机制 |
| 58 | **Exfiltration** | — | 数据渗出。攻击者将窃取的数据传出目标网络 |
| 59 | **Beaconing** | — | 信标通信。被控主机定期向 C2 服务器发送心跳请求 |
| 60 | **Living off the Land (LotL)** | — | 就地取材攻击。利用系统自带工具（PowerShell、WMI）执行攻击 |

## 五、网络与流量分析（#61–72）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 61 | **PCAP** | Packet Capture | 网络数据包捕获。完整记录网络通信内容 |
| 62 | **NetFlow** | — | 网络流量元数据。记录流量的源/目的/端口/字节数，不含载荷 |
| 63 | **DPI** | Deep Packet Inspection | 深度包检测。检查数据包的应用层内容 |
| 64 | **DNS** | Domain Name System | 域名系统。域名到 IP 的解析服务，也是 C2 通信和情报分析的重要数据源 |
| 65 | **DoS / DDoS** | Denial of Service / Distributed DoS | 拒绝服务/分布式拒绝服务攻击。通过大量流量使目标不可用 |
| 66 | **MitM** | Man-in-the-Middle | 中间人攻击。攻击者截获并可能篡改通信双方的数据 |
| 67 | **TLS/SSL** | Transport Layer Security / Secure Sockets Layer | 传输层安全协议。加密网络通信，SOC 需关注证书异常 |
| 68 | **VPN** | Virtual Private Network | 虚拟专用网络。加密远程访问通道 |
| 69 | **Proxy** | — | 代理服务器。转发和过滤网络请求，是重要的日志来源 |
| 70 | **DMZ** | Demilitarized Zone | 隔离区/非军事区。放置对外服务的网络区域，隔离内外网 |
| 71 | **VLAN** | Virtual Local Area Network | 虚拟局域网。在逻辑上隔离网络流量 |
| 72 | **ACL** | Access Control List | 访问控制列表。定义允许或拒绝的网络访问规则 |

## 六、终端与恶意软件（#73–84）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 73 | **AV** | Antivirus | 杀毒软件。基于签名匹配的恶意软件检测 |
| 74 | **EPP** | Endpoint Protection Platform | 终端保护平台。集成 AV、防火墙、设备控制等的端点防护 |
| 75 | **Malware** | Malicious Software | 恶意软件。包括病毒、木马、蠕虫、勒索软件等 |
| 76 | **Ransomware** | — | 勒索软件。加密文件并索要赎金 |
| 77 | **RAT** | Remote Access Trojan | 远程访问木马。允许攻击者远程控制受害者系统 |
| 78 | **Rootkit** | — | 内核级隐藏工具。深度潜伏在操作系统中，极难检测 |
| 79 | **Dropper** | — | 投放器。负责释放和安装实际恶意载荷的初始恶意程序 |
| 80 | **Payload** | — | 载荷。攻击中实际执行恶意功能的代码 |
| 81 | **Sandbox** | — | 沙箱。隔离环境中执行可疑文件，观察其行为 |
| 82 | **Hash** | — | 哈希值。文件的唯一指纹（MD5/SHA1/SHA256），用于恶意文件识别 |
| 83 | **YARA** | — | 恶意软件分类规则引擎。通过模式匹配识别恶意文件 |
| 84 | **Sigma** | — | 通用日志检测规则格式。跨 SIEM 平台的告警规则标准 |

## 七、身份与访问安全（#85–92）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 85 | **MFA** | Multi-Factor Authentication | 多因素认证。结合密码+手机/硬件令牌等多种验证方式 |
| 86 | **SSO** | Single Sign-On | 单点登录。一次认证即可访问多个系统 |
| 87 | **AD** | Active Directory | 活动目录。Windows 域环境的核心身份和权限管理服务 |
| 88 | **LDAP** | Lightweight Directory Access Protocol | 轻量目录访问协议。查询和管理目录服务的协议 |
| 89 | **Kerberos** | — | Windows 域认证协议。SOC 需关注票据攻击（Golden/Silver Ticket） |
| 90 | **Credential Stuffing** | — | 撞库攻击。用泄露的账号密码尝试登录其他服务 |
| 91 | **Privilege Escalation** | — | 权限提升。攻击者从低权限获取高权限的过程 |
| 92 | **Zero Trust** | — | 零信任。"永不信任，始终验证"的安全架构理念 |

## 八、合规、框架与风险（#93–100）

| # | 术语 | 全称 | 释义 |
|---|------|------|------|
| 93 | **NIST** | National Institute of Standards and Technology | 美国国家标准与技术研究院。发布 CSF（网络安全框架）等权威标准 |
| 94 | **ISO 27001** | — | 信息安全管理体系国际标准。组织级安全管理认证 |
| 95 | **GDPR** | General Data Protection Regulation | 通用数据保护条例。欧盟数据隐私法规，违规通报时限 72 小时 |
| 96 | **PCI DSS** | Payment Card Industry Data Security Standard | 支付卡行业数据安全标准。涉及支付数据的安全合规要求 |
| 97 | **GRC** | Governance, Risk and Compliance | 治理、风险与合规。组织级安全管理的三大支柱 |
| 98 | **BCP** | Business Continuity Plan | 业务连续性计划。确保重大事件发生时业务能持续运行 |
| 99 | **DR** | Disaster Recovery | 灾难恢复。系统和数据的恢复计划与能力 |
| 100 | **RTO / RPO** | Recovery Time Objective / Recovery Point Objective | 恢复时间目标/恢复点目标。RTO 是能忍受的最长停机时间，RPO 是能接受的最大数据丢失量 |

---

## 速查索引

按字母排序，括号内为上表编号，便于快速定位。

```
0-day(45)  ACL(72)  AD(87)  APT(37)  ATT&CK(36)  AV(73)
BCP(98)  Beaconing(59)  C2(38)  CASB(27)  CoC(54)  Containment(50)
CSIRT(47)  CTI(31)  CVE(43)  CVSS(44)  DFIR(48)  DGA(39)
DLP(26)  DMZ(70)  DNS(64)  DoS/DDoS(65)  DPI(63)  DR(99)
Dropper(79)  EDR(18)  EPP(74)  Eradication(51)  Exfiltration(58)
FN(12)  FP(10)  GDPR(95)  GRC(97)  Hash(82)  IAM(29)
IDS(22)  IOA(34)  IOC(33)  IPS(23)  IR(46)  ISO 27001(94)
Kerberos(89)  KPI(9)  Lateral Movement(56)  LDAP(88)  LotL(60)
Malware(75)  MDR(20)  MFA(85)  MitM(66)  MTBC(6)  MTTA(5)
MTTD(3)  MTTR(4)  NDR(21)  NetFlow(62)  NGFW(24)  NIST(93)
OSINT(42)  PAM(28)  Payload(80)  PCAP(61)  PCI DSS(96)
Persistence(57)  Playbook(15)  Privilege Escalation(91)  Proxy(69)
Ransomware(76)  RAT(77)  RCA(53)  Remediation(52)  Rootkit(78)
RPO/RTO(100)  Runbook(14)  Sandbox(81)  Sigma(84)  SIEM(16)
SLA(7)  SLO(8)  SOAR(17)  SOC(1)  SOP(13)  SSO(86)
STIX(40)  TAXII(41)  TDIR(2)  TIP(32)  TLS/SSL(67)  TP(11)
Triage(49)  TTP(35)  UEBA(30)  VLAN(71)  VPN(68)  WAF(25)
XDR(19)  YARA(83)  Zero Trust(92)
```
