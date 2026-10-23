---
pluginName: CyRedeem
slug: cyredeem
version: 1.4.6
license: 免费
cores: Paper 1.21.11
summary: 材料兑换菜单：左侧选物品，右侧放材料，支持分页、管理后台和完整物品序列化。
---

## 简介

CyRedeem 是一个材料兑换插件：玩家打开兑换菜单，选择要换的物品，把材料放进提交槽，确认后获得产物。

**核心功能**

- 主界面商品区，每页 28 格，支持翻页
- 提交界面：顶部产物预览 + 14 格材料槽 + 一键放入
- 管理界面：手持物品创建兑换项，编辑产物和材料
- 完整保留物品名称、lore、附魔、NBT、模型和耐久
- 支持 CraftEngine 物品作为图标、产物或材料
- SQLite 存储，关闭界面自动退回材料
- 兑换日志和后台操作日志

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 数据库 | SQLite，插件自带 |
| 数据文件 | `plugins/CyRedeem/cyredeem.db` |
| 软依赖 | CraftEngine（可选） |
| 硬依赖 | 无 |

## 安装

1. 把 `CyRedeem-1.4.6.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`messages.yml`、`gui/` 和数据库。
3. 进服执行 `/cr` 打开兑换菜单。
4. 管理员手持要作为产物的物品，执行 `/cr create <名字>` 创建兑换项。
5. 在管理界面编辑产物、材料、图标，保存后即可使用。

## 玩家命令

| 命令 | 作用 |
|---|---|
| `/cr` | 打开兑换主界面 |
| `/cr open` | 打开兑换主界面 |
| `/cr help` | 查看帮助 |

别名：`/cyredeem`、`/redeem`。

界面操作：

- 左键「操作」：从背包一键放入所需材料。
- 右键「操作」：直接兑换。
- 材料不足时红字提示；多余材料会留在槽里，可连续兑换。
- 关闭界面时材料自动退回背包；背包满时产物掉在脚下。

## 管理命令

需要 `cyredeem.admin`。

| 命令 | 作用 |
|---|---|
| `/cr create <名字>` | 以主手物品创建兑换项，并打开管理界面 |
| `/cr list [页码]` | 列出兑换项，每页 10 条 |
| `/cr show <编号>` | 在菜单中显示该兑换项 |
| `/cr hide <编号>` | 隐藏该兑换项 |
| `/cr toggle <编号>` | 切换显示/隐藏 |
| `/cr remove <编号>` | 删除兑换项（需 `/cr confirm` 二次确认） |
| `/cr confirm` | 确认删除 |
| `/cr cancel` | 取消删除 |
| `/cr reload` | 重载配置、消息、GUI 和兑换数据 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cyredeem.use` | 所有人 | 打开兑换菜单 |
| `cyredeem.admin` | OP | 创建、编辑、删除兑换项，重载配置 |

## 配置

主配置在 `plugins/CyRedeem/config.yml`。

### 材料比对

| 字段 | 默认 | 说明 |
|---|---|---|
| `match.material` | `true` | 材质不同就不算同一种材料 |
| `match.name` | `true` | 显示名参与比对 |
| `match.lore` | `true` | lore 参与比对 |
| `match.enchantments` | `true` | 附魔参与比对 |
| `match.nbt` | `true` | NBT / PDC（含 CE 组件）参与比对 |
| `match.model` | `true` | `item_model` / `custom_model_data` 参与比对 |
| `match.durability` | `true` | 剩余耐久参与比对 |

数量永远不参与“是否同一种材料”的比对，需求量单独累计。

```yaml
match:
  material: true
  name: true
  lore: true
  enchantments: true
  nbt: true
  model: true
  durability: true
```

### 日志

```yaml
logs:
  enabled: true
  keep-days: 7
  cleanup-time: "00:00"
  record:
    redeem: true
    redeem-failed: false
    admin: true
    open-menu: false
    system: true
  console: false
```

## 界面配置

三个界面都在 `plugins/CyRedeem/gui/`：

| 文件 | 界面 |
|---|---|
| `main.yml` | 兑换主界面 |
| `submit.yml` | 材料提交界面 |
| `manage.yml` | 管理编辑界面 |

可以改标题、材质、名称、lore 和按钮；功能槽位固定，不能随意移动。具体槽位以 `gui/Layout.java` 为准：

- 主界面商品区：第 2–5 行第 2–8 列
- 顶部图标：4
- 产物预览：10–16
- 材料槽：28–34、37–43
- 返回：45
- 上一页 / 操作 / 下一页：48 / 49 / 50
- 关闭：53

## 变量与 API

CyRedeem 当前版本**没有公开 API**，也**没有注册独立的 PlaceholderAPI 变量**。

## 常见问题

### `/cr` 打不开？

确认玩家有 `cyredeem.use` 权限，并且不是控制台执行。

### 材料明明够，为什么不能兑换？

检查 `match` 配置。默认名称、lore、附魔、NBT、模型、耐久都会参与比对；其中一项不同就会被当成不同材料。

### 关闭界面后材料去哪了？

材料会自动退回背包；背包满时掉在脚下。兑换后多余材料也会退回。

### 支持 CraftEngine 物品吗？

支持。物品通过完整序列化保存，CE 组件会保留；没有安装 CE 或 ID 写错时会回退到纸。

### 删除兑换项能恢复吗？

删除是永久操作，需要二次确认。建议先备份 `plugins/CyRedeem/cyredeem.db`。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.4.6`。

### 1.4.6（2026-10-22 · 当前版本）

- 当前构建版本；项目更新记录的早期条目主要记录 1.0.x 的界面与 CE 支持。
- 完整历史见插件根目录 `更新日志.md`。

### 1.0.1（2026-10-22）

- 修复边框漏画：补全 20 格玻璃板。
- 主界面 slot 4 默认显示 33 兑换卡（CE 物品）。
- `/cr create` 支持保留 CE 图标、产物和材料组件。

### 1.0.0（2026-10-22 · 首发）

- 三个界面：主界面、材料提交、管理界面。
- SQLite 存储兑换项和材料。
- 物品完整序列化，保留名称、lore、附魔、NBT、模型和耐久。
- 材料保护：关闭界面退回、兑换后多余材料退回、产物掉落在脚下。
