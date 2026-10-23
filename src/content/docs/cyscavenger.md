---
pluginName: CyScavenger
slug: cyscavenger
version: 2.0.0
license: 免费
cores: Paper 1.21.11
summary: 村民违规附魔清理：检测村民交易中的非法附魔，删除交易或移除村民。
---

## 简介

CyScavenger 用于清理村民身上的违规附魔交易，主要是修复旧版 ExcellentEnchants 留在村民交易里的附魔。

**处理方式**

- `REPLACE`：只删除违规交易，保留村民和其他正常交易（推荐）
- `KILL`：取消交互并移除整个村民，无掉落、无经验

**触发方式**

- 玩家右键村民时检测
- 只检测主手交互，忽略被取消的事件
- 没有违规附魔时不处理、不提示

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | ExcellentEnchants（清理对象，非硬依赖） |
| 硬依赖 | 无 |

## 安装

1. 把 `CyScavenger-2.0.0.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml` 和 `logs/`。
3. 确认 `enabled: true`。
4. 选择 `mode: REPLACE` 或 `mode: KILL`。
5. 按需维护 `illegal-enchants` 黑名单。

## 命令

| 命令 | 作用 |
|---|---|
| `/cyscavenger help` / `/csc help` | 查看帮助 |
| `/cyscavenger info` | 查看插件详情 |
| `/cyscavenger reload` | 重载配置 |

旧命令 `/scavenger`、`/sc` 在 2.0.0 已移除。

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cyscavenger.info` | OP | 查看详情 |
| `cyscavenger.reload` | OP | 重载配置 |

## 配置

主配置在 `plugins/CyScavenger/config.yml`。

```yaml
prefix: "&8[ &bCyScavenger &8] &r "
message: "&7当前村民产出违规附魔,已被系统清除"
enabled: true
mode: REPLACE
check-ingredients: false

log:
  enabled: true
  retention-days: 7
  clean-time: "00:00"

illegal-enchants:
  - auto_reel
  - bane_of_netherspawn
  - blast_mining
  - curse_of_breaking
  - veinminer
```

| 字段 | 说明 |
|---|---|
| `mode` | `REPLACE` 删除违规交易；`KILL` 移除村民 |
| `check-ingredients` | 是否连收购物品一起检查 |
| `illegal-enchants` | 违规附魔 ID 黑名单 |
| `log.enabled` | 是否写日志文件 |
| `log.retention-days` | 日志保留天数 |
| `log.clean-time` | 每日清理时刻 |

黑名单匹配规则：

- 带命名空间（`namespace:id`）：比较完整键。
- 不带命名空间：只比较附魔名，兼容 EE 开关命名空间的情况。

## 日志

日志在 `plugins/CyScavenger/logs/年-月-日.log`，每条包含：

- 时间
- 玩家
- 处理模式
- 村民职业
- 村民坐标（世界 + XYZ）
- 被清理的附魔键

控制台输出始终保留，不受 `log.enabled` 影响。

## 变量与 API

CyScavenger 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 右键村民没反应？

确认 `enabled: true`、玩家主手交互、村民交易里确实有 `illegal-enchants` 中的附魔。没有违规时不会提示。

### 为什么村民被整个删了？

`mode: KILL` 会移除村民；只想删违规交易请改成 `REPLACE`。

### 附魔 ID 怎么写？

带 `:` 比全键，不带 `:` 只比附魔名。建议先用 `/cyscavenger info` 或日志确认实际键名。

### 旧版 `/scavenger` 还能用吗？

2.0.0 已移除，使用 `/cyscavenger` 或 `/csc`。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `2.0.0`。

### 2.0.0（2026-10-08 · 当前版本）

- 插件更名 Scavenger → CyScavenger，数据目录迁移到 `plugins/CyScavenger/`。
- 主命令改为 `/cyscavenger`，别名 `/csc`；旧 `/scavenger`、`/sc` 移除。
- 新增 `help` / `info` / `reload` 三个命令和权限过滤。
- 配置补齐改为文本级原位插入，不覆盖已有内容。
- 日志按天分文件，支持保留天数和定时清理。

### 1.0.0（2026-10-01 · 首发）

- 右键村民检测违规附魔交易。
- `REPLACE` / `KILL` 两种处理模式。
- 附魔黑名单支持命名空间匹配。
