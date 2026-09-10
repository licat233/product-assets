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

### 创建产品

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

例如：

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

### 放入真实资料

说明书、规格书等放到：

```text
products/<product-slug>/docs/
```

真实产品图 / 产品参考视频放到：

```text
products/<product-slug>/images/
```

### 同步 manifest

**不要手工编辑 `manifest.yaml`。**

```bash
bash scripts/sync-manifest.sh <product-slug>
```

同时修改多款产品时：

```bash
bash scripts/sync-manifest.sh
```

如果由 Codex / Agent 负责入库，`AGENTS.md` 已要求 Agent 在提交前自动运行同步，因此用户不应该被要求维护 YAML。

---

## 3. assets.licat.xyz：静态产品文件浏览器

Cloudflare Pages 会根据仓库内容自动生成：

```text
https://assets.licat.xyz/
```

首页显示产品列表；点击产品后可以看到：

```text
Source documents
→ docs/ 中的 PDF、规格书、尺寸图、彩页等

Visual references
→ images/ 中的真实产品图片和参考视频
```

机器可读索引：

```text
https://assets.licat.xyz/catalog.json
```

这个仓库本身就是 Public。`assets.licat.xyz` 的作用是提供稳定的直接二进制 URL，不是改变资料的隐私级别。

不要把客户私有、NDA、密码、凭证或其它机密文件放进这个 Public 仓库。

---

## 4. ChatGPT 的正确读取方式

文本 metadata：

```text
GitHub
→ DetailFlow SKILL.md
→ product.md
→ manifest.yaml
```

二进制原件不要只依赖单一路径，按 fallback 顺序尝试：

```text
1. manifest public_url
   → assets.licat.xyz

失败
   ↓
2. manifest source_url
   → raw.githubusercontent.com

仍失败
   ↓
3. 如果 GitHub connector 返回完整 binary base64，
   且当前会话能 decode 还原成原始文件，
   则还原后真正打开 / 检查。
```

关键规则：

> **base64 本身不算证据检查。只有还原后的原始 PDF / 图片 / 视频被真正打开并检查，才算 PASS。**

---

## 5. DetailFlow 开始前必须做 Capability Preflight

不同 ChatGPT 会话暴露的工具能力可能不同，所以必须在 Blueprint 前检查。

### Stage 0 — 先检查图像生成能力

第一件事不是读 PDF，而是确认当前会话有**真正可调用的图像生成 / 编辑能力**，能完成：

- Visual Master
- 1:3 continuity master（需要时）
- Screen 01–02
- Screen 03–08

如果没有：

```text
立即停止
→ 不读取剩余产品证据
→ 不做 Blueprint
→ 不进入 Approval Gate 1
```

不要根据模型名称推测能力。

### Stage 1 — 读取 DetailFlow 与 metadata

Stage 0 通过后：

1. 打开 `https://github.com/AJbeckliy/detail-flow`。
2. 完整读取当前 `SKILL.md`。
3. 读取 `SKILL.md` 引用的、8-screen ecommerce workflow 所需文件。
4. 读取当前产品的 `product.md` 和 `manifest.yaml`。

### Stage 2 — 真正检查原始证据

必须至少做到：

- 真正打开并检查一份权威原始文档；
- 真正视觉检查一张真实产品图。

二进制读取顺序：

```text
public_url
→ source_url
→ 完整 connector base64 → decode → 原件检查
```

任意必要能力最终失败：

> **立即停止，不输出 Blueprint，不进入 Approval Gate 1。**

完整规则见：[`docs/CHATGPT-USAGE.zh-CN.md`](./docs/CHATGPT-USAGE.zh-CN.md)

---

## 6. 最推荐：给 ChatGPT 发什么指令？

不要只说“Use DetailFlow”，因为新会话未必知道 DetailFlow 是什么。

推荐直接使用仓库里的 canonical prompt：

[`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md)

其中最关键的开头是：

```text
Use the DetailFlow workflow to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know what "DetailFlow" means.

DetailFlow is an external GitHub Skill/workflow stored at:
https://github.com/AJbeckliy/detail-flow

Product source repository:
https://github.com/licat233/product-assets

BEFORE producing any Blueprint or reaching Approval Gate 1, run this capability preflight in order.

STAGE 0 — IMAGE GENERATION FIRST

Confirm that this ChatGPT session has an actually invokable image-generation/editing capability required to create:
- Visual Master
- 1:3 continuity master when required
- Screen 01–02
- Screen 03–08

Do not infer this from the model name.

If image generation/editing is unavailable:
STOP IMMEDIATELY.
Do not read the remaining product evidence.
Do not produce the 8-screen Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — DETAILFLOW CONTRACT + PRODUCT METADATA

If Stage 0 passes:
1. Open the DetailFlow repository and read the current SKILL.md completely.
2. Read the files referenced by SKILL.md that are required for the ecommerce 8-screen workflow.
3. Read products/<product-slug>/product.md and products/<product-slug>/manifest.yaml.

STAGE 2 — BINARY EVIDENCE

For every binary source:
1. first try manifest public_url on assets.licat.xyz;
2. if unavailable, try manifest source_url on raw.githubusercontent.com;
3. if both fail and the connector provides the COMPLETE binary as base64, decode it only when the original file can then actually be opened and inspected.

Base64 alone does NOT count as evidence inspection.

Do not produce the Blueprint unless at least one authoritative original document and one authoritative real product image have actually been inspected.
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

`manifest.yaml` 是自动生成的机器索引，不需要用户维护。

```bash
bash scripts/sync-manifest.sh <product-slug>
```

它会记录：

- docs / images 实际文件清单
- `source_url`
- `public_url`
- 媒体类型
- evidence priority
- claims policy
- DetailFlow 默认参数

如果目录和 manifest 不一致，应重新运行同步脚本，而不是人工改 YAML。

---

## 8. DetailFlow 固定流程

完整 Preflight 通过后：

```text
读取并核验输入资料
        ↓
完整 8-screen Blueprint
        ↓
Approval Gate 1
        ↓
Text Master / Visual Master
        ↓
1:3 continuity master（需要时）
        ↓
Screen 01–02
        ↓
两屏拼接预览 + Audit
        ↓
Approval Gate 2
        ↓
Screen 03–08
        ↓
完整拼接 + Final Audit
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

仓库会逐渐包含大量 PDF、JPG、PNG、MP4 等二进制产品资料，因此不建议直接使用普通 `git clone`。

推荐：

```text
Partial Clone: --filter=blob:none
+
Sparse Checkout: 只检出当前要处理的产品目录
```

### 只处理一款已有产品

```bash
git clone --filter=blob:none --sparse https://github.com/licat233/product-assets.git
cd product-assets

git sparse-checkout set \
  scripts \
  templates \
  products/lcd-display-101-inch-70
```

完成修改后：

```bash
bash scripts/sync-manifest.sh lcd-display-101-inch-70

git add products/lcd-display-101-inch-70
git commit -m "product: update lcd-display-101-inch-70"
git pull --rebase
git push
```

### 新增一款产品

```bash
git clone --filter=blob:none --sparse https://github.com/licat233/product-assets.git
cd product-assets

git sparse-checkout set scripts templates

bash scripts/new-product.sh <product-slug> "<Product Name>"
git sparse-checkout add products/<product-slug>
```

然后把资料放进：

```text
products/<product-slug>/docs/
products/<product-slug>/images/
```

整理 / 确认 `product.md` 后：

```bash
bash scripts/sync-manifest.sh <product-slug>

git add products/<product-slug>
git commit -m "product: add <product-slug> source assets"
git pull --rebase
git push
```

后来需要第二款产品：

```bash
git sparse-checkout add products/<another-product-slug>
```

需要完整仓库时：

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
