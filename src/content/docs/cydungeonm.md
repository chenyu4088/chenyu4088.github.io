---
pluginName: CyDungeonM
slug: cydungeonm
version: 1.0.34
license: 免费
cores: Paper 1.21.11
summary: QueDP 附属副本菜单：副本列表、进本确认、队伍管理、排行榜和副本商店。
---

## 简介

CyDungeonM 是 QueDP 的附属插件，提供副本菜单、队伍、进本确认、排行榜和商店。QueDP 本身负责副本实例和战斗逻辑，CyDungeonM 负责玩家看到的界面和队伍流程。

> **硬依赖：** 必须先安装 QueDP，再安装 CyDungeonM。

**核心功能**

- 副本主菜单、副本列表、进本确认和冷却提示
- 队伍创建、邀请、申请、审批、转让、踢人、解散
- 最快通关排行榜、通关次数
- 副本商店，金币/点券购买
- 副本内传送指令锁
- 队员中途离开判负
- PlaceholderAPI 变量

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 硬依赖 | QueDP |
| 软依赖 | Vault、PlayerPoints、PlaceholderAPI、CraftEngine |
| 数据库 | SQLite |

## 安装

1. 先安装 QueDP，并确认能正常开本。
2. 把 `CyDungeonM-1.0.34.jar` 放进 `plugins/`。
3. 重启服务器，生成 `config.yml`、`messages.yml`、`shops.yml`。
4. 配置 `dungeons`、`party`、`leaderboard`、`shop`。
5. 玩家执行 `/cdm` 打开菜单。

## 玩家命令

| 命令 | 作用 |
|---|---|
| `/cdm` / `/cdm help` | 查看帮助 |
| `/cdm menu` | 打开副本主菜单 |
| `/cdm party` | 打开队伍界面 |
| `/cdm confirm` | 确认进入副本 |
| `/cdm enter <副本>` | 进入指定副本 |
| `/cdm leave` | 离开副本/队伍 |
| `/cdm top` | 查看通关排行榜 |
| `/cdm shop` | 打开副本商店 |

队伍子命令：

| 命令 | 作用 |
|---|---|
| `/cdm party create` | 创建队伍 |
| `/cdm party invite <玩家>` | 邀请玩家 |
| `/cdm party approve <玩家>` | 同意入队申请 |
| `/cdm party denyapply <玩家>` | 拒绝入队申请 |
| `/cdm party accept` | 接受邀请 |
| `/cdm party deny` | 拒绝邀请 |
| `/cdm party leave` | 离开队伍 |
| `/cdm party kick <玩家>` | 踢出队员 |
| `/cdm party disband` | 解散队伍 |
| `/cdm party transfer <玩家>` | 转让队长 |
| `/cdm party public` | 切换队伍公开状态 |

## 管理命令

需要 `cydungeonm.admin`。

| 命令 | 作用 |
|---|---|
| `/cdm wave` | 手动推进副本波次 |
| `/cdm operate` | 管理副本运行状态 |
| `/cdm kick <玩家>` | 踢出副本玩家 |
| `/cdm reload` | 重载配置 |
| `/cdm info` | 查看运行信息 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cydungeonm.use` | 所有人 | 打开菜单、排行榜、商店 |
| `cydungeonm.party` | 所有人 | 使用队伍功能 |
| `cydungeonm.admin` | OP | 管理命令 |

## 配置

主配置在 `plugins/CyDungeonM/config.yml`。

```yaml
party:
  max-size: 10
  invite-timeout: 60
  apply-timeout: 60

menu:
  refresh-ticks: 20

dungeons:
  fail-on-player-leave: true
  blacklist:
    - example

dungeon-command-lock:
  enabled: true
  mode: blacklist
  allow-admin: true
  whitelist:
    - "cdm leave"
  blacklist:
    - tp
    - tpa
    - home
    - warp
    - back
    - mv
```

| 配置段 | 说明 |
|---|---|
| `party.max-size` | 队伍上限，默认 10 |
| `party.invite-timeout` | 邀请超时 |
| `party.apply-timeout` | 入队申请超时 |
| `dungeons.fail-on-player-leave` | 队员中途离开是否判负 |
| `dungeon-command-lock` | 副本内指令锁，黑/白名单模式 |
| `leaderboard` | 排行榜每页条数和缓存 |
| `shop.close-after-buy` | 购买后是否关闭商店 |
| `logs` | 日志保留 |

### 商店

`shops.yml` 定义商店和商品，支持金币/点券；具体商品、价格和限购以服务器配置为准。

## 变量与 API

PlaceholderAPI 标识符：`cdm`

| 变量 | 含义 |
|---|---|
| `%cdm_dungeon_<副本ID>_best%` | 该副本个人最快通关秒数 |
| `%cdm_dungeon_<副本ID>_completions%` | 该副本个人通关次数 |
| `%cdm_total_best%` | 全部副本最快通关秒数 |
| `%cdm_total_completions%` | 总通关次数 |
| `%cdm_party_size%` | 队伍人数 |
| `%cdm_in_party%` | 是否在队伍，`true` / `false` |
| `%cdm_in_dungeon%` | 是否在副本，`true` / `false` |

队伍/副本变量带 `_team` 后缀时可查团队数据，例如 `%cdm_dungeon_dilao_best_team%`（具体以配置和版本为准）。当前版本没有公开 Java API。

## 常见问题

### 装上了但 `/cdm` 提示缺少 QueDP？

CyDungeonM 硬依赖 QueDP。先确认 QueDP 已安装并成功启用，再重启服务器。

### 队员进不去副本？

进本通常由队长发起，队员需要确认；检查队伍人数是否超过 `party.max-size`，以及副本冷却/权限。

### 挑战中有人掉线会怎样？

`fail-on-player-leave: true` 时，队员中途离开（含掉线）会判整队失败。

### 副本内不能传送？

`dungeon-command-lock` 默认拦截 `tp/tpa/home/warp/back/mv` 等指令；用 `/cdm leave` 离开副本。

### 排行榜/商店不显示？

检查对应权限、`shops.yml` 配置和 QueDP 副本 ID；排行榜需要有效通关记录。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.0.34`。

### 1.0.34（2026-10-22 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 1.0.30（2026-10-22）

- 副本菜单、队伍、排行榜、商店和指令锁持续修正。
