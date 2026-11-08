# xiangyv.me — GitHub Pages 部署说明

## 当前状态

- 首页、论文和项目子页面已支持静态 HTML 导出，保留原有排版、动图和视频。
- `pnpm build:pages` 生成 `out/`，检查内部资源与页面链接，并去除未引用素材的生成副本。
- 原始 PPT、PDF 和本地临时目录不属于网站发布包。
- `public/.gitignore` 根据实际页面引用生成素材白名单；未使用的本地素材不会被普通 Git 提交加入仓库。不要强制添加这些文件。
- GitHub 自动部署配置在 `.github/workflows/pages.yml`。
- 公开仓库为 [XaYvvv/XaYvvv.github.io](https://github.com/XaYvvv/XaYvvv.github.io)。2026-11-08 实测 `https://xiangyv.me/` 返回 HTTP 200，标题为 `XIANG Yu`；本次未登录 DNS 或 Pages 设置后台核对当前记录。
- 以下“首次关联”和“绑定域名”用于重新搭建或故障排查，现有站点不需要重新执行。部署进度查看仓库 Actions。
- Node.js 22、pnpm 10.11.0；锁定依赖安装后先运行 `pnpm test`，再运行 `pnpm build:pages`。Pull Request 只运行检查，`main` 推送或手动工作流才部署。

## 首次关联 GitHub

1. 确认 GitHub 用户名及仓库。推荐使用 `用户名.github.io` 仓库，这样自定义域名生效前也能从根路径预览。若已存在此仓库，先检查现有内容，不能覆盖其他网站。
2. 免费个人账号通常使用公开仓库部署 Pages。公开仓库会公开所提交的源码和素材；如果需要私有源码，应先确认账户套餐支持从私有仓库发布 Pages。
3. 在本机完成 GitHub 登录；不要将密码或访问令牌写入代码、README 或聊天消息。
4. 网站仓库应以 `xiangyu-personal-site/` 为根目录，不要上传上一层的缓存、临时文件和其他文档。
5. 先运行 `pnpm build:pages`，再审查并提交源码及白名单素材。不要提交 `node_modules/`、`out/`、`.next/`、`.next-pages/`、`dist/`、`.env*` 等。
6. 推送至目标仓库的 `main` 分支。
7. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
8. 在 Actions 中启动或重新运行 **Deploy personal website to GitHub Pages**，等待构建与部署两个任务均成功。

当前页面资源使用根路径（例如 `/research/...`），适用于 `用户名.github.io` 用户站点或已绑定的 `xiangyv.me`。不要直接用未绑定域名的 `用户名.github.io/普通仓库名/` 地址判断网站是否正常；若必须使用这种子路径，需要额外适配所有资源和链接。

## 绑定 xiangyv.me

先在 GitHub 账号 **Settings → Pages** 验证域名所有权，按后台提供的 TXT 名称和值在阿里云添加记录。TXT 值与账号关联，不能预先猜测。

随后在网站仓库 **Settings → Pages → Custom domain** 填写 `xiangyv.me` 并保存。GitHub Actions 部署不靠 `CNAME` 文件启用域名；必须设置这里的 Custom domain。导出目录中的 `CNAME` 仅作为域名记录及兼容备用部署方式。

在阿里云域名解析中，保留 `dns1.hichina.com`、`dns2.hichina.com`，添加以下记录：

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `xayvvv.github.io` |

`www` 的值不加 `https://`，不加仓库名。先核对同名现有记录，只处理冲突的网站记录；保留邮箱的 MX/TXT 等无关记录，不添加通配符 `*`。

等待 GitHub 的 DNS 检查及证书签发完成后，勾选 **Enforce HTTPS**，检查首页、所有项目链接，以及 `www.xiangyv.me` 到主域名的跳转。DNS 和证书可能需要最多约 24 小时。

## 以后如何更新

1. 修改 `app/` 里的文字、项目内容，或在 `public/` 增加素材并引用。
2. 运行 `pnpm dev:pages` 查看本地效果（原有 `pnpm dev` 的 Vinext 方式仍保留）。
3. 运行 `pnpm test` 和 `pnpm build:pages`，检查链接、锚点和素材并刷新白名单。
4. 查看 Git 变更和被跟踪的素材，用户确认上线后提交并推送 `main`。
5. 等待 Actions 部署成功，正式域名不需要重复配置。

GitHub Pages 不需要持续运行 Node 服务器。当前页面使用优化后的媒体；原始大视频可能仍保存在本地和源码历史中，不代表会进入 `out/`。构建会检查单文件及总包大小。不要使用 Git LFS 来直接托管 Pages 素材。

### 回退版本

若某次发布出现问题，先在仓库提交记录中找到出问题的改动，用 `git revert <提交号>` 创建可审查的回退提交，本地完成测试和静态构建后，再按确认上线流程推送 `main`。不要重写远端历史。回退后核对首页、九个项目路由、图片和视频；域名无需重复绑定。

## 官方参考

- [Next.js 静态导出](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [域名绑定及 DNS 记录](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [验证域名所有权](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Pages 额度](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
