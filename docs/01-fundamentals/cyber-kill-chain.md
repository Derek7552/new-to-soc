# 网络攻击链

> 学习目标：理解攻击者的行为模式，学会用攻击链框架分析安全事件。

## Lockheed Martin 网络攻击链（Cyber Kill Chain）

攻击链（Kill Chain）描述了一次网络攻击从计划到达成目标的完整过程。理解攻击链能帮助 SOC 分析师判断攻击处于哪个阶段，从而采取最有效的应对措施。

### 7 个阶段

| 阶段 | 说明 | SOC 可见信号 |
|------|------|-------------|
| 1. 侦察（Reconnaissance） | 攻击者收集目标信息 | 端口扫描、OSINT 活动 |
| 2. 武器化（Weaponization） | 制作攻击载荷 | 通常不可见（发生在攻击者侧） |
| 3. 投递（Delivery） | 将载荷送达目标 | 钓鱼邮件、恶意链接、U 盘 |
| 4. 利用（Exploitation） | 触发漏洞执行代码 | 漏洞利用告警、异常进程 |
| 5. 安装（Installation） | 植入持久化后门 | 可疑文件创建、注册表修改 |
| 6. 命令与控制（C2） | 建立远程控制通道 | 异常外联、DNS 隧道、Beaconing |
| 7. 目标达成（Actions on Objectives） | 执行最终目标 | 数据外传、横向移动、破坏 |

### 防御者视角

攻击链的价值在于：**越早打断链条，损失越小。**

- 在**侦察/投递**阶段拦截 → 攻击未进入环境
- 在**利用/安装**阶段检测 → 限制影响范围
- 在**C2/目标达成**阶段发现 → 需要全面应急响应

## MITRE ATT&CK 框架

ATT&CK（Adversarial Tactics, Techniques, and Common Knowledge）是一个更细粒度的攻击知识库，按照战术（Tactics）和技术（Techniques）组织。

### 14 个战术类别

1. 侦察（Reconnaissance）
2. 资源开发（Resource Development）
3. 初始访问（Initial Access）
4. 执行（Execution）
5. 持久化（Persistence）
6. 权限提升（Privilege Escalation）
7. 防御规避（Defense Evasion）
8. 凭证访问（Credential Access）
9. 发现（Discovery）
10. 横向移动（Lateral Movement）
11. 数据收集（Collection）
12. 命令与控制（Command and Control）
13. 数据渗出（Exfiltration）
14. 影响（Impact）

### 如何使用 ATT&CK

- **事件分析**：将观察到的攻击行为映射到 ATT&CK 技术编号（如 T1566 - Phishing）
- **检测覆盖评估**：检查现有检测规则覆盖了哪些 ATT&CK 技术
- **威胁情报**：了解特定 APT 组织常用的 TTP（Tactics, Techniques, and Procedures）

## 实际应用：用攻击链分析一次钓鱼攻击

```
场景：员工收到一封伪装成 HR 的邮件，包含恶意 Excel 附件

1. 侦察 → 攻击者通过 LinkedIn 获取了员工和 HR 联系人信息
2. 武器化 → 制作含恶意宏的 Excel 文件
3. 投递 → 发送钓鱼邮件到员工邮箱
4. 利用 → 员工打开附件并启用宏，执行 PowerShell 命令
5. 安装 → 下载并安装 Cobalt Strike Beacon
6. C2 → Beacon 通过 HTTPS 与 C2 服务器通信
7. 目标达成 → 攻击者窃取了客户数据库
```

SOC 分析师在每个阶段都有机会检测和阻断这次攻击。
