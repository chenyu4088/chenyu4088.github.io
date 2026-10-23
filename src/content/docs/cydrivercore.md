---
pluginName: CyDriverCore
slug: cydrivercore
version: 1.10.13
license: 付费
cores: Paper 1.21.11
summary: 技能驱动核心：独立技能引擎，支持区域破坏、自定义物品、技能触发和冷却变量。
---

## 简介

CyDriverCore（CDC）是一个独立的技能引擎，用物品驱动技能。它不依赖 MythicMobs 的技能文件，自己解析技能、条件、冷却和物品绑定。

**核心能力**

- 区域破坏：球形、立方体等形状，单次安全上限
- 自定义物品：CraftEngine 模型物品、技能绑定、被动效果
- 一模型多技能：同一物品可以绑定多个技能
- 领地保护：WorldGuard / Residence
- 冷却查询：PlaceholderAPI 变量，零轮询
- 技能条件：世界、权限、手持物品、副手物品等
- 启动自检、统计、调试和发放审计

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | CraftEngine、PlaceholderAPI、WorldGuard、Residence、MythicMobs、Vault |
| 硬依赖 | 无 |

> 当前版本只支持 Paper / Leaf，不支持 Folia。技能破坏默认走 `Player#breakBlock`，领地和 mcMMO 等第三方加成会正常生效。

## 安装

1. 把 `CyDriverCore-1.10.13.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`skills/`、`items/` 和 `data.yml`。
3. 在 `skills/` 写技能，在 `items/` 写物品绑定。
4. 用 `/cdc reload` 重载。
5. 用 `/cdc doctor` 自检，`/cdc skills` 查看已加载技能。

目录：

```text
plugins/CyDriverCore/
├── config.yml
├── data.yml
├── skills/
│   ├── blood_scythe.yml
│   └── ...
└── items/
    ├── blood_scythe.yml
    └── ...
```

## 管理命令

主命令：`/cdc`，别名 `/cydriver`。

| 命令 | 作用 |
|---|---|
| `/cdc reload` | 重载配置、技能和物品 |
| `/cdc stats` | 查看运行统计 |
| `/cdc doctor` | 运行自检 |
| `/cdc skills` | 列出已加载技能 |
| `/cdc item list` | 列出物品定义 |
| `/cdc item give <物品> [玩家] [数量]` | 发放物品 |
| `/cdc give <物品> [玩家] [数量]` | 发放物品（简写） |
| `/cdc show` / `/cdc items` | 打开展示界面 |
| `/cdc list` | 列出物品 |
| `/cdc probe` | 探测手持物品绑定 |
| `/cdc handlers` | 查看触发器/处理器 |
| `/cdc placeholder` / `ph` | 查看 PAPI 变量 |
| `/cdc cast <技能> [玩家]` | 手动触发技能 |
| `/cdc triggers` | 查看触发器 |
| `/cdc debug` | 切换调试模式 |
| `/cdc version` | 查看版本 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cdc.admin` | OP | 全部管理权限 |
| `cdc.admin.reload` | OP | 重载 |
| `cdc.admin.stats` | OP | 统计 |
| `cdc.admin.doctor` | OP | 自检 |
| `cdc.admin.test` | OP | 手动触发技能 |
| `cdc.admin.debug` | OP | 调试模式 |
| `cdc.admin.show` | OP | 展示界面 |
| `cdc.bypass.world` | OP | 绕过世界限制 |
| `cdc.bypass.cooldown` | OP | 绕过冷却 |

## 配置

主配置在 `plugins/CyDriverCore/config.yml`。

```yaml
debug: false

worlds:
  mode: blacklist
  blacklist: []
  whitelist: []

breaking:
  drops: true
  use-tool: true
  skip-containers: true
  merge-drops: true
  max-blocks: 4096
  sound: true
  sound-volume: 1.0
  respect-region: true
  simulate-player-mining: true

cooldown:
  clear-on-quit: true

regions:
  detect-on-startup: true

startup-report:
  show-banner: true
  show-registries: true
  show-skill-count: true
  show-warnings: true

data:
  grant-log:
    enabled: true
```

| 字段 | 说明 |
|---|---|
| `worlds` | 全局世界限制，`blacklist` / `whitelist` |
| `breaking.drops` | 是否产生掉落 |
| `breaking.use-tool` | 是否按手持工具计算时运/精准 |
| `breaking.skip-containers` | 是否跳过容器 |
| `breaking.merge-drops` | 同类型掉落合并 |
| `breaking.max-blocks` | 单次破坏安全上限 |
| `breaking.simulate-player-mining` | 走完整玩家挖掘流水线，领地保护生效 |
| `cooldown.clear-on-quit` | 退出清冷却 |
| `data.grant-log` | `/cdc give` 发放审计 |

## 物品与技能

### 物品示例

`items/*.yml`：

```yaml
items:
  cdc:jizhi_wing:
    ce-item: "plny_new_year_2026_set:wing"
    name: "&b机械之翼"
    trigger: none
    passive:
      attack:
        - WingLifesteal
    attributes:
      max_health: 10
      armor: 3
```

`trigger: none` 表示纯被动，不响应左右键；`passive` 按触发器列技能，只在该物品位于副手时生效。

### 属性

`attributes` 是**追加**属性，不会清空 CraftEngine/原版自带的护甲、韧性或击退抗性。

### 技能文件

`skills/*.yml` 定义技能 ID、条件、冷却、触发器和效果。示例文件见 `plugins/CyDriverCore/skills/`；技能里的世界限制优先于全局 `worlds`。

## 变量与 API

PlaceholderAPI 标识符：`cdc`

### 按技能查

| 变量 | 含义 |
|---|---|
| `%cdc_ready_<技能ID>%` | 是否就绪，`true` / `false` |
| `%cdc_cd_<技能ID>%` | 剩余冷却秒数 |
| `%cdc_cd_<技能ID>:<format>%` | 自定义格式，如 `:.2f`、`:ceil`、`:floor`、`:ms`、`:ticks`、`:raw` |
| `%cdc_percent_<技能ID>%` | 剩余冷却百分比 |
| `%cdc_total_<技能ID>%` | 总冷却秒数 |

### 按手持物品查

| 变量 | 含义 |
|---|---|
| `%cdc_held_skill%` | 手持物品绑定的技能 ID |
| `%cdc_held_ready%` | 手持技能是否就绪 |
| `%cdc_held_cd%` | 手持技能剩余冷却 |
| `%cdc_held_cd_<n>%` | 第 n 个技能冷却 |
| `%cdc_held_percent%` | 剩余百分比 |
| `%cdc_held_lore%` | 现成冷却文案 |
| `%cdc_skillbar%` | 技能栏文本 |

### 聚合/信息

`%cdc_any_ready%`、`%cdc_all_ready%`、`%cdc_ready_count%`、`%cdc_skills%`、`%cdc_version%`。

当前版本没有公开 Java API；其他插件通过 PAPI 变量和 `/cdc cast` 交互。

## 常见问题

### 技能不触发？

用 `/cdc doctor` 和 `/cdc probe` 检查：技能是否加载、物品 PDC 是否正确、触发器是否匹配、世界/领地/冷却是否拦截。

### 破坏方块没有掉落？

检查 `breaking.drops`、`breaking.use-tool` 和技能行里的 `drops` 参数；`simulate-player-mining: true` 时会走玩家挖掘流水线。

### 领地保护没生效？

默认 `simulate-player-mining: true` 会派发 `BlockBreakEvent`，WorldGuard/Residence 正常拦截；不要为了绕过领地把它关掉。

### 副手被动不生效？

确认物品在副手、`trigger: none`、`passive.<触发器>` 配了技能，并且物品 PDC 是 CDC 发放的（CE 同款皮肤不算）。

### 支持 Folia 吗？

当前版本不支持，只支持 Paper / Leaf。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.10.13`。

### 1.10.13（2026-10-22 · 当前版本）

- 新增副手被动 `passive`：`attack` / `hit` / `kill` 等触发器。
- 新增 `trigger: none`，纯被动装备不响应左右键。
- 新增 `attributes` 追加属性，支持 `max_health`、`armor` 等。
- 新增副手物品条件 `offhanditem`。
- 新增 `lifesteal` 机制。

### 1.10.0

- 技能引擎、区域破坏、PAPI 冷却变量和自检工具。
