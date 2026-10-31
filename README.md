# 项宇个人网站：修改与上线说明

网站的可编辑源码和引用素材都保存在这个文件夹中：

`C:\Users\AlvinX\Documents\ChatGPT\web搭建学习\xiangyu-personal-site`

本地预览：http://localhost:3000/

这是 React / TypeScript 网站项目，本地使用 Vinext 运行，GitHub Pages 使用 Next.js 静态导出。请用编辑器打开整个文件夹，通过开发服务器预览；不要直接双击 TSX 文件当作 HTML 打开。

## 常用修改位置

| 想修改什么 | 文件 |
| --- | --- |
| 首页简介、邮件、论文列表 | `app/page.tsx` |
| 教育和团队时间线、Logo 引用 | `app/timeline.tsx` |
| 项目名称、摘要、经历、成果和封面地址 | `app/project-data.ts` |
| 首页 Projects 列表排版 | `app/projects.tsx` |
| 动态封面播放方式 | `app/animated-project-cover.tsx` |
| 每个项目子页面的结构 | `app/projects/[slug]/page.tsx` |
| 子页面素材分组、图注和顺序 | `app/project-sections.ts` |
| 子页面素材展示组件 | `app/project-evidence.tsx` |
| 提取素材的编号、路径索引 | `app/presentation-materials.json` |
| 全站字体、颜色、尺寸、手机布局 | `app/globals.css` |
| 本地字体定义与文件 | `app/fonts.css`、`public/fonts/` |
| 网页标题和描述 | `app/layout.tsx` |
| 图片、视频和 Logo 文件 | `public/` |
| 素材来源及内容整理记录 | `PROJECT_SOURCES.md` |

例如把图片放到 `public/research/covers/example.webp`，网页中引用的地址就是 `/research/covers/example.webp`，不需要写本机的 C 盘路径。

Projects 封面和项目演示采用网页压缩版视频。`app/deferred-video.tsx` 先显示封面图，在视频接近可视区域时才下载并静音循环播放，离开画面或切换到后台时暂停；没有额外播放按钮。请保留 `data-src`，静态发布脚本据此检查并保留延迟加载的视频文件。

网页压缩素材在 `public/research/optimized/`。赛车照片和腰部机构参考图使用较小的 WebP 展示，点击仍可查看原图。需要重新生成时，安装 Pillow、准备 FFmpeg 后运行 `python scripts/optimize-media.py --ffmpeg <FFmpeg路径>`；生成后运行 `pnpm build:pages` 更新素材白名单。压缩文件已随源码保存，GitHub 构建不需要安装这些媒体工具。

字体采用 Source Serif 4（英文标题）、思源宋体 Noto Serif SC（中文标题）和 Inter（英文正文、界面）；中文正文使用设备上的苹方或微软雅黑。字号和字体组合统一在 `app/globals.css` 顶部调整。字体文件在本地托管，按字符范围加载，不依赖 Google Fonts 在线服务；授权说明随发布包保存在 `public/fonts/LICENSES.txt`，更新字体时请保留。

## 在自己的电脑上启动

准备 Node.js 22.13 或更高版本，以及 pnpm。打开终端并进入本项目文件夹：

```powershell
cd 'C:\Users\AlvinX\Documents\ChatGPT\web搭建学习\xiangyu-personal-site'
pnpm install --frozen-lockfile
pnpm dev
```

终端会打印本地访问地址。修改 `app/` 后保存，开发页面通常会自动更新；页面长时间未更新时手动刷新。结束本地开发时，在运行服务器的终端按 Ctrl+C。

生成 GitHub Pages 发布版本：

```powershell
pnpm build:pages
```

结果在 `out/`。脚本会检查内部链接、排除未引用素材，并更新 `public/.gitignore`，避免将撤下的图片和证书上传仓库。新增图片并在页面引用后，请先运行 `pnpm build:pages` 再提交 Git。

优先修改 `app/` 和 `public/`，不要在生成的 `out/` 或 `dist/` 中修改内容，否则下次构建会覆盖。原有 `pnpm build` 仍保留 Vinext 构建方式，不用于 GitHub Pages。

备份或迁移时保留 `app/`、`public/`、配置文件、`package.json`、`pnpm-lock.yaml` 和来源说明。`node_modules/`、`dist/`、`.next/`、`.vinext/`、`.wrangler/` 可以由工具重新生成。隐藏的 `.openai/hosting.json` 是现有项目配置的一部分，保留在本地工程中即可。不要公开账号凭据或 `.env` 文件。

## GitHub Pages 上线

域名 `xiangyv.me` 已购买，DNS 目前由阿里云管理。无需改成 Cloudflare DNS，也不需要租服务器。

已准备 `.github/workflows/pages.yml`：推送到 `main` 后自动构建、检查并发布 `out/`。初次配置、阿里云解析记录和后续更新步骤见 [GITHUB_PAGES.md](GITHUB_PAGES.md)。

公开源码仓库：[XaYvvv/XaYvvv.github.io](https://github.com/XaYvvv/XaYvvv.github.io)。发布进度可在仓库 Actions 查看；域名解析与首次接入步骤见上方说明。
