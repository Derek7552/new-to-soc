# SIEM 入门

> 学习目标：理解 SIEM 的作用和基本使用方法，能够进行简单的日志查询和告警分析。

## 什么是 SIEM

SIEM（Security Information and Event Management，安全信息与事件管理）是 SOC 的核心平台，负责集中收集、存储、关联和分析安全日志和事件。

## SIEM 的核心功能

- **日志收集** - 从各种数据源接入日志（防火墙、终端、服务器、应用等）
- **日志解析与标准化** - 将不同格式的日志转换为统一格式
- **关联分析** - 将多个独立事件关联起来发现攻击模式
- **告警生成** - 基于检测规则触发安全告警
- **仪表盘与报表** - 可视化安全态势
- **事件调查** - 提供日志搜索和取证分析能力

## 常见 SIEM 产品

| 产品 | 特点 |
|------|------|
| Splunk | 功能强大，SPL 查询语言，市场占有率高 |
| Microsoft Sentinel | 云原生，与 Azure 生态集成好 |
| Elastic Security | 基于 ELK Stack，开源可选 |
| QRadar | IBM 产品，强关联分析引擎 |
| Chronicle (Google) | 云原生，大数据分析能力 |

## 日志查询基础

### Splunk SPL 示例

```spl
# 搜索过去 24 小时内的登录失败事件
index=auth action=failure earliest=-24h
| stats count by src_ip, user
| where count > 10
| sort -count
```

### KQL（Kusto Query Language）示例

```kql
// Microsoft Sentinel：搜索暴力破解
SigninLogs
| where TimeGenerated > ago(24h)
| where ResultType != 0
| summarize FailedAttempts = count() by IPAddress, UserPrincipalName
| where FailedAttempts > 10
| order by FailedAttempts desc
```

## 告警分析流程

收到 SIEM 告警后，SOC 分析师的标准动作：

1. **看告警详情** - 告警名称、严重级别、触发规则
2. **看原始日志** - 触发告警的原始事件数据
3. **看上下文** - 同一源/目标的其他相关活动
4. **查情报** - IP/域名/Hash 在威胁情报中的信息
5. **做判断** - 真阳性 → 升级为事件 / 误报 → 关闭并记录原因
6. **记文档** - 记录分析过程和结论

## 新人常见误区

- **不要只看告警标题就做判断** — 一定要看原始日志
- **不要忽略低严重级别的告警** — 多个低级告警可能是大事件的前兆
- **不要关掉告警不写原因** — 未来的分析师需要知道为什么关闭
- **不要害怕升级** — 宁可升级一个误报，也不要漏掉一个真正的攻击
