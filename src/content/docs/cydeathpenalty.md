---
pluginName: CyDeathpenalty
slug: cydeathpenalty
version: 2.0.0
license: 免费
cores: Paper 1.21.11
summary: 死亡惩罚：按配置扣除经验、金币、物品，执行指令，或扣蟠桃血量。
---

## 简介

CyDeathpenalty 在玩家死亡时按配置执行惩罚。所有惩罚默认关闭，需要逐项启用。

**支持的惩罚**

- 经验扣除：固定等级或按当前等级比例
- 金币扣除：固定金额或按余额比例；可把扣款转给击杀者当赏金
- 物品掉落：固定件数或按比例；可保护快捷栏、装备栏和带指定 lore 的物品
- 指令惩罚：可配置多条，支持任意数量
- 蟠桃血量扣除：按 PeachHP 血量门槛阶梯扣除

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | Vault（金币）、PeachHP（蟠桃血量） |
| 硬依赖 | 无 |

## 安装

1. 把 `CyDeathpenalty-2.0.0.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`。
3. 在 `punishments` 下把要启用的项改成 `enabled: true`。
4. 配置免罚权限、免罚世界和日志。
5. 测试死亡流程；建议先在测试服验证。

## 使用方式

插件没有玩家命令，死亡时自动触发。

- 拥有 `settings.bypass-all` 的玩家不触发任何惩罚。
- 在 `settings.exempt-worlds` 里的世界死亡不触发惩罚。
- 每类惩罚有独立 bypass 权限，可单独跳过。

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `deathpenalty.bypass.all` | 无 | 跳过全部死亡惩罚 |
| `deathpenalty.bypass.exp` | 无 | 跳过经验扣除 |
| `deathpenalty.bypass.money` | 无 | 跳过金币扣除 |
| `deathpenalty.bypass.drop` | 无 | 跳过物品掉落 |
| `deathpenalty.bypass.command.1` / `.2` | 无 | 跳过对应序号的指令惩罚 |
| `deathpenalty.bypass.peach` | 无 | 跳过蟠桃血量扣除 |
| `deathpenalty.protection.inventory` | 无 | 快捷栏物品不参与掉落 |
| `deathpenalty.protection.equipment` | 无 | 装备栏物品不参与掉落 |

节点名可以在配置里改，以实际配置为准。

## 配置

主配置在 `plugins/CyDeathpenalty/config.yml`。

### 全局

```yaml
settings:
  bypass-all: "deathpenalty.bypass.all"
  message-prefix: "&8[&c死亡惩罚&8]: "
  debug: false
  exempt-worlds: []
```

### 经验

```yaml
punishments:
  exp:
    enabled: false
    bypass-permission: "deathpenalty.bypass.exp"
    mode: FIXED        # FIXED / RATIO
    amount: 50.0
    message: "&c你的经验被扣除了 &r{amount} &c级"
```

`FIXED` 扣固定等级，`RATIO` 按当前等级百分比扣。

### 金币

```yaml
money:
  enabled: false
  bypass-permission: "deathpenalty.bypass.money"
  mode: FIXED
  amount: 100.0
  message: "&c你的金币被扣除了 &r{amount}"
```

可选的击杀赏金：

```yaml
killer-reward:
  enabled: true
  ratio: 100.0
  message: "&a你击杀了 {player}, 获得赏金 {amount} 金币"
```

### 物品掉落

```yaml
drop:
  enabled: false
  bypass-permission: "deathpenalty.bypass.drop"
  mode: FIXED
  amount: 3.0
  protection:
    inventory-permission: "deathpenalty.protection.inventory"
    equipment-permission: "deathpenalty.protection.equipment"
    protected-lore:
      - "灵魂绑定"
      - "Soulbound"
```

`protected-lore` 命中名称或 lore 的物品不会掉落。

### 指令惩罚

```yaml
commands:
  - enabled: false
    bypass-permission: "deathpenalty.bypass.command.1"
    commands:
      - "eco take %player% 100"
    message: "&c你被罚款 &r100 &c金币"
```

可以复制多段，序号对应 bypass 权限。

### 蟠桃血量

```yaml
peach:
  enabled: false
  bypass-permission: "deathpenalty.bypass.peach"
  tiers:
    - threshold: 100.0
      amount: 2.0
    - threshold: 500.0
      amount: 5.0
    - threshold: 1000.0
      amount: 10.0
```

命中满足条件的最高一档；未达到任何门槛不扣。

### 日志

```yaml
logs:
  enabled: true
  retention-days: 7
  clean-time: "00:00"
```

日志在 `plugins/CyDeathpenalty/logs/年-月-日.log`。

## 变量与 API

CyDeathpenalty 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 死了没有扣钱？

检查 `punishments.money.enabled`、Vault/经济插件、玩家余额和 bypass 权限。

### 物品没有掉？

检查 `drop.enabled`、`drop.mode`、保护权限和 `protected-lore`；灵魂绑定物品默认受保护。

### 怎么只在某些世界生效？

用 `settings.exempt-worlds` 排除安全世界；列表为空表示所有世界都生效。

### 调试为什么没触发？

把 `settings.debug` 设为 true，控制台会打印每条惩罚的执行/跳过原因。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `2.0.0`。

### 2.0.0（2026-10-08 · 当前版本）

- 当前版本；项目此前没有独立更新日志，先记录当前版本。
- 支持经验、金币、物品、指令和蟠桃血量五类惩罚。
- 支持分类 bypass、免罚世界和日志。

### 1.0.0

- 初版死亡惩罚框架。
