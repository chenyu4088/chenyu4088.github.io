---
pluginName: CyPass
slug: cypass
version: 1.1.12
license: 付费
cores: Paper 1.21.11
summary: 赛季通行证系统：每日/每周/赛季任务、等级经验、免费与付费奖励轨、通行证商店和赛季管理。
---

## 简介

CyPass 是一个赛季通行证（Battle Pass）插件：玩家完成任务获取通行证经验，升级后领取免费或付费档奖励；管理员可以开启赛季、发放奖励、调整玩家进度。

**核心功能**

- 每日、每周、赛季、副本四类任务
- 全局等级经验，免费轨/付费轨双轨奖励
- 金币、点券、原版物品、CraftEngine、CyDriverCore、指令、权限奖励
- 通行证商店
- 以 `current_season.yml` 为唯一依据的赛季管理

> **玩家入口：** `/pass` 或 `/cypass`。如果 `/pass` 被其他插件占用，使用 `/cypass`。

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11（Paper 系服务端） |
| Java | Java 21 |
| 数据库 | SQLite，插件自带 |
| 数据目录 | `plugins/CyPass/data/` |
| 软依赖 | PlaceholderAPI、Vault、PlayerPoints、LuckPerms、MythicMobs（可选） |
| 硬依赖 | 无 |

插件通过 Paper 的 `libraries` 加载 SQLite 驱动，不需要手动放 JDBC 驱动。

## 安装

1. 把 `CyPass-1.1.12.jar` 放进服务端 `plugins/`。
2. 重启服务器，确认控制台出现 CyPass 启用信息。
3. 首次启动生成 `config.yml`、`messages.yml`、`current_season.yml`、`gui/`、`quests/`、`rewards/`、`passes/`、`data/`。
4. 修改配置后执行 `/cypass reload`。
5. 用 `/cypass admin season start` 开启赛季，或手动填写 `current_season.yml`。

修改 `current_season.yml` 会立刻生效；修改 GUI、任务、奖励、通行证后需要重载。

## 玩家命令

需要 `cypass.use` 权限，默认所有玩家都有。

| 命令 | 作用 |
|---|---|
| `/pass` | 打开通行证主页面 |
| `/cypass` | 打开通行证主页面（无参数时） |
| `/cypass help` | 查看帮助 |
| `/cypass menu` / `gui` | 打开主页面 |
| `/cypass quests` / `tasks` | 打开任务页面 |
| `/cypass rewards` / `reward` | 打开奖励页面 |
| `/cypass shop` / `store` | 打开通行证商店 |
| `/cypass info` / `progress` | 查看自己的等级、经验和赛季进度 |
| `/cypass claim` / `claimall` | 一键领取所有可领奖励 |
| `/cypass season` | 查看当前赛季信息 |

## 管理命令

需要 `cypass.admin` 或对应子权限。

| 命令 | 作用 |
|---|---|
| `/cypass admin` | 打开管理面板 |
| `/cypass admin season info` | 查看当前赛季 |
| `/cypass admin season start` | 开启新赛季 |
| `/cypass admin season end` | 结束赛季并清空玩家数据 |
| `/cypass admin season settime` | 修改赛季结束时间 |
| `/cypass admin player <玩家>` | 打开玩家管理面板 |
| `/cypass admin exp <玩家> <数量>` | 给予通行证经验 |
| `/cypass admin level <玩家> <数量>` | 增加等级 |
| `/cypass admin setlevel <玩家> <等级>` | 设置等级 |
| `/cypass admin tier <玩家> <通行证> <档位>` | 发放档位 |
| `/cypass admin progress <玩家> <任务> <数量>` | 推进任务进度 |
| `/cypass admin activate <玩家> <通行证>` | 切换激活的通行证 |
| `/cypass admin reset <玩家>` | 重置玩家数据 |
| `/cypass admin reward list` | 列出奖励 key |
| `/cypass admin reward give <玩家> <奖励>` | 手动发放奖励 |
| `/cypass reload [rewards\|quests\|passes\|gui\|all]` | 重载配置 |
| `/cypass admin debug` | 切换调试模式 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cypass.use` | 所有人 | 使用玩家命令和界面 |
| `cypass.admin` | OP | 管理权限父节点 |
| `cypass.admin.season` | OP | 赛季管理 |
| `cypass.admin.player` | OP | 玩家数据管理 |
| `cypass.admin.reward` | OP | 奖励发放 |
| `cypass.admin.reload` | OP | 重载配置 |
| `cypass.exp.2x` | 关闭 | 任务经验 ×2 |
| `cypass.exp.3x` | 关闭 | 任务经验 ×3，优先于 ×2 |

## 主配置

主配置在 `plugins/CyPass/config.yml`，改完执行 `/cypass reload`。

| 配置段 | 作用 |
|---|---|
| `level` | 起始等级、等级上限、基础经验、经验倍率、升级标题 |
| `quests` | 每日/每周重置、随机任务池、进度结算 |
| `exp-multipliers` | 按权限给经验倍率 |
| `progress-bar` | 经验进度条 |
| `input` | 聊天栏输入超时和取消词 |
| `logs` | 日志级别、保留天数、清理时间 |
| `database` | SQLite 路径和过期数据清理 |
| `performance` | 落盘间隔、商店显示上限 |
| `season` | 赛季默认名称、时间、提醒 |

```yaml
level:
  start: 0
  max: 50
  base-experience: 100
  experience-multiplier: 1.0

quests:
  daily-reset-hour: 0
  weekly-reset-day: 1
  random-pool:
    enabled: true
    daily-count: 3
    weekly-count: 3

exp-multipliers:
  - permission: cypass.exp.3x
    multiplier: 3.0
  - permission: cypass.exp.2x
    multiplier: 2.0
```

可重载范围：`/cypass reload rewards|quests|passes|gui|all`；不写参数默认全部重载。

## 通行证配置

每个通行证一个文件：`plugins/CyPass/passes/<id>.yml`。一个通行证最多 4 个档位；等级和经验是全局的，不写在通行证文件里。

| 字段 | 说明 |
|---|---|
| `id` | 唯一 ID，命令和 API 都用它 |
| `display-name` / `description` | 名称和介绍 |
| `default` | 没有激活其他通行证时默认使用 |
| `icon.material` | 列表图标 |
| `tiers` | 档位，最多 4 个 |
| `tiers.*.row` | 奖励轨道行，1–4 |
| `tiers.*.free` | 免费档，所有玩家默认拥有 |
| `tiers.*.price` / `pay` | 付费档价格，`pay` 可选 `points` / `money` |
| `reward-templates` | 奖励模板 |
| `level-reward-rules` | 等级规则，从上到下命中后全部累加 |
| `levels` | 单级覆盖，写过的等级替换计算结果 |

```yaml
config-version: 1
id: default
display-name: "&6&l默认通行证"
description: "&7完成任务升级，领取丰厚奖励！"
default: true
icon:
  material: APPLE
tiers:
  free:
    row: 1
    display-name: "&f免费版"
    description: "&7所有玩家都能领的基础奖励"
    free: true
    icon:
      material: APPLE
  golden:
    row: 3
    display-name: "&6金苹果版"
    description: "&e解锁更多奖励"
    free: false
    price: 100
    pay: points
    icon:
      material: GOLDEN_APPLE
reward-templates:
  every_level:
    rewards:
      free: [item_apple]
      golden: [item_golden_apple]
  milestone:
    rewards:
      free: [money_500]
      golden: [money_500, item_diamond_5]
level-reward-rules:
  - range: {from: 1, to: 50, step: 1}
    template: every_level
  - range: {from: 10, to: 50, step: 10}
    template: milestone
levels: {}
```

**规则**

- `range` 的 `from`、`to`、`step` 控制命中等级。
- 多条规则同时命中时**累加**，不是覆盖。
- `levels` 的「等级 + 档位」组合会完全替换上面计算出的结果。
- 付费档只在写了对应奖励时才有内容，不会自动继承免费档。

## 任务配置

任务在 `plugins/CyPass/quests/`，按 `daily/`、`weekly/`、`season/`、`dungeon/` 分目录；一个文件是一组任务。

| 字段 | 说明 |
|---|---|
| `display-name` / `description` | 任务名称/描述 |
| `icon.material` | 任务图标 |
| `type` | 任务类型 |
| `target` | 目标方块/实体/物品列表 |
| `amount` | 数量 |
| `experience` | 完成任务获得的经验 |
| `weight` | 随机任务池权重 |
| `period` | 可选：覆盖周期 |
| `worlds` | 可选：限定世界 |
| `start` / `end` | 可选：开放时间 |

```yaml
config-version: 1
quests:
  mine_stone:
    display-name: "&6挖矿达人"
    description: "&7开采 500 个石头"
    icon:
      material: IRON_PICKAXE
    type: break_block
    target: [STONE, COBBLESTONE, DEEPSLATE, COBBLED_DEEPSLATE]
    amount: 500
    experience: 150
    weight: 10
```

| 分类 | type |
|---|---|
| 挖掘 | `break_block`、`break_any` |
| 合成 | `craft_item`、`craft_any` |
| 击杀 | `kill_any`、`kill_entity`、`kill_player`、`kill_mm`、`kill_mm_boss` |
| 在线/移动 | `playtime_daily`、`playtime_total`、`move_distance` |
| 原版行为 | `fish`、`enchant`、`consume_item`、`deal_damage`、`take_damage`、`death`、`trade_villager`、`breed_animal`、`sleep`、`jump`、`drop_item`、`pickup_item`、`raid_win`、`exp_level` |
| 自己发 | `sign_in`、`quest_complete`、`external` |

`playtime_*` 填分钟，`move_distance` 填格，`damage` 填点；随机池由 `config.yml` 的 `quests.random-pool` 控制。

## 奖励配置

奖励在 `plugins/CyPass/rewards/`，共 7 个文件；文件只是分类，格式一样。奖励 key 全局唯一。

```yaml
config-version: 1
money_500:
  type: MONEY
  display-name: "&e500 金币"
  description: "&7Vault 游戏币"
  icon: GOLD_INGOT
  amount: 500
give_diamond:
  type: ITEM
  display-name: "&b奖励钻石"
  material: DIAMOND
  amount: 5
```

| type | 需要配置 |
|---|---|
| `COMMAND` | `value`，支持 `%player%` |
| `ITEM` | `material` + `amount` |
| `CE_ITEM` | `ce-item` + `amount` |
| `CDC_ITEM` | `cdc-item` + `amount` |
| `MONEY` / `POINTS` / `EXP` | `amount` |
| `RANDOM` | `pool` 奖励 key 列表 |
| `CHOICE` | `options` 奖励 key 列表 |
| `PERMISSION` | `permission`，可选时长 |

每个奖励还可以配置 `display-name`、`description`、`icon`。

## GUI 自定义

界面文件在 `plugins/CyPass/gui/`，共 13 个；可以改标题、材质、名称、lore、光效和按钮位置，功能槽位由代码控制。

| 文件 | 界面 |
|---|---|
| `main-menu.yml` | 主页面 |
| `quests.yml` / `rewards.yml` / `shop.yml` | 任务 / 奖励 / 商店 |
| `shop-buy.yml` / `choice.yml` / `confirm.yml` | 购买确认 / 多选一 / 二次确认 |
| `admin.yml` / `player-pick.yml` / `player-action.yml` | 管理 / 选玩家 / 玩家操作 |
| `tier-editor.yml` / `season-date.yml` / `season-confirm.yml` | 档位 / 日期 / 开赛 |

```yaml
schema-version: 14
title: "&b&l通行证"
border:
  enabled: true
  material: GRAY_STAINED_GLASS_PANE
empty-slot:
  material: AIR
buttons:
  player-info:
    material: PLAYER_HEAD
    name: "&b%player_name% 的通行证"
    lore:
      - "&7当前等级: &e%level%"
      - "&7经验进度&8[%bar%&8] &f%exp%/%need% &e%percent%"
```

改完执行 `/cypass reload gui`；`ce-item` 未安装 CraftEngine 时会回退到原版材质。

## 占位符

这些占位符用于 CyPass 自己的 GUI 和消息配置；当前版本没有注册独立的 PlaceholderAPI 变量。

| 占位符 | 含义 |
|---|---|
| `%player_name%` / `%player%` | 玩家名 |
| `%level%` / `%max_level%` | 当前等级 / 等级上限 |
| `%exp%` / `%need%` | 当前经验 / 升级所需经验 |
| `%percent%` / `%bar%` | 经验百分比 / 进度条 |
| `%total_exp%` | 累计经验 |
| `%season_name%` / `%season_number%` | 赛季名 / 第几赛季 |
| `%season_status%` / `%season_status_plain%` | 赛季状态（带颜色 / 纯文本） |
| `%season_end%` / `%season_remain%` | 结束时间 / 剩余时间 |
| `%season_start_date%` / `%season_end_date%` | 开始日期 / 结束日期 |
| `%season_state%` | 赛季界面提示 |
| `%pass_name%` / `%pass_id%` | 当前通行证名称 / ID |

## 开发 API

门面类：`com.chenyu.cypass.api.CyPassAPI`。

| 方法 | 返回 | 说明 |
|---|---|---|
| `CyPassAPI.isReady()` | `boolean` | 插件是否加载并可用 |
| `addProgress(Player, String, int)` | `int` | 给在线玩家的任务加进度；失败返回 -1 |
| `addProgress(UUID, String, int)` | `int` | 按 UUID 加进度；离线玩家也可，离线不会立即发经验 |
| `progress(Player, String)` | `int` | 查询任务进度；失败返回 -1 |
| `level(Player)` | `int` | 查询通行证等级；失败返回 -1 |
| `addExp(Player, double)` | `boolean` | 直接加通行证经验，触发升级、提示、倍率和落盘 |
| `seasonName()` | `String` | 当前赛季名；没有进行中的赛季返回 null |

```java
import com.chenyu.cypass.api.CyPassAPI;

if (CyPassAPI.isReady()) {
    CyPassAPI.addProgress(player, "dungeon_clear", 1);
    CyPassAPI.addExp(player, 50);
}
```

API 内部会切回主线程修改数据，可以从其他线程调用。离线玩家加进度不会当场发经验，等他下次打开菜单时补上。

## 常见问题

### `/pass` 没反应怎么办？

ArcPass 也注册了 `/pass`。两个插件同时安装时只会有一个抢到命令；直接使用 `/cypass`。

### 任务有进度但升不了级？

先确认赛季是否处于 `OPEN`。赛季未开始、已结束或时间写错时，任务进度会被冻结。

### 改了配置没有生效？

执行 `/cypass reload`；GUI、任务、奖励、通行证也可以单独重载。

### 玩家数据存在哪里？

默认 SQLite，数据在 `plugins/CyPass/data/`；不要手动改数据库文件，备份即可。

### 如何发奖励或调整玩家等级？

使用 `/cypass admin reward give`、`/cypass admin exp`、`/cypass admin level` 或 `/cypass admin setlevel`。

## 更新日志

按时间倒序，最新的在最上面。版本号和插件一致，当前版本是 `1.1.12`。

老版本数据会在升级后按数据库迁移逻辑处理，不用手动转换；升级前建议备份 `plugins/CyPass/data/`。

### 1.1.12（2026-10-22 · 当前版本）

- 当前构建版本；项目更新记录没有单独列出 1.1.12 条目，变更以实际构建为准。
- 继承 1.1.11 的公开 API 与超级熔炉联动。

### 1.1.11（2026-10-20）

- 新增 `CyPassAPI.addExp(Player, double)`：直接给通行证经验，触发升级、提示、倍率和落盘。
- 为 CySuperFurnace 提供联动：熔炼成功时给附近玩家发通行证经验。

### 1.1.0

- 100+ 项修正后的阶段版本。
- 日志系统上线：按天分文件、自动清理、控制台警告同步。
- 升级标题、音效、任务目标物品显示、统计读取和签到判定修复。
- 通行证商店名字去掉“已激活”标签，状态看 lore。

### 1.0.96 ~ 1.0.98

- 修复 1.21.11 统计必须带参数的问题，任务改为按材质统计。
- 修复任务秒完成、等级暴涨：统计基线改到主线程读取，数据库升级到 v3。
- 修复签到永远不生效：空记录不再被当成已签到。

### 1.0.69 ~ 1.0.71

- 清理死代码和旧版开赛流程，补回误删的类声明。
- 补回中文注释，删除 33 个无引用方法。
