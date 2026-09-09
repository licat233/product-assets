# Product Assets 产品资产库

[English](./README.en.md) · [ChatGPT 使用说明](./docs/CHATGPT-USAGE.zh-CN.md) · [产品目录规范](./docs/PRODUCT-DIRECTORY-SPEC.md)

这是一个面向 **ChatGPT / DetailFlow / Codex** 的产品资料仓库。

目标很简单：把每款产品的说明书、规格资料、真实图片和结构化产品事实保存成一套长期可复用的 **Product Source of Truth**，让新的 ChatGPT 会话不需要反复重新上传同一套资料。

> 这个项目的原则是减少工作量，不把文件管理工作转嫁给用户。

---

## 1. 一款产品 = 一个独立目录

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
│   ├── user-manual.pdf
│   ├── datasheet.pdf
│   └── ...
└── images/
    ├── hero-01.jpg
    ├── front-view.jpg
    ├── rear-view.jpg
    └── ...
```

其中：

- `product.md`：给人和 ChatGPT 读的产品事实摘要、证据说明和 Do-not-claim 信息。
- `manifest.yaml`：给程序和 ChatGPT 使用的机器可读文件索引，**由脚本自动生成，不需要人工编辑**。
- `docs/`：说明书、Datasheet、安装说明、测试报告、认证资料等原始证据。
- `images/`：真实产品参考图和产品参考视频。

精确技术参数应以原始说明书 / Datasheet 为准，`product.md` 不能替代原始证据。

---

## 2. 你真正需要做什么

日常新增产品时，你只需要处理三件事：

```text
1. 创建产品目录
2. 把原始资料放进 docs/ 和 images/
3. 整理 / 确认 product.md
```

`manifest.yaml` 的文件清单、URL、媒体类型等由脚本自动扫描生成。

### 第一步：创建产品

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

例如：

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

脚本会创建：

```text
products/led-sensor-light/
├── product.md
├── manifest.yaml
├── docs/
└── images/
```

### 第二步：放入真实资料

说明书、规格书等放到：

```text
products/led-sensor-light/docs/
```

真实产品图 / 产品参考视频放到：

```text
products/led-sensor-light/images/
```

### 第三步：同步 manifest

**不要手工编辑 `manifest.yaml`。**

运行：

```bash
bash scripts/sync-manifest.sh led-sensor-light
```

它会自动扫描真实目录并生成：

- 文档清单
- 图片 / 视频清单
- 文件类型
- GitHub 原始文件 URL
- `assets.licat.xyz` 的文档 / 图片 / 视频公开 URL
- DetailFlow 默认规则

如果同时修改了多款产品，可以直接运行：

```bash
bash scripts/sync-manifest.sh
```

如果由 Codex / Agent 负责入库，`AGENTS.md` 已要求 Agent 在提交前自动运行同步，因此**用户不应该被要求手工维护 YAML**。

---

## 3. assets.licat.xyz：静态产品文件浏览器

Cloudflare Pages 会根据仓库内容自动生成：

```text
https://assets.licat.xyz/
```

首页显示产品列表；点击产品后可以看到两类文件：

```text
Source documents
→ docs/ 中的 PDF、规格书、尺寸图等原始资料

Visual references
→ images/ 中的真实产品图片和参考视频
```

例如：

```text
https://assets.licat.xyz/products/<product-slug>/
```

机器可读索引：

```text
https://assets.licat.xyz/catalog.json
```

### 为什么现在 docs 也发布到 assets.licat.xyz？

这个 GitHub 仓库本身就是 Public，所以 `docs/` 中提交的说明书 / Datasheet 本来已经可以从 GitHub 公开读取。

把同一份二进制文件发布到 `assets.licat.xyz` 的目的不是改变隐私级别，而是给 ChatGPT 一个**稳定、直接的二进制文件 URL**，避免 GitHub 连接器把 PDF / JPG 作为 base64 返回后无法进入文档或视觉检查链路。

仍然不会公开到 asset origin 的内容：

- `product.md`
- `manifest.yaml`
- README / AGENTS
- 仓库内部文档和 prompts

> 不要把客户私有、NDA、密码、凭证或其它机密文件放进这个 Public 仓库。

---

## 4. ChatGPT 的正确读取方式

不要让 ChatGPT 通过 GitHub 连接器硬读所有二进制文件。

推荐职责分工：

```text
GitHub
→ product.md
→ manifest.yaml
→ 文本 metadata

assets.licat.xyz
→ PDF / Datasheet / 尺寸图
→ JPG / PNG / WebP
→ 产品参考视频
→ 其它二进制证据
```

对于产品 `<product-slug>`，ChatGPT 应该：

1. 从 GitHub 读取 `product.md`。
2. 从 GitHub 读取 `manifest.yaml`。
3. 对 PDF / 图片 / 视频等二进制证据，优先使用 manifest 中的 `public_url`。
4. 核对与当前 claim 相关的原始说明书 / Datasheet。
5. 检查所有权威产品参考图片。
6. 将信息区分为：
   - 用户明确确认 / 修正
   - 权威文档支持
   - 图片中直接可观察
   - AI 合理推断
   - Unknown / Do not claim
7. 完成证据审查后才进入 DetailFlow。

证据优先级：

```text
用户明确确认的修正
        ↓
说明书 / Datasheet / 权威原始文件
        ↓
真实产品图片中可直接观察到的事实
        ↓
product.md 结构化摘要
        ↓
AI 合理推断
        ↓
未知：禁止编造
```

---

## 5. DetailFlow 开始前必须做 Capability Preflight

我们实际测试发现：有些 ChatGPT 会话可以读取 GitHub 文本，但不能正确检查二进制原件；还有些会话没有图像生成能力。

因此 **不要先做完 Blueprint 再发现后面无法生成图片**。

在 Approval Gate 1 之前，ChatGPT 必须先确认：

```text
1. 当前会话具备图像生成能力
2. 能读取 product.md
3. 能读取 manifest.yaml
4. 能通过 assets.licat.xyz public_url 检查至少一份原始文档
5. 能通过 assets.licat.xyz public_url 视觉检查至少一张真实产品图
```

如果任意一项失败：

> **立即停止，不进入 Blueprint，不到 Gate 1。**

这样不会浪费用户时间。

仓库已经提供完整启动提示词：

[`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md)

---

## 6. 最推荐：给 ChatGPT 发什么指令？

新开 ChatGPT 会话后，替换 `<product-slug>`：

```text
接下来请使用 DetailFlow 工作流，为产品 <product-slug> 制作英文海外市场电商产品详情页。

DetailFlow Skill：
https://github.com/AJbeckliy/detail-flow

Product repository：
https://github.com/licat233/product-assets

在 Approval Gate 1 之前，先做 capability preflight：

1. 确认当前会话具备图像生成能力。
2. 从 GitHub 读取 products/<product-slug>/product.md。
3. 从 GitHub 读取 products/<product-slug>/manifest.yaml。
4. 对 PDF / 图片 / 视频等二进制文件，不要依赖 GitHub connector/base64；优先使用 manifest 中 assets.licat.xyz 的 public_url。
5. 至少成功检查一份原始文档。
6. 至少成功视觉检查一张真实产品图片。

如果以上任意一项失败，请立即停止，不要先输出 Blueprint，也不要进入 Approval Gate 1，直接告诉我当前会话缺少什么能力。

如果 preflight 通过：

1. 读取并遵循 DetailFlow Skill，尤其是 ecommerce 8-screen product detail page 工作流和两个 approval gates。
2. 阅读与当前 claim 相关的所有原始说明书 / Datasheet。
3. 检查所有权威真实产品参考图。
4. 严格区分：
   - 用户明确确认的事实
   - 权威文档支持的事实
   - 图片中可以直接观察到的事实
   - AI 合理推断
   - 未知且不能擅自编造的信息
5. 精确参数必须回到原始文档核对。
6. 不得编造参数、认证状态、测试结果、奖项、折扣、合作品牌或其它没有证据支持的声明。
7. 所有面向海外客户的可见商业文案默认使用英文。
8. 第一阶段先输出完整 8-screen Detail Page Blueprint。
9. 严格遵守 DetailFlow 的两个 approval gates。
```

### 简短版

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Run the capability preflight before Gate 1. Use GitHub for product.md/manifest and assets.licat.xyz public_url links for binary evidence. If document/image inspection or image generation is unavailable, stop before the blueprint. Otherwise follow both DetailFlow approval gates strictly.
```

---

## 7. product.md 与 manifest.yaml 的分工

### product.md

`product.md` 是产品事实层，主要记录：

- 产品身份
- 用户确认的修正
- 有来源的技术参数
- 产品功能与工作方式
- 图片中可观察到的事实
- 应用场景
- 合理创意推断
- Unknown / Do not claim
- DetailFlow claim seeds

### manifest.yaml

`manifest.yaml` 是机器索引，**不是需要用户维护的资料表**。

通过：

```bash
bash scripts/sync-manifest.sh <product-slug>
```

自动生成。

它会包含类似：

```yaml
documents:
  - path: docs/datasheet.pdf
    public_url: https://assets.licat.xyz/products/<slug>/docs/datasheet.pdf

images:
  - path: images/front-view.jpg
    public_url: https://assets.licat.xyz/products/<slug>/images/front-view.jpg
```

如果目录和 manifest 不一致，应重新运行同步脚本，而不是人工改 YAML。

---

## 8. DetailFlow 固定流程

```text
Capability Preflight
        ↓
读取并核验输入资料
        ↓
完整 8-screen Blueprint
        ↓
Approval Gate 1
        ↓
Text Master / Visual Master
        ↓
先生成 Screen 01–02
        ↓
连续性 / 产品一致性 / 文案审查
        ↓
Approval Gate 2
        ↓
生成 Screen 03–08
        ↓
完整拼接与最终 Audit
```

八屏是一张连续 ecommerce detail page 的八个切片，不是八张互不相关的海报。

---

## 9. 仓库地图

```text
products/                          # 每款产品一个目录
templates/                         # product.md / manifest 默认结构
docs/                              # 使用规范和操作文档
prompts/                           # ChatGPT / DetailFlow 提示词
scripts/new-product.sh             # 自动创建产品目录
scripts/sync-manifest.sh           # 自动同步 manifest；用户无需编辑 YAML
scripts/generate-asset-browser.mjs # 生成 assets.licat.xyz 文件浏览器
scripts/build-public.sh            # Cloudflare Pages 构建入口
static/                            # 浏览器 CSS / headers / robots / 404
```

---

## 10. 同事协作：轻量 Clone（推荐）

这个仓库会逐渐包含大量 PDF、JPG、PNG、MP4 等二进制产品资料。为了避免同事每次都把所有历史产品资料下载到本地，**不建议直接使用普通 `git clone`**。

推荐：

```text
Partial Clone: --filter=blob:none
+
Sparse Checkout: 只检出当前要处理的产品目录
```

### 场景 A：只处理一款已有产品

```bash
git clone --filter=blob:none --sparse https://github.com/licat233/product-assets.git
cd product-assets

git sparse-checkout set \
  scripts \
  templates \
  products/lcd-display-101-inch-70
```

这样其它产品的大图片、PDF 和视频不会一开始就下载到本地。

完成修改后：

```bash
bash scripts/sync-manifest.sh lcd-display-101-inch-70

git add products/lcd-display-101-inch-70
git commit -m "product: update lcd-display-101-inch-70"
git pull --rebase
git push
```

### 场景 B：新增一款产品

```bash
git clone --filter=blob:none --sparse https://github.com/licat233/product-assets.git
cd product-assets

git sparse-checkout set scripts templates

bash scripts/new-product.sh <product-slug> "<Product Name>"

git sparse-checkout add products/<product-slug>
```

然后把真实资料放进：

```text
products/<product-slug>/docs/
products/<product-slug>/images/
```

整理 / 确认 `product.md`，再执行：

```bash
bash scripts/sync-manifest.sh <product-slug>

git add products/<product-slug>
git commit -m "product: add <product-slug> source assets"
git pull --rebase
git push
```

### 后来需要处理第二款产品

无需重新 clone：

```bash
git sparse-checkout add products/<another-product-slug>
```

如果以后确实需要完整仓库：

```bash
git sparse-checkout disable
```

---

## 11. 当前项目边界

为了避免过度设计，本仓库目前不负责：

- AI 营销图成品归档
- CMS
- ERP / PIM
- 电商订单
- 复杂数据库
- 自动发布社媒
- 自动修改未经证据支持的产品事实

核心职责始终只有一个：

> **保存可追溯、可被 ChatGPT 稳定读取的真实产品资料和结构化事实，并尽可能自动完成重复性的文件管理工作。**
