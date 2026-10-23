---
pluginName: CyExppond
slug: cyexppond
version: 4.0.0
license: 免费
cores: Paper 1.21.11
summary: 经验挂机池：在水池区域自动产出经验，支持金币/点券/指令奖励、特效和排行榜变量。
---

## 简介

CyExppond 让玩家站在指定水域池区自动获得经验。池子由两个对角坐标定义，可以配置经验瓶/直接经验、金币/点券/指令奖励、粒子、音效和界面。

**核心功能**

- 每个池独立配置世界、区域、权限、经验模式和奖励
- 经验瓶模式或直接发经验
- 金币、点券、控制台指令奖励，带每日上限
- 防结冰、粒子、音效、ActionBar/BossBar
- 每日 00:00 重置当日奖励
- PlaceholderAPI 变量

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | Vault、PlayerPoints、PlaceholderAPI |
| 硬依赖 | 无 |

## 安装

1. 把 `CyExppond-4.0.0.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`messages.yml`、`ponds.yml`。
3. 配置 `ponds.yml` 的池区域和奖励。
4. 执行 `/cep reload`。
5. 玩家走进池区即可挂机。

## 玩家使用

无需玩家命令。

- 进入池区自动开始产出。
- 默认每 5 秒生成经验瓶；`mode: direct` 时直接发经验。
- 池内显示 ActionBar / BossBar；离开后停止。
- 没有权限但 `pond_join: true` 时仍可进入，只是不产出奖励。

## 管理命令

需要 `cyexppond.admin`。

| 命令 | 作用 |
|---|---|
| `/cep help` | 查看帮助 |
| `/cep list` | 列出所有池 |
| `/cep wand` | 获取区域选择工具（左键 pos1，右键 pos2） |
| `/cep create <池名>` | 用当前选择创建池 |
| `/cep setregion <池名>` | 重新设置池区域 |
| `/cep info <池名>` | 查看池信息 |
| `/cep resetday [玩家]` | 重置当日奖励计数 |
| `/cep reload` | 重载配置 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cyexppond.admin` | OP | 管理命令 |
| `cyexppond.bypass` | OP | 绕过池子传送限制和权限进入，并正常获奖 |
| `cyexppond.<池名>` | 无 | 进入指定池并获奖，例如 `cyexppond.default` |

## 配置

### 主配置

```yaml
debug: false
daily_reset_time: "00:00"
timezone: "Asia/Shanghai"
logging:
  enabled: true
```

### 池配置

`ponds.yml` 每个顶层键就是一个池：

```yaml
default:
  enable: true
  world: "world"
  region:
    pos1: "0, 60, 0"
    pos2: "0, 60, 0"
  permission: "cyexppond.default"
  pond_join: true
  mode: "bottle"
  number: 5
  time: 5
  height: 4.0
  multiplier: 1
```

| 字段 | 说明 |
|---|---|
| `world` | 池所在世界 |
| `region.pos1` / `pos2` | 两个对角坐标 |
| `permission` | 进入并获奖所需权限；留空不限制 |
| `pond_join` | 无权限时是否允许进入 |
| `mode` | `bottle` 经验瓶 / `direct` 直接经验 |
| `number` | 每轮经验瓶数量；direct 模式为 `number × 6` 点经验 |
| `time` | 产出间隔（秒） |
| `height` | 经验瓶相对水面的高度 |
| `multiplier` | 经验倍率 |

### 奖励

```yaml
reward:
  money:
    enable: false
    speed: 60
    count: 50
    max: 2000
  points:
    enable: false
    speed: 120
    count: 3
    max: 20
  command:
    enable: false
    speed: 150
    commands: []
```

`max: 0` 表示不限制；指令奖励支持 `{player}` 占位符。

### 防结冰与特效

```yaml
ice_prevention:
  enable: true

effects:
  steam_hot_spring:
    enable: true
    rate: 5
    particle: "CLOUD"
  water_bubble:
    enable: true
    rate: 10
    particle: "BUBBLE_COLUMN_UP"
  density: 1.0
```

### 界面

```yaml
ui:
  actionbar: true
  bossbar:
    enable: true
    color: "BLUE"
    style: "SEGMENTED_10"
```

### 传送限制

```yaml
block_enter_by_teleport: false
```

设为 `true` 时禁止用传送直接进入池子。

## 变量与 API

PlaceholderAPI 标识符：`cep`

| 变量 | 含义 |
|---|---|
| `%cep_pond%` | 当前所在池名 |
| `%cep_money_total%` | 累计金币奖励 |
| `%cep_points_total%` | 累计点券奖励 |
| `%cep_money_today%` | 当前池今日金币 |
| `%cep_points_today%` | 当前池今日点券 |
| `%cep_money_max%` / `%cep_points_max%` | 当前池每日上限 |
| `%cep_money_today_<池名>%` / `%cep_points_today_<池名>%` | 指定池今日数据 |
| `%cep_money_max_<池名>%` / `%cep_points_max_<池名>%` | 指定池上限 |

当前版本没有公开 Java API。

## 常见问题

### 站在池里没有经验？

检查池是否 `enable: true`、区域坐标是否正确、玩家是否有 `cyexppond.<池名>` 权限，以及 `mode` / `number` / `time` 配置。

### 没有权限能进池吗？

`pond_join: true` 时能进，但不产出奖励；`false` 时会被拦在外面。

### 金币/点券奖励不触发？

对应 `reward.money.enable` / `reward.points.enable` 默认关闭；开启后还要检查 Vault/PlayerPoints 和每日上限。

### 池水结冰了？

`ice_prevention.enable: true` 会在结冰事件发生时化回水；启动/reload 时也会清一次存量冰。

### 每日几点重置？

由 `daily_reset_time` 和 `timezone` 控制，默认 `00:00`、`Asia/Shanghai`。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `4.0.0`。

### 4.0.0（2026-10-02 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 3.0.0

- 从 KukeExpPond 更名为 CyExppond，命令改为 `/cep`。
- 重写池加载、奖励、粒子、防结冰和配置补齐。
- PAPI 标识符改为 `%cep_*%`。
