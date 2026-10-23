---
pluginName: CySoulbound
slug: cysoulbound
version: 1.1.3
license: 免费
cores: Paper 1.21.11
summary: 灵魂绑定：把主手物品绑定给玩家，禁止丢弃、他人拾取/使用、容器转移和死亡掉落。
---

## 简介

CySoulbound 把主手物品绑定到玩家名下。绑定后的物品不能被主人丢弃，不能被其他玩家拾取、使用、装备、合成、附魔、铁砧、砂轮或锻造，死亡也不会掉落。

**核心功能**

- `/csl bind` 绑定主手物品
- `/csl unbind` 解绑主手，或按 ID 解绑
- `/csl list` 查看自己的绑定物品，支持点击解绑
- 绑定 lore 标记，可配置格式
- 支持金币/点券收费与权限绕过
- SQLite 持久化，支持离线玩家查询

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 数据库 | SQLite，插件自带 |
| 数据文件 | `plugins/CySoulbound/data.db` |
| 软依赖 | Vault、PlayerPoints（收费时需要） |
| 硬依赖 | 无 |

## 安装

1. 把 `CySoulbound-1.1.3.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml` 和 SQLite 数据库。
3. 按需修改绑定上限、收费、保护开关。
4. 执行 `/cysoulbound reload`，部分设置需要重启。

## 玩家命令

| 命令 | 作用 |
|---|---|
| `/cysoulbound bind` / `/csl bind` | 绑定主手物品 |
| `/cysoulbound unbind` / `/csl unbind` | 解绑主手物品 |
| `/cysoulbound unbind <ID>` / `/csl unbind <ID>` | 按绑定 ID 解绑 |
| `/cysoulbound list` / `/csl list` | 查看自己的绑定列表 |
| `/cysoulbound list <页码>` | 翻页 |
| `/cysoulbound help` | 查看帮助 |

`list` 里的「解绑」按钮可以直接解除对应绑定。

## 管理命令

需要 `cysoulbound.admin`。

| 命令 | 作用 |
|---|---|
| `/csl admin bind <玩家>` | 把主手物品强制绑定给指定在线玩家 |
| `/csl admin unbind <玩家>` | 强制解绑指定在线玩家主手物品 |
| `/csl inspect` | 查看主手物品的绑定信息 |
| `/csl list <玩家> [页码]` | 查看任意玩家的绑定列表 |
| `/csl admin reload` / `/csl reload` | 重载配置 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cysoulbound.use` | 所有人 | 绑定、解绑、查看自己的列表 |
| `cysoulbound.admin` | OP | 管理他人绑定、重载 |
| `cysoulbound.bypass` | OP | 绕过所有灵魂绑定保护 |
| `cysoulbound.economy.bypass` | 关闭 | 只跳过绑定/解绑收费 |
| `cysoulbound.limit.<数量>` | 无 | 提高绑定上限，例如 `cysoulbound.limit.5` |
| `cysoulbound.limit.unlimited` / `*` | 无 | 不限制绑定数量 |

## 配置

主配置在 `plugins/CySoulbound/config.yml`。

### 绑定规则

| 字段 | 默认 | 说明 |
|---|---|---|
| `bind.max-per-player` | `1` | 每人最多绑定件数，`-1` 不限制 |
| `bind.allowed-materials` | 空 | 允许绑定的材质；空表示全部 |
| `bind.denied-materials` | 空 | 禁止绑定的材质，优先级高于允许列表 |

```yaml
bind:
  max-per-player: 1
  allowed-materials: []
  denied-materials: []
```

### 收费

```yaml
economy:
  bind:
    enabled: true
    pay: money       # money / points
    amount: 10000
  unbind:
    enabled: false
    pay: money
    amount: 10000
```

### 保护开关

```yaml
protect:
  drop: true
  pickup: true
  container: true
  use: true
  equip: true
  shulker: true
  item-frame: true
  armor-stand: true
  craft: true
  anvil: true
  enchant: true
  smithing: true
  grindstone: true
death:
  keep: true
```

关闭某一项就允许对应行为；`death.keep: true` 表示绑定物品死亡不掉落。

### 数据库与日志

```yaml
database:
  file: "data.db"
logs:
  enabled: true
  retention-days: 7
  cleanup-time: "00:00"
```

## 界面/提示

绑定后在物品 lore 追加：

```yaml
lore:
  enabled: true
  format: "&b[ 已绑定: {owner} ]"
  marker: "已绑定:"
```

`marker` 用于解绑时识别并删除本插件追加的 lore 行。

## 变量与 API

CySoulbound 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 绑定后还能交易吗？

不能。其他玩家无法拾取、使用、装备、合成、附魔、铁砧、砂轮或锻造；主人也不能丢弃。

### 为什么绑定收费失败？

检查 Vault 或 PlayerPoints 是否安装、`economy.bind.pay` 是否对应、余额是否足够。`cysoulbound.economy.bypass` 可跳过收费，但不会绕过保护。

### 绑定数量上限怎么改？

改 `bind.max-per-player`，或给玩家 `cysoulbound.limit.<数量>` 权限；多个节点取较高值。

### 解绑后 lore 会删掉吗？

会。插件按 `lore.marker` 找到自己追加的行并删除，不会动其他 lore。

### 数据库能手动改吗？

不建议。先备份 `plugins/CySoulbound/data.db`，再操作。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.1.3`。

### 1.1.3（2026-10-22 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 1.1.0（2026-10-19）

- 灵魂绑定主流程、保护开关、收费和列表解绑。

### 1.0.0（2026-10-19 · 首发）

- 主手绑定、SQLite 持久化、死亡保留和基础保护。
