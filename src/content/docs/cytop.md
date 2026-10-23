---
pluginName: CyTop
slug: cytop
version: 1.2.2
license: 免费
cores: Paper 1.21.11
summary: 全息排行榜：金币、点券、在线时长、mcMMO、蟠桃血量和 PAPI 变量排行。
---

## 简介

CyTop 是一个全息排行榜插件。它按周期采集数据，生成排行榜快照，并在指定位置显示全息文字；也可以把排行输出成 PlaceholderAPI 变量给计分板等使用。

**支持的数据源**

- Vault 金币
- PlayerPoints 点券
- 原版在线时长
- mcMMO 总等级和各技能
- PeachHP 蟠桃血量
- PlaceholderAPI 自定义变量

**核心功能**

- `/ct create` 创建排行榜，`/ct del` 删除
- 每 60 秒刷新，支持只刷新在线玩家
- 日/周/月排行奖励
- OP/黑名单/数值过滤
- 千分位和在线时长单位
- 全息行格式、行数、位置可配置

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | Vault、PlayerPoints、mcMMO、PlaceholderAPI、PeachHP |
| 硬依赖 | 无 |

## 安装

1. 把 `CyTop-1.2.2.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`format.yml`、`holograms.yml`、`reward.yml`、`storage.yml`。
3. 配置数据源开关、显示格式和奖励。
4. 用 `/ct create <类型>` 在当前位置创建排行榜。
5. `/ct refresh` 手动刷新，或等自动刷新。

## 玩家/管理命令

主命令：`/ct`，全名 `/cytop`。

| 命令 | 作用 |
|---|---|
| `/ct help` | 帮助 |
| `/ct list` | 列出排行榜 |
| `/ct info <名称>` | 查看排行榜详情 |
| `/ct create <类型>` | 在当前位置创建排行榜 |
| `/ct del <名称> [序号]` | 删除排行榜或某一行（需 confirm） |
| `/ct confirm` / `/ct cancel` | 确认/取消删除 |
| `/ct move <名称> [序号]` | 移动排行榜 |
| `/ct tp <名称> <序号>` | 传送到排行榜 |
| `/ct toggle <名称>` | 切换显示 |
| `/ct on <名称>` / `/ct off <名称>` | 开启/关闭排行榜 |
| `/ct setpapi <名称> <变量>` | 设置 PAPI 数据源 |
| `/ct refresh [名称\|all]` | 刷新数据 |
| `/ct reload` | 重载配置 |
| `/ct reward <类型> [daily\|weekly\|monthly]` | 手动发放排行奖励 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cytop.admin` | OP | 全部权限 |
| `cytop.command.help` | OP | 帮助 |
| `cytop.command.list` | OP | 列表 |
| `cytop.command.info` | OP | 详情 |
| `cytop.command.create` | OP | 创建 |
| `cytop.command.remove` | OP | 删除 |
| `cytop.command.move` | OP | 移动 |
| `cytop.command.toggle` | OP | 显示开关 |
| `cytop.command.setpapi` | OP | 设置 PAPI 变量 |
| `cytop.command.refresh` | OP | 刷新 |
| `cytop.command.reload` | OP | 重载 |
| `cytop.command.reward` | OP | 发放奖励 |

## 配置

主配置在 `plugins/CyTop/config.yml`。

```yaml
language: zh_CN
refresh-interval: 60
sync-mode: online
init-on-startup: false

filter:
  op: false
  blacklist:
    - "CMI-Fake-Operator"
  values:
    - "-1"

sources:
  vault: true
  player-points: true
  playtime: true
  mcmmo: true
  peachhp: true
  papi: true

display:
  thousand-separator: true
  playtime-unit: auto

reward:
  enabled: true
  daily: true
  weekly: true
  monthly: true
```

| 字段 | 说明 |
|---|---|
| `refresh-interval` | 刷新间隔（秒），最小 10，0 关闭自动刷新 |
| `sync-mode` | `online` 只刷新在线；`offline` 同时刷新离线 |
| `filter.op` | OP 是否不参与排行 |
| `filter.blacklist` | 玩家黑名单 |
| `filter.values` | 取到这些值时跳过 |
| `sources.*` | 各数据源开关 |
| `display.playtime-unit` | `auto` / `hours` / `minutes` |
| `reward.daily/weekly/monthly` | 日/周/月奖励开关 |

### 格式与全息

- `format.yml`：标题、行格式、行数、颜色。
- `holograms.yml`：排行榜位置和显示开关。
- `reward.yml`：日/周/月奖励内容。
- `storage.yml`：存储配置。

## 变量与 API

PlaceholderAPI 标识符：`cytop`

格式：

```text
%cytop_<类型>_<名次>_name%
%cytop_<类型>_<名次>_total%
```

例如：

- `%cytop_vault_1_name%`：金币榜第 1 名玩家名
- `%cytop_vault_1_total%`：金币榜第 1 名数值
- `%cytop_playtime_10_total%`：在线时长榜第 10 名

类型名以 `format.yml` / 数据源配置为准；名次超出范围或类型无效返回空串。当前版本没有公开 Java API。

## 常见问题

### 排行榜不显示？

检查 `/ct list` 是否有该榜、`holograms.yml` 是否启用、当前位置是否被加载、`/ct refresh` 是否成功。

### 数据一直是 0？

检查对应依赖和数据源开关：金币需要 Vault + 经济插件，点券需要 PlayerPoints，mcMMO 需要 mcMMO，蟠桃血量需要 PeachHP。

### PAPI 排行榜没数据？

`/ct setpapi <名称> <变量>` 设置变量后执行 `/ct refresh`；变量取不到值会返回 `-1` 时，默认会被 `filter.values` 跳过。

### 奖励什么时候发？

`reward.daily/weekly/monthly` 分别按日/周/月结算；也可以 `/ct reward` 手动发放。

### 改了配置没生效？

`/ct reload`；全息位置和格式改动后建议刷新一次。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.2.2`。

### 1.2.2（2026-10-08 · 当前版本）

- 当前版本；项目此前没有独立更新日志，先记录当前版本。
- 支持多数据源、全息排行、PAPI 输出和日/周/月奖励。

### 1.0.0

- 初版全息排行榜。
