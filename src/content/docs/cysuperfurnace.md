---
pluginName: CySuperFurnace
slug: cysuperfurnace
version: 1.1.0
license: 付费
cores: Paper 1.21.11
summary: 超级熔炉：蹲下右键熔炉打开升级面板，提升翻倍概率、产量倍数和熔炼速度。
---

## 简介

CySuperFurnace 把普通熔炉变成可升级的超级熔炉。玩家蹲下并空手右键熔炉打开面板，用金币或点券升级三项属性：

- **翻倍概率**：触发额外产物
- **产量倍数**：提高单次产出
- **熔炼速度**：缩短熔炼时间

超级熔炉免疫爆炸，挖掉后等级随物品保留；输出槽满时自动暂停，取走产物后继续。

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 经济 | Vault 或 PlayerPoints |
| 软依赖 | Vault、PlayerPoints、CraftEngine、CyPass |
| 硬依赖 | 无 |

## 安装

1. 把 `CySuperFurnace-1.1.0.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`。
3. 设置 `economy.type` 为 `vault` 或 `points`。
4. 给玩家 `cysuperfurnace.use` 权限。
5. 蹲下 + 空手右键熔炉测试。

## 使用方式

- **玩家**：蹲下 + 空手右键熔炉 → 打开升级面板。
- 面板固定槽位：4 状态、11 概率、13 倍数、15 速度、26 关闭。
- 点击对应按钮升级，费用从配置的经济系统扣除。
- 达到 `max-level` 后按钮显示已满级。
- 挖掉超级熔炉会保留等级；放置后继续使用。

## 管理命令

需要 `cysuperfurnace.admin`。

| 命令 | 作用 |
|---|---|
| `/cysuperfurnace help` / `/csf help` | 查看帮助 |
| `/cysuperfurnace give <玩家> [数量]` | 给予超级熔炉物品 |
| `/cysuperfurnace set <属性> <等级>` | 设置主手超级熔炉的属性等级 |
| `/cysuperfurnace upgrade <属性> [级数]` | 提升主手超级熔炉属性 |
| `/cysuperfurnace downgrade <属性> [级数]` | 降低主手超级熔炉属性 |
| `/cysuperfurnace reload` | 重载配置 |

属性名：`probability`、`multiplier`、`speed`。

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cysuperfurnace.use` | OP | 使用超级熔炉、蹲右打开面板和升级 |
| `cysuperfurnace.admin` | OP | give / reload / set / upgrade / downgrade |

## 配置

主配置在 `plugins/CySuperFurnace/config.yml`。

### 经济与自动转换

```yaml
auto-upgrade:
  enabled: false
  types:
    - FURNACE

economy:
  type: vault          # vault / points
  vault-symbol: "$"
  points-symbol: "P"
```

`auto-upgrade.enabled: true` 时，蹲右普通熔炉会自动转换成超级熔炉。

### 三项升级

```yaml
upgrades:
  probability:
    initial: 0.0
    step: 0.1
    max-level: 10
    base-price: 1000
    price-multiplier: 1.2
  multiplier:
    initial: 1.0
    step: 0.1
    max-level: 10
    base-price: 2000
    price-multiplier: 1.2
  speed:
    initial: 1.0
    step: 0.2
    max-level: 45
    base-price: 500
    price-multiplier: 1.2
```

价格公式：第 n 次升级价格 = `base-price × price-multiplier^n`。

### 硬上限

```yaml
limits:
  probability: 1.0
  multiplier: 64.0
  speed: 20.0
```

`max-level`、权限节点和 OP 的 `/csf set` 都不能超过这些值。

### GUI

```yaml
gui:
  title: "&b&l超级熔炉"
  fill:
    material: "GRAY_STAINED_GLASS_PANE"
  items:
    status:
      material: "FURNACE"
      name: "&e&l当前熔炉状态"
    probability:
      material: "GOLD_INGOT"
      name: "&e&l升级翻倍概率"
    multiplier:
      material: "DIAMOND"
      name: "&b&l升级产量倍数"
    speed:
      material: "BLAZE_POWDER"
      name: "&6&l升级熔炼速度"
    close:
      material: "BARRIER"
      name: "&c&l关闭"
```

`material` 支持原版材质、`minecraft:xxx` 或 `craftengine:物品id`。

### CyPass 联动

`cypass.enabled: true` 且安装 CyPass 时，熔炼成功会给附近玩家发通行证经验；具体数值在 `cypass:` 段配置。

## 变量与 API

CySuperFurnace 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 蹲右没有反应？

确认玩家有 `cysuperfurnace.use`，主手为空，且目标方块是熔炉类；`auto-upgrade.enabled` 为 false 时需要先有超级熔炉物品。

### 费用不扣/无法升级？

检查 `economy.type` 与对应经济插件是否安装；Vault 需要经济插件，PlayerPoints 需要点券插件。

### 服务器重启后等级还在吗？

等级保存在熔炉物品/方块数据中；挖掉会随物品保留。建议升级前备份。

### 输出槽满了会继续烧吗？

不会。输出槽满时自动暂停，取走产物后继续。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.1.0`。

### 1.1.0（2026-10-20 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 1.0.0（2026-10-20 · 首发）

- 超级熔炉方块、三项属性升级、GUI 和 CyPass 联动。
