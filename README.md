# 33生存官网

Minecraft Java 版 1.21.11 生存服务器 **33生存** 的官网。Astro 纯静态站，含服务器首页、游玩指南、插件模块、明暗主题切换和服务器状态。

## 页面

- `/`：服务器首页，只介绍服务器，不混入插件内容；
- `/guide`：游玩指南，地址、版本、三步进服和常见问题；
- `/plugins`：14 个自研插件展示，顶部最新插件轮播，下面全部插件卡片；
- `/docs`：14 个插件的文档入口，每个插件一个单页；
- `/download`：启动器下载，提供 QQ 群文件、夸克网盘、百度网盘、直链四种方式（群号 `1049661762`）。

导航固定为：**首页 / 游玩指南 / 下载启动器 / 获取插件 / 深色开关 / 加入服务器**。

游玩指南使用左侧固定目录 + 顶部搜索（`Ctrl K`），指令分类也在左侧目录；移动端目录收成抽屉。启动器下载推荐 QQ 群文件，网站只放说明和校验值。

## 本地开发

需要 Node.js 20+ 和 pnpm。

```bash
pnpm install
pnpm dev
```

默认地址：`http://localhost:4321/`

构建：

```bash
pnpm build
```

产物在 `dist/`，可以直接上传到任何静态托管：阿里云 Nginx、GitHub Pages、Cloudflare Pages 等。

## 改内容

- `src/data/site.ts`：服务器名、域名、版本、首页特色、FAQ；
- `src/pages/index.astro`：服务器首页；
- `src/pages/guide.astro`：游玩指南；
- `src/pages/plugins.astro`：插件模块入口；
- `src/pages/download.astro`：启动器下载说明；
- `src/pages/docs/index.astro`：插件文档入口；
- `src/content/docs/`：插件文档的 Markdown 唯一来源；`/docs/<slug>` 由内容集合自动生成；
- `content/guide-research.md`：游玩指南的**资料源**，记录插件、玩家命令、玩法、排除项，重铸指南时以它为准；
- `src/data/guide-search.ts`：搜索框的隐藏索引，记录插件名、别名、命令和关键词，不在页面上直接显示；
- `content/server-plugins/`：测试服 77 个 jar 的插件清单、`plugin.yml` 和命令原始数据；
- `src/styles/global.css`：颜色、布局、响应式；
- `public/`：favicon、robots.txt、以后的截图/logo。

主题默认深色，导航里的「深色」开关可切换浅色；选择会存到浏览器 `localStorage`。调试浅色可以直接访问 `/?theme=light`。

配色以绿色为主：深色主题主色 `#34D399`，浅色主题 `#059669`，点缀 `#4ADE80`。

## 待补

- [x] 游玩指南：已按 `content/guide-research.md` 生成初版，排除 OP/优化/回档；上线前需在服务器内实测命令；
- [x] 插件列表：已按 14 个插件做成轮播 + 全部插件卡片；
- [x] 14 个插件文档：Markdown 源 + 自动渲染，每个插件根目录有 `插件使用说明.md` 和 `更新日志.md`；
- [ ] 文档内容复核：上线前按最新构建逐项核对命令/权限/默认值；
- [ ] 游戏截图/GIF：3～5 张，放到 `public/` 后加截图区；
- [x] QQ 群已加入首页/页脚/指南/下载页：`1049661762`，加群链接 `https://qm.qq.com/q/LWOdT4DDuU`；
- [x] 测试服插件盘点：77 个 jar、100 个配置目录，已生成插件清单，并在指南内做「常用指令」分类；
- [ ] 指令实测：上线前在服务器内逐条确认 `/res`、`/plot`、`/shop`、`/qs`、`/pm`、`/guild` 等；
- [ ] GitHub / 邮箱待补；
- [ ] 启动器文件：补夸克/百度分享链接和直链，替换 `/download` 的“待补/暂未开放”；
- [ ] 如果走大陆备案，在页脚加 ICP 备案号并链接到工信部；
- [ ] 部署域名：当前 `astro.config.mjs` 的 `site` 是 `https://mc33.top`。

## 部署注意

站点按**域名根路径**部署（`https://mc33.top/`）。如果部署到 GitHub Pages 的项目路径（`https://用户名.github.io/仓库名/`），需要在 `astro.config.mjs` 里设置 `base: '/仓库名'`，并把站内绝对链接改成带 base 的路径；更推荐直接绑自定义域名 `mc33.top`。

GitHub Pages 免费方案：

- 文档 Markdown 在构建时转 HTML，GitHub Pages 只托管静态 `dist/`，不需要数据库或 Node 运行时；
- 仓库已带 `.github/workflows/deploy.yml`，推送 `main` 后自动 `pnpm install` + `pnpm build` + 部署 Pages；
- `public/.nojekyll` 已加，避免 Jekyll 处理 `_astro`；
- 如果仓库根目录不是本站项目，需要把 workflow 的 `working-directory` 和 `path` 改到 `mc33-site`；
- 绑定 `mc33.top` 后，在 GitHub Pages 设置自定义域名并配置 DNS；

## 技术

- Astro 7，纯静态输出，无数据库；
- 无外部字体/图片依赖；
- 服务器状态由前端请求 `mcstatus.io`，失败时显示“状态未知”；
- 深浅色通过 CSS 变量切换。
