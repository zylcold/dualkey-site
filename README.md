# 双键 · DualKey

双键的产品网站、使用支持与隐私政策。App 源码不在本仓库发布。

- [官网](https://zylcold.github.io/dualkey-site/)
- [App Store](https://apps.apple.com/cn/app/id6803302251)
- [使用支持](https://zylcold.github.io/dualkey-site/support.html)
- [隐私政策](https://zylcold.github.io/dualkey-site/privacy.html) / [Markdown 版本](./PRIVACY.md)
- [版本更新记录](./CHANGELOG.md)

## 产品

双键是一款以日常输入为核心的 iOS 双拼键盘，支持小鹤、微软与搜狗双拼。键位提示、个性皮肤、单手模式和离线候选服务日常输入；引导练习、长文跟打及双拼打砖块帮助熟悉键位。

键盘核心输入、候选与触感在设备上完成，无需为日常输入开启「完全访问」。可选系统键盘音受 iOS 权限限制。主 App 主动提交反馈、购买与恢复购买可能联网；具体数据范围见隐私政策。

## 网站结构

网站使用静态 HTML、CSS 和 JavaScript，不需要安装依赖或构建。

- `site/index.html`：产品介绍、双拼演示、皮肤切换及视频。
- `site/privacy.html`：隐私政策。
- `site/support.html`：使用指南、常见问题及联系方式。
- `site/style.css` / `site/documents.css`：共享视觉、响应式与文档样式。
- `site/script.js`：首页交互。
- `site/assets/`：图片、图标与宣传视频。

所有站内资源使用相对路径，同时兼容 GitHub Pages 的 `/dualkey-site/` 子路径与独立站点根路径。保留原有隐私和支持页面 URL。

本地预览：

```sh
python3 -m http.server 8000 --directory site
```

打开 `http://localhost:8000`。修改脚本后可运行 `node --check site/script.js`；提交前运行 `git diff --check`。浏览器检查应覆盖手机与桌面布局、图片比例、五套皮肤、双拼演示、视频关闭暂停、启用指南及两个文档页。

## 发布

现有 GitHub Actions 工作流在 `main` 分支的 `site/` 发生变化后发布 GitHub Pages。PR 本身不会更新正式官网；审阅并合并后才会触发发布。

## 支持

- App 内：设置 → 改进建议，可选择附图和诊断日志。
- 使用问题：support@dualkey.app
- 隐私请求：privacy@dualkey.app
- [GitHub Issues](https://github.com/zylcold/dualkey-site/issues) 为公开渠道，请勿提交敏感信息。

## 内容与许可

本仓库文档版权归作者所有。App 为闭源软件。产品图与视频使用开发者提供的界面截图，以及本次设计生成的宣传元素；皮肤展示中的名称用于描述视觉风格。App 内 AOSP 来源离线词库的许可见应用内声明。
