---
pluginName: CyPeachHP
slug: cypeachhp
version: 2.2.1
license: 付费
cores: Paper 1.21.11
summary: 蟠桃血量：右键食用蟠桃，按概率永久提升血量上限，并按百分比显示血条。
---

## 简介

CyPeachHP（PeachHP）用蟠桃永久提升玩家血量上限。玩家右键食用蟠桃，按配置的概率成功增加血量；失败也会消耗蟠桃。

**核心功能**

- 多种蟠桃，每种独立配置成功率、增加血量和物品外观
- 成功/失败/达到上限/失效蟠桃不同反馈
- 血量上限默认 200，可用权限提高
- 血条按百分比显示，避免高血量时一排心
- 数据持久化到 `plugins/PeachHP/data.yml`
- PlaceholderAPI 变量
- 管理命令发放、查询、修改、排行

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11（Folia 兼容） |
| Java | Java 21 |
| 数据文件 | `plugins/PeachHP/data.yml` |
| 软依赖 | CraftEngine、PlaceholderAPI |
| 硬依赖 | 无 |

## 安装

1. 把 `CyPeachHP-2.2.1.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml` 和 `data.yml`。
3. 在 `peaches:` 下配置蟠桃。
4. 用 `/cypeachhp give <蟠桃ID> <数量> <玩家>` 发放。
5. 玩家右键食用。

## 玩家使用

无需命令：

- 右键食用背包里的蟠桃。
- 成功：永久增加 `add-hp` 血量上限。
- 失败：不增加，但蟠桃照样消耗。
- 达到上限：不能继续吃。
- 旧版失效蟠桃：提示联系管理。

默认配置：

| 蟠桃 | 成功率 | 增加血量 |
|---|---|---|
| 蟠桃 | 50% | 0.5 |
| 仙品蟠桃 | 20% | 2.0 |

## 管理命令

主命令：`/cypeachhp`，别名 `/cph`。需要 `cypeachhp.admin`。

| 命令 | 作用 |
|---|---|
| `/cph add <血量> <玩家>` | 增加蟠桃血量 |
| `/cph remove <血量> <玩家>` | 扣除蟠桃血量 |
| `/cph set <血量> <玩家>` | 设置蟠桃血量 |
| `/cph info [玩家]` | 查看插件信息或玩家血量 |
| `/cph give <蟠桃> [数量] [玩家]` | 发放蟠桃，玩家不填默认自己 |
| `/cph list [页码]` | 蟠桃血量排行 |
| `/cph reload` | 重载配置 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cypeachhp.admin` | OP | 管理命令 |
| `peachhp.limit.<数值>` | 无 | 提高血量上限，例如 `peachhp.limit.500`；多个取最大值 |
| `peachhp.limit.unlimited` | 无 | 无上限 |

## 配置

主配置在 `plugins/PeachHP/config.yml`。

### 血条与数据

```yaml
health-bar:
  percentage-display: true

data:
  save-interval: 5

default-limit: 200
identify-mode: pdc
```

`identify-mode`：

- `pdc`：以发放时写入物品的数据为准，改配置不影响旧桃。
- `config`：以配置实时数据为准，配置删除的桃无法食用。

### 蟠桃定义

```yaml
peaches:
  pantao:
    item: APPLE
    amount: 1
    name: "&d蟠桃"
    lore:
      - "&7食用后 &e%success-rate%% &7概率增加 &a%add-hp% &7血量上限"
    success-rate: 50.0
    add-hp: 0.5

  xianpingpantao:
    item: GOLDEN_APPLE
    amount: 1
    name: "&6仙品蟠桃"
    lore:
      - "&7食用后 &e%success-rate%% &7概率增加 &a%add-hp% &7血量上限"
    success-rate: 20.0
    add-hp: 2.0
```

`item` 支持：

- 原版材质，如 `APPLE`
- `ia:命名空间:物品ID`（ItemsAdder）
- `ce:命名空间:物品ID`（CraftEngine）
- `mm:物品ID`（MythicMobs）

还可以配置 `custom-model-data`、`enchants`、`flags`、`owner`。

## 变量与 API

PlaceholderAPI 标识符：`peachhp`

| 变量 | 含义 |
|---|---|
| `%peachhp_current%` / `%peachhp_hp%` / `%peachhp_health%` | 当前蟠桃血量 |
| `%peachhp_limit%` / `%peachhp_max%` | 蟠桃血量上限，无上限显示 `∞` |

当前版本没有公开 Java API。

## 常见问题

### 为什么吃了没加血量？

先看成功率；失败也会消耗蟠桃。达到 `default-limit` 或权限上限后不会再加。

### 旧蟠桃提示“已无法食用”？

`identify-mode: pdc` 下旧桃依赖发放时写入的数据；配置被删改后可能失效。联系管理员补发。

### 血量上限怎么提高？

改 `default-limit`，或给玩家 `peachhp.limit.500` 这类权限；多个节点取最大值。

### 血条为什么不是一排心？

`health-bar.percentage-display: true` 时按百分比显示固定 10 颗心。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `2.2.1`。

### 2.2.1（2026-10-11 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 2.2.0

- 蟠桃血量、PAPI 变量、管理命令和百分比血条。
