# 日志分析基础

> 学习目标：掌握常见日志类型的读取方法，能从日志中提取有价值的安全信息。

## 为什么日志分析很重要

日志是 SOC 分析师的"眼睛"。几乎所有安全分析都建立在日志之上 —— 你能发现什么，取决于你能读懂什么。

## 常见日志类型

### Windows 事件日志

| 事件 ID | 含义 | 安全价值 |
|---------|------|----------|
| 4624 | 登录成功 | 追踪用户活动 |
| 4625 | 登录失败 | 检测暴力破解 |
| 4648 | 使用显式凭证登录 | 检测凭证滥用 |
| 4672 | 特权登录 | 监控管理员活动 |
| 4688 | 新进程创建 | 检测恶意进程 |
| 4720 | 用户账号被创建 | 检测未授权账号 |
| 4732 | 用户被添加到安全组 | 检测权限提升 |
| 1102 | 审计日志被清除 | 检测反取证行为 |

### Linux 日志

```bash
# 认证日志 - 登录、sudo、SSH
/var/log/auth.log      # Debian/Ubuntu
/var/log/secure         # RHEL/CentOS

# 系统日志
/var/log/syslog
/var/log/messages

# 常用分析命令
# 查看失败的 SSH 登录
grep "Failed password" /var/log/auth.log | tail -20

# 统计暴力破解来源 IP
grep "Failed password" /var/log/auth.log \
  | awk '{print $(NF-3)}' \
  | sort | uniq -c | sort -rn | head
```

### 网络日志

- **防火墙日志**：允许/拒绝的连接记录
- **DNS 日志**：域名解析请求，可检测 C2 通信和 DGA 域名
- **代理日志**：HTTP/HTTPS 请求记录，含 URL、User-Agent 等
- **NetFlow**：网络流量元数据（源/目的 IP、端口、字节数）

## 分析技巧

### 建立基线

正常的行为是什么样的？只有知道"正常"，才能发现"异常"。

- 该用户通常在什么时间登录？
- 该服务器通常与哪些 IP 通信？
- 该应用通常产生多少流量？

### 关联分析

单条日志的价值有限，将多个数据源的日志关联起来才能看到完整图景。

```
场景：检测一次可能的入侵

防火墙日志：外部 IP 连接内部主机 445 端口 → 可疑
+
Windows 日志：该主机出现 4625 登录失败 × 50 次 → 暴力破解
+
Windows 日志：随后出现 4624 登录成功 → 攻击成功
+
进程日志：登录后运行了 PowerShell 编码命令 → 后渗透
+
DNS 日志：该主机开始解析异常域名 → C2 通信

结论：确认入侵，需要立即响应
```

### 时间线分析

按时间顺序排列事件，构建攻击时间线，是事件调查的核心方法。

## 实操练习建议

- 在 [Blue Team Labs Online](https://blueteamlabs.online) 练习日志分析
- 下载 [EVTX-ATTACK-SAMPLES](https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES) 学习真实攻击日志
- 搭建 ELK Stack 练习日志检索
