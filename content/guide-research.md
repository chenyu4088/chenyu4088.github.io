# 33生存 游玩指南资料（源文件）

> 这是游玩指南的**资料源**，不是最终页面。后面重铸 `/guide` 时，以本文件为准。
>
> - 服务器：33生存 / `mc33.top` / Minecraft Java 版 1.21.11
> - 整理日期：2026-10-23
> - 分析范围：`E:\Cy*` 下 14 个 Cy 插件项目 + 测试服 `plugins` 目录 77 个 jar（`plugin.yml`、`config.yml`、命令执行器、监听器、GUI、README/更新记录）
> - 启动器：QQ 群 `1049661762` 群文件；网站 `/download` 只放说明/校验值
> - 第三方插件（Residence、CoreProtect、优化类等）未拿到服务器 `plugins` 目录，见第 6 节

---

## 0. 重铸规则（最重要）

写 `/guide` 页面时只允许收录：

1. **玩家真的能用的命令**：权限默认所有人，或服务器明确给玩家开放；
2. **玩家能感知的玩法**：领地、兑换、副本、强化、排行、经验池等；
3. **有来源的命令**：命令字面量、用法、权限必须能在项目里找到；
4. **不确定的内容**：标 `low` / “需实测”，不要写成确定事实。

禁止写入：

- OP / 管理员命令（`/reload`、`/give`、管理 GUI、调试命令等）；
- CoreProtect 的 `/co`、`/co l`、`/co rollback` 等回档/查询命令；
- 性能优化、清理、区块/实体限制、Timings/Spark 之类；
- 插件内部库、支付后台、App、构建/部署命令；
- 拿不准的命令，不要根据“常见插件”猜。

---

## 1. 插件总表

| 项目 | 玩家可见 | 玩家命令 | 处理 | 说明 |
|---|---|---|---|---|
| CyAnvilPunishReset | 是 | 0 | **排除** | 铁砧惩罚付费清零；所有命令默认 OP，未给玩家授权，不写入 |
| CyDeathpenalty | 是 | 0 | **暂不写入** | 死亡惩罚；默认全部关闭，是否在 33生存 开启待实测 |
| CyDriverCore | 否 | 0 | **排除** | 技能引擎/库，只有管理指令 |
| CyDungeonM | 是 | 16+ | **写入** | 副本菜单、队伍、排行榜、商店 |
| CyEnchantEnhancement | 是 | 3 | **写入** | 强化面板：主城菜单/`/esystem open`、`/cee open`、`/qhsd` 强化商店 |
| CyExppond | 是 | 0 | **写入** | 经验挂机池，走进去即可，无需命令 |
| CyPass | 是 | 10 | **写入** | 通行证任务、奖励、商店、赛季 |
| CyPay | 否 | 0 | **排除** | 扫码支付/充值后台 |
| CyPeachHP | 是 | 0 | **写入** | 右键吃蟠桃永久加血上限 |
| CyRedeem | 是 | 3 | **写入** | 材料兑换菜单 |
| CyScavenger | 否 | 0 | **排除** | 村民违规附魔清理，管理工具 |
| CySoulbound | 是 | 7 | **写入** | 灵魂绑定/解绑/列表 |
| CySuperFurnace | 是 | 0 | **写入** | 蹲下右键熔炉，升级面板 |
| CyTop | 是 | 0 | **写入** | 全息排行榜看板，无玩家命令 |
| CyPayApp | — | — | **排除** | Android App，不属于服务器插件 |

---

## 2. 玩家命令总表

> 只列 `opOnly=false` 的玩家命令；管理命令见第 5 节。

| 系统 | 命令 | 作用 | 权限/说明 |
|---|---|---|---|
| 副本 | `/cdm menu` | 打开副本主菜单 | `cydungeonm.use`，默认所有玩家 |
| 副本 | `/cdm enter <副本ID>` | 直接进入指定副本 | `cydungeonm.use`，默认所有玩家 |
| 副本 | `/cdm confirm` | 确认进入副本 | 无独立权限，仅玩家 |
| 副本 | `/cdm leave` | 离开当前副本 | `cydungeonm.use` |
| 副本 | `/cdm top` | 最快通关排行榜 | `cydungeonm.use` |
| 副本 | `/cdm shop [商店ID]` | 打开副本商店 | `cydungeonm.use` |
| 队伍 | `/cdm party` | 打开队伍界面 | `cydungeonm.party`，默认所有玩家 |
| 队伍 | `/cdm party create [队名]` | 创建队伍并成为队长 | `cydungeonm.party` |
| 队伍 | `/cdm party invite <玩家>` | 邀请玩家入队 | `cydungeonm.party` |
| 队伍 | `/cdm party accept` | 接受队伍邀请 | `cydungeonm.party` |
| 队伍 | `/cdm party deny` | 拒绝队伍邀请 | `cydungeonm.party` |
| 队伍 | `/cdm party leave` | 离开队伍 | `cydungeonm.party` |
| 队伍 | `/cdm party kick <玩家>` | 队长踢人 | `cydungeonm.party`，仅队长 |
| 队伍 | `/cdm party transfer <玩家>` | 转让队长 | `cydungeonm.party`，仅队长 |
| 队伍 | `/cdm party disband` | 解散队伍 | `cydungeonm.party`，仅队长 |
| 队伍 | `/cdm party public [on\|off]` | 公开/隐藏队伍 | `cydungeonm.party`，仅队长 |
| 队伍 | `/cdm party approve <玩家>` | 批准入队申请 | `cydungeonm.party`，仅队长 |
| 队伍 | `/cdm party denyapply <玩家>` | 拒绝入队申请 | `cydungeonm.party`，仅队长 |
| 通行证 | `/pass` | 打开通行证主界面 | `cypass.use`，默认所有玩家 |
| 通行证 | `/cypass` | 打开通行证主界面 | `cypass.use`，默认所有玩家 |
| 通行证 | `/cypass quests` | 查看每日/每周任务 | `cypass.use` |
| 通行证 | `/cypass rewards` | 查看等级奖励轨道 | `cypass.use` |
| 通行证 | `/cypass shop` | 通行证商店 | `cypass.use` |
| 通行证 | `/cypass claim` | 一键领取可领奖励 | `cypass.use` |
| 通行证 | `/cypass season` | 查看赛季信息 | `cypass.use` |
| 通行证 | `/cypass info` | 查看自己的等级/经验 | `cypass.use` |
| 通行证 | `/cypass help` | 查看可用命令 | `cypass.use` |
| 兑换 | `/cr` | 打开材料兑换菜单 | `cyredeem.use`，默认所有玩家 |
| 兑换 | `/cr open` | 打开兑换菜单（`/redeem`、`/cyredeem` 同义） | `cyredeem.use` |
| 兑换 | `/cr help` | 查看帮助 | `cyredeem.use` |
| 灵魂绑定 | `/cysoulbound` | 查看帮助 | `cysoulbound.use`，默认所有玩家 |
| 灵魂绑定 | `/cysoulbound bind` | 绑定主手物品 | `cysoulbound.use`，默认收费 10000 金币 |
| 灵魂绑定 | `/cysoulbound unbind` | 解绑主手物品 | `cysoulbound.use` |
| 灵魂绑定 | `/cysoulbound unbind <ID>` | 按编号解绑自己的记录 | `cysoulbound.use` |
| 灵魂绑定 | `/cysoulbound list` | 查看自己的绑定列表 | `cysoulbound.use` |
| 灵魂绑定 | `/cysoulbound list <页码>` | 分页查看绑定列表 | `cysoulbound.use` |
| 领地 | `/res help` | 查看当前服务器 Residence 命令 | 第三方插件，按服内提示为准 |

---

## 3. 按插件整理

### 3.1 CyDungeonM（副本）

- 项目：`E:\CyDungeonM`
- 依赖：QueDP 附属插件（`plugin.yml` 的 `depend: [QueDP]`）
- 玩家可见：是
- 核心内容：副本主菜单、副本列表、进本确认/冷却、队伍系统、副本商店、最快通关排行榜、副本内传送指令锁、队员中途离开判负。
- 玩家命令：见第 2 节“副本/队伍”；管理命令 `wave/operate/kick/reload/info` 已排除。
- 重要规则：
  - 进本需要队长发起，队员在聊天里点“确认进入”或 `/cdm confirm`。
  - 队伍上限默认 10 人；入队申请 60 秒超时。
  - 挑战中有人离开（含掉线），整队判负。
  - 副本内默认拦截 `tp/tpa/home/warp/spawn/back/mv`，用 `/cdm leave` 离开。
  - 商店用金币/点券购买，具体商品和限购以服务器配置为准。
- 来源：`src/main/java/com/cy/dungeonm/command/CdmCommand.java`、`service/*`、`listener/*`、`menu/*.yml`、`shops.yml`。

### 3.2 CyPass（通行证）

- 项目：`E:\CyPass`
- 玩家可见：是
- 核心内容：每日/每周/赛季/副本任务，经验升级，免费/付费奖励轨道，通行证商店，赛季重置。
- 玩家命令：见第 2 节“通行证”；全部管理命令已排除。
- 重要规则：
  - `/pass` 和 `/cypass` 都能打开主界面；如果 `/pass` 被其他插件占用，用 `/cypass`。
  - 任务进度自动统计（签到、在线、移动、挖矿、击杀、合成、钓鱼等）。
  - 奖励分免费档和付费档；付费档在商店用点券/金币购买。
  - 赛季结束后等级/经验/档位/领取记录会重置。
- 来源：`src/main/java/com/chenyu/cypass/command/CyPassCommand.java`、`gui/*`、`reward/ClaimService.java`、`plugin.yml`。

### 3.3 CyRedeem（材料兑换）

- 项目：`E:\CyRedeem`
- 玩家可见：是
- 核心内容：`/cr` 打开兑换菜单，选中物品后把材料放进 14 个材料槽，点击“操作”兑换。
- 玩家命令：`/cr`、`/cr open`、`/cr help`；`/redeem`、`/cyredeem` 为别名。
- 重要规则：
  - 左键“操作”一键从背包放入材料，右键直接兑换。
  - 材料不足红字提示；多余材料留在槽里可连续兑换。
  - 关闭界面材料自动退回背包；背包满时产物掉在脚下。
- 来源：`plugin.yml`、`CrCommand`、`RedeemGui`。

### 3.4 CySoulbound（灵魂绑定）

- 项目：`E:\CySoulbound`
- 玩家可见：是
- 核心内容：把主手物品绑定到自己名下；绑定后不能丢弃、他人不能拾取/使用/装备/合成/附魔/铁砧/砂轮/锻造；死亡不掉落。
- 玩家命令：`/cysoulbound`（别名 `/csl`）的 `bind`、`unbind`、`unbind <ID>`、`list`、`list <页码>`。
- 重要规则：
  - 默认每人最多绑定 1 件，绑定收费 10000 金币（以服务器配置为准）。
  - `list` 里可直接点击按钮解绑。
  - 管理命令 `admin/inspect/reload`、查看他人列表均排除。
- 来源：`plugin.yml`、`CySoulboundCommand`、`BindService`、`ListRenderer`。

### 3.5 CySuperFurnace（超级熔炉）

- 项目：`E:\CySuperFurnace`
- 玩家可见：是
- 核心内容：蹲下 + 空手右键熔炉，打开升级面板；升级“翻倍概率 / 产量倍数 / 熔炼速度”。
- 玩家命令：无（纯 GUI）。
- 重要规则：
  - 若打不开，请管理给 `cysuperfurnace.use` 权限。
  - 费用从金币/点券扣除；满级后按钮会提示。
  - 超级熔炉免疫爆炸，挖掉后等级随物品保留。
  - 输出槽满时自动暂停，取走产物后继续。
- 来源：`plugin.yml`、`CySuperFurnaceCommand`、GUI/升级逻辑。

### 3.6 CyPeachHP（蟠桃血量）

- 项目：`E:\CyPeachHP`
- 玩家可见：是
- 核心内容：右键吃蟠桃，按概率永久提升血量上限；失败也消耗桃子；血条按百分比显示。
- 玩家命令：无（右键吃桃）。
- 重要规则：
  - 默认 50% 概率 +0.5、20% 概率 +2；上限默认 200（以服务器配置为准）。
  - 达到上限后不能继续吃；旧版失效蟠桃会提示联系管理。
- 来源：`plugin.yml`、`CyPeachHP` 配置与食用监听器。

### 3.7 CyExppond（经验挂机池）

- 项目：`E:\CyExppond`
- 玩家可见：是
- 核心内容：走进预圈定的水域池区自动挂机；默认每 5 秒生成经验瓶，或直接给经验；池内显示 ActionBar/BossBar。
- 玩家命令：无（走进去即可）；`/cep help` 等偏管理，不写入。
- 重要规则：
  - 金币/点券/指令奖励默认关闭，是否开启以服务器 `ponds.yml` 为准。
  - 每日 00:00 重置当日金币/点券计数。
  - 部分池可能禁止传送进入，或需要权限；以服务器提示为准。
- 来源：`ponds.yml`、`PondManager`、`RewardManager`、`UiManager`。

### 3.8 CyTop（全息排行榜）

- 项目：`E:\CyTop`
- 玩家可见：是
- 核心内容：主城/大厅的全息排行榜看板，显示金币、点券、在线时长、mcMMO、蟠桃血量等前 10 名；约 60 秒刷新。
- 玩家命令：无（靠近看板即可）。
- 重要规则：
  - 日/周/月榜可能自动发奖；奖励内容以 `reward.yml` 为准。
  - 个别看板可能被管理员关闭；以服务器实际显示为准。
- 来源：`src/main/resources/plugin.yml`、`CommandManager`、全息/排行榜逻辑。

### 3.9 CyEnchantEnhancement（强化）

- 项目：`E:\CyEnchantEnhancement`，服务器版本 2.2.7
- 玩家可见：是；主城菜单 `TrMenu/cd.yml` 的「物品强化」按钮实测指向 `/esystem open`，强化的日志也在持续产生
- 入口：
  - 主城菜单 →「物品强化」
  - `/esystem open`
  - `/cee open`（插件命令别名）
  - `/qhsd`（强化商店）
- 面板：左侧放装备/武器，中间放强化书，右下放保护符（可选），点「确认强化」。
- 强化对象：装备上的附魔等级（如锋利、保护），不是白板攻击力。
- 结果：
  - 成功：对应附魔 +1 级；
  - 失败：无变化、降级或损坏；
  - 保护符：普通 5000 金币，防降级；高级 10000 金币，防降级+损坏；
  - 强化书、保护符一次性消耗，失败也消耗。
- 保底：`pity.enabled=true`，每次失败 +2% 成功率，最多记录 10 次，即最高 +20%。
- 公告：强化到 50 / 100 / 150 级时全服公告。
- 强化商店参考价：昂贵强化书 50000 金币，锋利 0-50，成功率 100%。
- 来源：`plugins/CyEnchantEnhancement/config.yml`、`menus/enhance.yml`、`lang/lang_cn.yml`、`plugins/TrMenu/menus/cd.yml`、`qhsd.yml`、`enhance-*.log`。

### 3.10 TrMenu（服务器菜单）

- 项目：`plugins/TrMenu/menus`
- 玩家入口：主城钟物品，或 `/cd`
- 菜单命令：
  - `/cd`：主菜单
  - `/cs`：传送菜单
  - `/gj`：工具菜单（VIP）
  - `/zz`：购买与赞助
  - `/cj`：抽奖钥匙商店
  - `/qhsd`：强化商店
- 主菜单 `cd.yml` 里的入口：
  - 传送 `/cs`、玩家信息 `/pinfo`、称号仓库 `/plt open`、称号商店 `/plt shop`
  - 工具 `/gj`、系统商城 `/shop`、公共垃圾桶 `/neverlag trash`、夜视开关
  - 玩家地标 `/playerwarp open`、技能面板 `/mcmmoview open`、物品强化 `/esystem open`
  - 购买与赞助 `/zz`、玩家公会 `/plg open`
  - 赛季通行证 `/ap`、每日签到 `/psi signIn`、在线奖励 `/lr`
- 传送菜单 `cs.yml`：主城、主世界、下界、末地、竞技场、练习场、地皮、经验池、资源末地/33世界/资源下界；部分世界支持左键回出生点、右键随机传送。
- 工具菜单 `vip.yml`（绑定 `/gj`）：灵魂背包、复制保护、工作台、末影箱、铁砧、切石机、砂轮、制图台、织布机、锻造台、全球市场、飞行、彩色聊天、发光、通缉令、更多附魔。
- 购买与赞助 `zz.yml`：VIP、大地主、飞行权限、锋利 255、保护 255、不可破坏、地脉震荡、33币充值；价格以菜单为准。
- 抽奖钥匙 `cj.yml`：普通钥匙/玩偶钥匙，1000 金币 1 把、10000 金币 10 把。
- 强化商店 `qhsd.yml`：昂贵强化书、普通/高级保护符。
- 来源：`plugins/TrMenu/menus/cd.yml`、`cs.yml`、`vip.yml`、`zz.yml`、`cj.yml`、`qhsd.yml`、`plugins/TrMenu/settings.yml`。

---

## 4. 不写入主指南的插件（排除清单）

| 插件 | 原因 |
|---|---|
| CyAnvilPunishReset | 铁砧惩罚重置；所有命令默认 OP，未确认给玩家授权 |
| CyDeathpenalty | 死亡惩罚；默认全部关闭，是否在 33生存 开启待实测 |
| CyDriverCore | 技能引擎/库；只有管理/调试命令，无玩家入口 |
| CyPay | 扫码支付/充值后台；全部管理权限 |
| CyScavenger | 村民违规附魔清理；管理工具，玩家无命令 |
| CyPayApp | Android App，不是服务器插件 |
| CoreProtect | `/co`、`/co l`、`/co rollback` 等回档/查询是管理功能 |
| 优化/清理类 | Spark、实体清理、区块限制等属于运维，不是玩法 |

> 如果后续确认 CyAnvilPunishReset 已给玩家授权，或 CyDeathpenalty 已开启，再把对应内容补进第 2、3 节。

---

## 5. 第三方插件

测试服 `plugins` 目录已盘点（77 个 jar）；第三方插件命令结合 `plugin.yml`、配置和官方通用命令整理，具体以服务器实际版本/配置为准。

### 5.1 Residence（领地）

来源：Zrips 官方 Commands 页（`https://www.zrips.net/residence/commands/`）。33生存 的选区工具可能是木斧或木锄，以 `/res tool` 为准。

选区：

- `/res tool`：查看本服选区工具
- `/res select`：用工具或坐标选区
- `/res select chunk`：选中整个区块
- `/res select auto`：自动选区
- `/res select size`：查看选区大小
- `/res select vert`：从天空到基岩
- `/res select expand` / `/res select shift`：扩展/平移选区

创建与管理：

- `/res create <名称>`：创建领地
- `/res subzone <名称>`：创建子领地（需要权限组允许）
- `/res auto`：在脚下自动创建最大允许范围
- `/res confirm`：确认删除等危险操作
- `/res current` / `/res info` / `/res list` / `/res limits` / `/res show`
- `/res expand <数量>` / `/res contract <数量>`
- `/res tp <名称>` / `/res tpset`
- `/res rename <旧> <新>`
- `/res message <领地> <enter/leave> <文本>`
- `/res padd <玩家>` / `/res pdel <玩家>`
- `/res pset <玩家> <flag> <true/false/remove>`
- `/res set <flag> <true/false/remove>`
- `/res flags` / `/res check <领地> <flag>`
- `/res default` / `/res give <领地> <玩家>`
- `/res unstuck` / `/res kick`
- `/res rc` / `/res rc leave`
- `/res remove <名称>`

常用 flag：`build`、`use`、`container`、`move`、`pvp`。实际可用 flag、领地数量/范围/价格、子领地权限以 `/res limits`、`/res help` 和服务器提示为准。
不写入：`/resadmin`、`/res removeall`、`/res setall`、`/res setallfor`、`/resload`、`/resreload` 等管理命令。

### 5.2 地皮（PlotSquared，待确认）

- 33生存 是否使用 PlotSquared、地皮大小/领取数量/合并范围，需要服务器 `plugins` 列表确认；
- 如果 `/plot help` 有输出，常见命令：`/plot auto`、`/plot home`、`/plot list`、`/plot add <玩家>`、`/plot remove <玩家>`、`/plot merge <方向>`、`/plot visit <玩家>`、`/plot info`、`/plot help`；
- 如果不是 PlotSquared，以地皮区告示/菜单为准，不要照抄。

### 5.3 CoreProtect

- `/co`、`/co l`、`/co rollback` 等回档/查询命令不写入玩家指南。

### 5.4 优化/清理类

- 不写入玩家指南。

### 5.5 测试服完整插件（77 jar）

服务器目录：`C:\Users\辰宇\Desktop\测试服\plugins`

- 77 个 jar，100 个配置目录；
- 51 个插件在 `plugin.yml` 中声明了命令，合计 141 条；
- 已生成：
  - `content/server-plugins/inventory.md`：完整 77 插件清单/命令数；
  - `content/server-plugins/commands.txt`：`plugin.yml` 原始命令；
  - `content/server-plugins/plugin-yml/`：每个 jar 的 `plugin.yml` 原文件；
- 重点玩家系统：CMI、AuthMe、Residence、PlotSquared、QuickShop、EconomyShopGUI、SweetPlayerMarket、PlayerGuild、mcMMO、ZenTPA、PlayerWarp、YuRandomTeleport、FotiaCrates、PlayerSignIn、PlayerTitle、SkinsRestorer、CustomFishing、EnchantTransfer、LiuInvite、LiuReward、NotBounties、ArcPass、CyPass、CyDungeonM、CyRedeem、CySoulbound、CySuperFurnace、CyPeachHP、CyExppond、CyTop；
- 无玩家命令但影响玩法：MythicMobs、ExcellentEnchants、CraftEngine、ModelEngine、Citizens/FancyNpcs、TAB、CustomNameplates；
- 管理/优化/回档：CoreProtect、WorldGuard、Multiverse-Core、FastAsyncWorldEdit、Chunky、LagFixer、WarZNeverLag、Spark、PlugManX、Vulcan、LuckPerms 等，不写入玩家指南。

玩家命令总表已并入 `/guide` 的「常用指令」分类（标签切换）；搜索索引在 `src/data/guide-search.ts`。

---

## 6. 待核实清单

- [ ] Residence 实际选区工具、命令、flag、大小/数量/费用限制；
- [ ] PlotSquared 地皮大小/领取数量/合并范围；
- [ ] CMI 部分命令是否被服务器禁用或改名（以 `/cmi`、`/help` 为准）；
- [ ] QuickShop / EconomyShopGUI / SweetPlayerMarket 的实际权限与税率；
- [ ] mcMMO / PlayerGuild / ArcPass 的实际权限组；
- [ ] CyDeathpenalty 是否在 33生存 开启，以及具体扣罚数值；
- [ ] CyAnvilPunishReset 是否已给玩家发权限；
- [ ] CyExppond 的金币/点券奖励是否开启；
- [ ] CyTop 的奖励配置与看板位置；
- [ ] 所有命令在服务器内实测一次，确认没有被其他插件改名/拦截。

---

## 7. 重铸说明

- 最终 `/guide` 页面按“进服 → 领地 → 地皮 → 强化 → 副本 → 通行证 → 兑换 → 灵魂绑定 → 超级熔炉 → 蟠桃 → 挂机池 → 排行榜 → FAQ”组织；
- `/guide` 的「常用指令」区按账号、基础、传送、经济、商店、技能、公会、福利、外观分类切换，常用放最前；
- 命令表只保留第 2 节的玩家命令；
- 每个玩法写“怎么参与 + 关键规则 + 注意事项”，不要写内部实现；
- 页面里的“默认数值”统一加“以服务器配置为准”；
- 本文件保持为唯一资料源，后续插件更新时先改这里，再重铸页面。

---

## 8. 分析来源（摘要）

- CyDungeonM：`CdmCommand.java`、`PartyService.java`、`DungeonEntryService.java`、`MenuManager.java`、`menus/*.yml`；
- CyPass：`CyPassCommand.java`、`QuestMenu.java`、`RewardMenu.java`、`ShopBuyMenu.java`、`plugin.yml`；
- CyRedeem：`CrCommand.java`、`RedeemGui.java`、`plugin.yml`；
- CySoulbound：`CySoulboundCommand.java`、`BindService.java`、`ListRenderer.java`、`plugin.yml`；
- CySuperFurnace：`CySuperFurnaceCommand.java`、GUI/升级逻辑、`plugin.yml`；
- CyPeachHP：`CyPeachHP` 主类、食用监听器、`plugin.yml`；
- CyExppond：`PondManager.java`、`RewardManager.java`、`UiManager.java`、`ponds.yml`；
- CyTop：`CommandManager`、全息/排行榜逻辑、`src/main/resources/plugin.yml`；
- CyEnchantEnhancement：`plugin.yml`、`config.yml`、`menus/enhance.yml`、`lang/lang_cn.yml`、`TrMenu/cd.yml`、`qhsd.yml`；
- 排除项：`CyAnvilPunishReset`、`CyDeathpenalty`、`CyDriverCore`、`CyPay`、`CyScavenger` 的 `plugin.yml`/命令执行器。
