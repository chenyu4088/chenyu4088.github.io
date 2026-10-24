---
pluginName: CyAnvilPunishReset
slug: cyanvilpunishreset
version: 2.0.0
license: 免费
cores: Paper 1.21.11
summary: 铁砧惩罚重置：手持“过于昂贵”的物品，付费清除铁砧惩罚等级。
---

## 简介

CyAnvilPunishReset 用来清除物品的铁砧惩罚（“过于昂贵”）。玩家手持带有惩罚的物品，执行 `/apr reset` 发起重置，再输入 `/apr confirm` 确认并扣除金币。

**核心功能**

- 只处理主手物品
- 先发起、再确认，避免误扣款
- 金币不足、物品无惩罚、主手为空都有明确提示
- 管理员可远程重置指定玩家主手物品
- 配置热重载

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 软依赖 | Vault + 经济插件（收费时需要） |
| 硬依赖 | 无 |

## 安装

1. 把 `CyAnvilPunishReset-2.0.0.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`。
3. 设置 `settings.reset-cost` 和 `confirm-timeout`。
4. 给玩家 `cyanvilpunishreset.reset` 权限。
5. 手持带有铁砧惩罚的物品，执行 `/apr reset`。

## 玩家命令

| 命令 | 作用 |
|---|---|
| `/apr help` / `/cyanvilpunishreset help` | 查看帮助 |
| `/apr info` | 查看手持物品的铁砧惩罚信息 |
| `/apr reset` | 发起重置（需主手持有物品） |
| `/apr confirm` | 确认重置并扣除花费 |

`confirm-timeout` 内不确认会失效，需要重新发起。

## 管理命令

| 命令 | 作用 |
|---|---|
| `/apr reload` | 重载配置 |
| `/apr admin reset <玩家>` | 为指定在线玩家重置主手物品 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cyanvilpunishreset.reset` | 所有人 | 发起/确认重置 |
| `cyanvilpunishreset.info` | 所有人 | 查看物品信息 |
| `cyanvilpunishreset.reload` | OP | 重载配置 |
| `cyanvilpunishreset.admin` | OP | 为其他玩家重置 |

## 配置

主配置在 `plugins/CyAnvilPunishReset/config.yml`。

```yaml
settings:
  message-prefix: "&8[ &b铁砧重置 &8] &r "
  reset-cost: 1000.0
  confirm-timeout: 60
  debug: false

messages:
  reset-prompt: "&7输入 &f/apr confirm &7确认重置，将花费 &f{cost} &7金币"
  reset-confirm: "&7已重置手持物品的铁砧惩罚，花费 &f{cost} &7金币"
  reset-no-money: "&7金币不足，需要 &f{cost} &7金币"
  no-item: "&7主手没有持有物品"
  no-penalty: "&7该物品没有铁砧惩罚"
```

| 字段 | 说明 |
|---|---|
| `reset-cost` | 每次重置花费金币 |
| `confirm-timeout` | 确认有效期（秒） |
| `debug` | 控制台输出执行/失败原因 |
| `messages` | 所有提示文案 |

## 变量与 API

CyAnvilPunishReset 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### 提示“主手没有持有物品”？

重置只处理主手物品；把要重置的物品拿在主手再执行。

### 提示“该物品没有铁砧惩罚”？

物品没有“过于昂贵”惩罚，或惩罚已经被清除。可以先用 `/apr info` 查看。

### 扣款失败怎么办？

检查 Vault 和经济插件是否正常、玩家余额是否足够；扣款失败时重置会取消。

### 确认超时了？

默认 60 秒内输入 `/apr confirm`；超时需要重新 `/apr reset`。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `2.0.0`。

### 2.0.0（2026-10-08 · 当前版本）

- 当前版本；项目此前没有独立更新日志，先记录当前版本。
- 支持 `/apr reset` / `confirm`、管理员远程重置和配置重载。
- 支持金币收费、确认超时和详细提示。

### 1.0.0

- 初版铁砧惩罚重置。
