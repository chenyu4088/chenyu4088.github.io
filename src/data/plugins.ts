export type PluginLicense = '免费' | '付费' | '待定';

export interface PluginInfo {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights?: string[];
  license: PluginLicense;
  version: string;
  category: '玩法' | '系统' | '管理';
  cores: string[];
  featured?: boolean;
  updatedAt: string;
}

/**
 * 33生存自研插件清单。
 * 付费/免费目前没有定价来源，先标“待定”；确认后改这里即可。
 * 支持核心按项目构建依赖填写：全部 compileOnly paper-api 1.21.11。
 */
export const plugins: PluginInfo[] = [
  {
    slug: 'cypay',
    name: 'CyPay',
    tagline: '扫码支付与充值后台',
    description:
      '服务端充值系统：扫码下单、金额尾数、支付回调、充值礼包和到账展示，适合做赞助与点券充值。',
    highlights: ['0 手续费', '无二次收费'],
    license: '付费',
    version: '1.6.8',
    category: '系统',
    cores: ['Paper 1.21.11'],
    featured: true,
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cypass',
    name: 'CyPass',
    tagline: '赛季通行证系统',
    description:
      '任务、等级、免费/付费奖励轨、通行证商店、赛季重置和进度查询，适合做长期成长线。',
    license: '付费',
    version: '1.1.12',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    featured: true,
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cyredeem',
    name: 'CyRedeem',
    tagline: '材料兑换菜单',
    description:
      '把材料兑换成产物的 GUI：支持多兑换项、材料槽、分页、权限和后台管理。',
    license: '免费',
    version: '1.4.6',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    featured: false,
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cyenchantenhancement',
    name: 'CyEnchantEnhancement',
    tagline: '附魔强化与保底',
    description:
      '强化面板：强化书、保护符、失败降级/损坏、连续失败保底和高等级全服公告。',
    license: '付费',
    version: '2.2.7',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    featured: false,
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cydungeonm',
    name: 'CyDungeonM',
    tagline: 'QueDP 附属 · 副本与队伍',
    description:
      'QueDP 的副本附属插件，依赖 QueDP 运行：提供副本菜单、组队、确认进入、离开、通关排行榜和副本商店，支持多副本与冷却。',
    license: '免费',
    version: '1.0.34',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cysoulbound',
    name: 'CySoulbound',
    tagline: '灵魂绑定',
    description:
      '绑定物品不可丢弃、不可被他人拾取/使用/装备/合成，支持付费绑定、解绑和绑定列表。',
    license: '免费',
    version: '1.1.3',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-22',
  },
  {
    slug: 'cysuperfurnace',
    name: 'CySuperFurnace',
    tagline: '超级熔炉升级',
    description:
      '蹲下右键熔炉打开升级面板，提升翻倍概率、产量倍数和熔炼速度，支持金币/点券。',
    license: '付费',
    version: '1.1.0',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-20',
  },
  {
    slug: 'cydrivercore',
    name: 'CyDriverCore',
    tagline: '技能、条件与动作引擎',
    description:
      '给其他插件提供触发器、条件、技能、物品、世界限制和脚本能力，是自定义玩法的底层引擎。',
    license: '付费',
    version: '1.10.13',
    category: '系统',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-12',
  },
  {
    slug: 'cypeachhp',
    name: 'CyPeachHP',
    tagline: '蟠桃提升血量上限',
    description:
      '右键吃蟠桃，按概率永久提升血量上限，带失败消耗和上限控制，适合做长期收集。',
    license: '付费',
    version: '2.2.1',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-11',
  },
  {
    slug: 'cydeathpenalty',
    name: 'CyDeathpenalty',
    tagline: '死亡惩罚',
    description:
      '死亡后按配置扣除金币、点券或经验，可设置世界、权限和豁免规则。',
    license: '免费',
    version: '2.0.0',
    category: '管理',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-08',
  },
  {
    slug: 'cyscavenger',
    name: 'CyScavenger',
    tagline: '违规附魔清理',
    description:
      '清理村民违规附魔、修复异常附魔显示，处理 ExcellentEnchants 相关残留问题。',
    license: '免费',
    version: '2.0.0',
    category: '管理',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-08',
  },
  {
    slug: 'cyanvilpunishreset',
    name: 'CyAnvilPunishReset',
    tagline: '铁砧惩罚重置',
    description:
      '付费清零铁砧惩罚次数，支持费用、权限和提示配置，适合作为惩罚减负入口。',
    license: '免费',
    version: '2.0.0',
    category: '管理',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-08',
  },
  {
    slug: 'cyexppond',
    name: 'CyExppond',
    tagline: '经验挂机池',
    description:
      '走进指定水池自动计时产出经验，可配置金币/点券奖励、池子范围与挂机限制。',
    license: '免费',
    version: '4.0.0',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-02',
  },
  {
    slug: 'cytop',
    name: 'CyTop',
    tagline: '全息排行榜',
    description:
      '金币、点券、在线时长、mcMMO、蟠桃血量等多榜单全息展示，支持定时刷新。',
    license: '免费',
    version: '1.2.2',
    category: '玩法',
    cores: ['Paper 1.21.11'],
    updatedAt: '2026-10-02',
  },
];

export const featuredPlugins = plugins.filter((plugin) => plugin.featured);
