---
pluginName: CyEnchantEnhancement
slug: cyenchantenhancement
version: 2.2.7
license: 付费
cores: Paper 1.21.11
summary: 附魔强化系统：强化书、保护石、保底概率和可配置强化面板。
---

## 简介

CyEnchantEnhancement（ESystemGUI）是一个附魔强化系统。玩家把装备放在左侧、强化书放在中间、保护石放在右下，点击确认强化装备上的附魔等级。

**核心功能**

- 强化书按分类和等级配置，成功率可固定或随机区间
- 失败可能无变化、掉级或损坏
- 保护石可挡掉级、挡损坏，一次性消耗
- 失败保底：每次失败增加成功率，最多累计
- 高等级强化全服公告
- 旧版残留清理，避免附魔显示两遍
- 强化日志按天写入文件

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | CraftEngine（自定义强化书/保护石外观） |
| 硬依赖 | 无 |

## 安装

1. 把 `CyEnchantEnhancement-2.2.7.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`books.yml`、`stones.yml` 和 `lang/`。
3. 配置强化书、保护石和语言文件。
4. 给玩家 `cyenchantenhancement.open` 权限。
5. 执行 `/cee open` 或从主城菜单「物品强化」进入。

## 玩家使用

入口：

- 主城菜单 →「物品强化」
- `/cee open`

面板操作：

1. 左侧放要强化的装备/武器。
2. 中间放强化书。
3. 右下放保护石（可选）。
4. 点击「确认强化」。

强化对象是装备上的附魔等级（如锋利、保护），不是白板攻击力。

结果：

- 成功：对应附魔 +1 级
- 失败：无变化
- 掉级：附魔 -1 级，掉到 0 级移除附魔
- 损坏：装备销毁
- 保护石：按 `block-down` / `block-break` 挡下对应结果
- 强化书和保护石只要参与就消耗，失败也消耗

## 管理命令

主命令：`/cee`、`/CyEnchantEnhancement`。需要对应权限。

| 命令 | 作用 |
|---|---|
| `/cee open` | 打开强化面板 |
| `/cee reload` | 重载配置 |
| `/cee book give <分类> <ID> <玩家> <数量>` | 发放强化书 |
| `/cee book list [页码]` | 列出强化书 |
| `/cee stone give <分类> <玩家> <数量>` | 发放保护石 |
| `/cee stone list [页码]` | 列出保护石 |
| `/cee enchant <附魔> <等级>` | 修改主手装备的附魔等级 |
| `/cee attack <add\|take> <数值>` | 调整主手物品攻击力 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cyenchantenhancement.help` | 所有人 | 查看帮助 |
| `cyenchantenhancement.open` | 所有人 | 打开强化面板 |
| `cyenchantenhancement.reload` | OP | 重载配置 |
| `cyenchantenhancement.book.give` | OP | 发放强化书 |
| `cyenchantenhancement.book.list` | OP | 查看强化书列表 |
| `cyenchantenhancement.stone.give` | OP | 发放保护石 |
| `cyenchantenhancement.stone.list` | OP | 查看保护石列表 |
| `cyenchantenhancement.enchant` | OP | 直接修改附魔等级 |
| `cyenchantenhancement.attack` | OP | 调整攻击力 |

## 配置

主配置在 `plugins/CyEnchantEnhancement/config.yml`。

```yaml
language: lang_cn
config-sync: true

pity:
  enabled: true
  increase: 2
  max: 10

announce:
  enabled: true
  levels:
    - 50
    - 100
    - 150

legacy-clean: true

log:
  enabled: true
  success: true
  down: true
  break: true
  fail: true
  protected: true
  cleanup:
    enabled: false
    retain-days: 7
    time: "00:00"
```

`pity`：每次失败增加 `increase%` 成功率，最多记录 `max` 次；默认最高 +20%。

`config-sync`：启动时只补缺失配置项，不覆盖已有值；`books.yml` / `stones.yml` 不参与自动补齐。

### 强化书

`books.yml` 结构：

```yaml
books:
  normal:
    1:
      material: BOOK
      glow: true
      name: "&f&l普通强化书"
      enchants: sharpness
      min-level: 0
      max-level: 10
      success: "0~80"
      down: "0~80"
      break: "0~30"
```

字段：

| 字段 | 说明 |
|---|---|
| `material` | 原版底材 |
| `ce-item` | CraftEngine 物品外观 |
| `enchants` | 对应附魔 ID |
| `min-level` / `max-level` | 可强化范围 |
| `success` / `down` / `break` | 成功 / 掉级 / 损坏概率，支持 `50~80` 区间 |
| `lore` | 支持 `{enchant}`、`{min}`、`{max}`、`{success}`、`{down}`、`{break}` |

### 保护石

`stones.yml`：

```yaml
stones:
  basic:
    material: EMERALD
    block-break: false
    block-down: true
  ultimate:
    material: EMERALD
    block-break: true
    block-down: true
```

`block-break` 挡损坏，`block-down` 挡掉级；两个都关闭时该分类会被跳过。

## 变量与 API

CyEnchantEnhancement 当前版本**没有公开 Java API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 强化面板打不开？

确认玩家有 `cyenchantenhancement.open`，并检查主城菜单命令是否指向 `/cee open`。

### 强化书/保护石不消耗？

确认放入了正确槽位；强化书必须与装备附魔匹配，保护石至少要开启一个保护项。

### 为什么一直失败？

成功率和强化书等级、装备当前附魔等级有关；每次失败会累计保底，最多 `pity.max × pity.increase`。

### 旧装备附魔显示两遍？

开启 `legacy-clean`，玩家下次上线会清理旧版插件留下的 lore/组件残留；箱子里的物品需要先拿进背包。

### 日志在哪里？

`plugins/ESystemGUI/logs/enhance-年-月-日.log`，按天分文件，UTF-8。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `2.2.7`。

### 2.2.7（2026-10-22 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 2.2.6

- 强化书/保护石配置、保底、公告、旧版清理和日志完善。
