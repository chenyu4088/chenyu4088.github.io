---
pluginName: CyPay
slug: cypay
version: 1.6.8
license: 付费
cores: Paper 1.21.11
summary: 扫码支付与充值后台：固定收款码地图、回调到账、累充奖励、记录和排行榜。
---

## 简介

CyPay 是服务器扫码支付/充值插件。玩家在游戏内下单，用微信或支付宝扫码支付；安卓监听 App 把到账结果回调给服务器，插件按配置发放点券或执行命令。

**亮点**

- **0 手续费**：插件不额外抽成
- **无二次收费**：获取后不再收取插件使用费

**核心功能**

- 微信/支付宝固定收款码地图
- `/cp point` 下单，超时自动取消
- 回调到账、密钥校验、IP 白名单
- 累充奖励界面与领取记录
- 充值记录、全服记录、充值排行榜
- 黑名单、限流、未支付订单限制
- PlaceholderAPI 变量

## 支持环境

| 项目 | 要求 |
|---|---|
| 服务端 | Paper 1.21.11 |
| Java | Java 21 |
| 数据库 | SQLite |
| 软依赖 | CraftEngine、PlaceholderAPI |
| 外部 | 安卓监听 App（回调到 `callback.port`） |

## 安装

1. 把 `CyPay-1.6.8.jar` 放进 `plugins/`。
2. 重启服务器，生成 `config.yml`、`messages.yml`、`reward.yml` 和 `gui/`。
3. 在 `config.yml` 填 `qrcodes.wechat` / `qrcodes.alipay` 收款链接。
4. 设置 `callback.port` 和 `callback.key`，在防火墙/安全组放行端口。
5. 在安卓监听 App 填相同端口和密钥。
6. 执行 `/cp reload` 生成/更新收款码地图。

## 玩家命令

| 命令 | 作用 |
|---|---|
| `/cp` / `/cp help` | 帮助 |
| `/cp point <金额> [wechat\|alipay]` | 创建充值订单，打开对应收款码 |
| `/cp log [状态] [页码]` | 查看自己的充值记录 |
| `/cp top [页码]` | 充值排行榜 |
| `/cp reward` | 打开累充奖励界面 |
| `/cp reward log [页码]` | 查看自己的累充领取记录 |

状态可选：`all`、`success`、`expired`、`cancelled`、`interrupted`。

## 管理命令

需要 `cypay.admin` 或对应子权限。

| 命令 | 作用 |
|---|---|
| `/cp open <wechat\|alipay>` | 打开收款码地图（调试） |
| `/cp logs [状态] [页码]` | 查看全服充值记录 |
| `/cp consume add\|take\|set <玩家> <金额>` | 调整玩家累充额度 |
| `/cp payments [页码]` | 查看订单 |
| `/cp payments del <编号>` | 删除订单 |
| `/cp payments clear` | 清空订单 |
| `/cp fix <玩家> <编号>` | 手动补单 |
| `/cp blacklist add\|remove <IP>` | 管理 IP 黑名单 |
| `/cp ip` | 查看当前回调 IP 信息 |
| `/cp testpay <金额> [渠道]` | 测试支付流程 |
| `/cp reload [reward]` | 重载配置；带 `reward` 只重载累充 |

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `cypay.point` | OP | 玩家充值下单 |
| `cypay.open` | OP | 打开收款码地图 |
| `cypay.log` | OP | 查看自己的充值记录 |
| `cypay.log.others` | OP | 查看任意玩家/全服记录 |
| `cypay.top` | OP | 查看充值排行榜 |
| `cypay.reward` | OP | 累充奖励界面/领取记录 |
| `cypay.reward.logs` | OP | 查看全服累充领取记录 |
| `cypay.consume` | OP | 管理累充额度 |
| `cypay.reload` | OP | 重载配置 |
| `cypay.admin` | OP | 管理总权限 |

## 配置

### 收款码

```yaml
qrcodes:
  wechat: ""    # wxp:// 开头
  alipay: ""    # https://qr.alipay.com/ 开头
```

留空表示不生成对应渠道地图。更换链接后执行 `/cp reload`，地图 ID 不变。

### 充值

```yaml
point:
  enabled: true
  timeout: 60
  grace: 30
  min: 1
  max: 1000
  rate: 10
  commands:
    - "points give %player% %points%"
```

| 字段 | 说明 |
|---|---|
| `timeout` | 订单有效期（秒） |
| `grace` | 到账通知宽限（秒） |
| `min` / `max` | 单笔金额范围 |
| `rate` | 每 1 元兑换的点券数 |
| `commands` | 支付成功后控制台执行的命令 |

命令占位符：`%player%`、`%points%`、`%amount%`、`%total%`。

### 回调

```yaml
callback:
  port: 19999
  key: "change-me"
```

`key` 必须与监听 App 一致；端口需要在防火墙放行。

### 安全

```yaml
security:
  whitelist:
    enabled: false
    ips:
      - "127.0.0.1"
  blacklist:
    enabled: true
    window: 600
    max-failures: 5
  order-abuse:
    enabled: true
    window: 300
    max-unpaid: 3
    ban-duration: 1800
  rate-limit:
    per-minute: 60
```

### 累充奖励

`reward.yml`：

```yaml
order: [pack_100, pack_500]
rewards:
  pack_100:
    need: 100
    icon: "CE:33_custom:xxx"
    name: "&b&l100 元礼包"
    lore: ["&7...", "{status}"]
    commands:
      - "cee book give zhenxi 10 %player% 1"
```

`need` 是累计充值门槛；`{status}` 会自动替换为领取状态；每个奖励每人只能领一次。

## 变量与 API

PlaceholderAPI 标识符：`cypay`

| 变量 | 含义 |
|---|---|
| `%cypay_total%` | 玩家累计充值金额 |

当前版本没有公开 Java API。

## 常见问题

### 扫码后没有到账？

检查监听 App 是否收到通知、`callback.port` 是否放行、`callback.key` 是否一致；用 `/cp testpay` 先测本地流程。

### 收款码地图没生成？

`qrcodes` 对应渠道留空时不会生成；填好后执行 `/cp reload`，再重启客户端资源包/地图。

### 玩家下单后不付款会怎样？

订单超时自动取消；`order-abuse` 会限制频繁开单不付款的玩家。

### 回调密钥错误会怎样？

`security.blacklist` 默认开启，窗口内错误达到 `max-failures` 会拉黑 IP；用 `/cp blacklist remove <IP>` 解除。

### 如何补单？

用 `/cp payments` 找到订单编号，再执行 `/cp fix <玩家> <编号>`；先确认订单确实已支付。

## 更新日志

按时间倒序，最新的在最上面。当前版本是 `1.6.8`。

### 1.6.8（2026-10-22 · 当前版本）

- 当前构建版本；完整记录见项目根目录 `更新日志.md`。

### 1.4.0（2026-10-22）

- 新增累充奖励系统：`/cp reward`、`/cp reward log`、`/cp reload reward`。
- 新增 `reward.yml` 和 `gui/reward.yml`。
- 新增 `reward_claims` 数据表，每个奖励每人只能领一次。
