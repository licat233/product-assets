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

把说明书、规格书等放到：

```text
products/led-sensor-light/docs/
```

把真实产品图 / 产品参考视频放到：

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
- `assets.licat.xyz` 公开媒体 URL
- DetailFlow 默认规则

如果同时修改了多款产品，可以直接运行：

```bash
bash scripts/sync-manifest.sh
```

它会同步全部产品。

如果由 Codex / Agent 负责入库，仓库根目录的 `AGENTS.md` 已要求 Agent 在提交前自动运行这个同步步骤，因此**用户不应该被要求手工维护 YAML**。

详细流程见：[`docs/ADDING-A-PRODUCT.md`](./docs/ADDING-A-PRODUCT.md)

---

## 3. assets.licat.xyz 静态资产浏览器

Cloudflare Pages 会根据仓库内容自动生成静态产品浏览器：

```text
https://assets.licat.xyz/
```

首页显示产品列表；点击产品后可以浏览该产品公开的图片 / 视频文件。

公开范围只包括 `images/` 中支持的视觉媒体，不会公开：

- `product.md`
- `manifest.yaml`
- `docs/`
- PDF / Datasheet
- README / AGENTS 等仓库文件

机器可读公开索引：

```text
https://assets.licat.xyz/catalog.json
```

---

## 4. ChatGPT 应该怎么读取一款产品

对于产品 `<product-slug>`，ChatGPT 应按以下顺序处理：

1. 读取 `products/<product-slug>/product.md`。
2. 读取 `products/<product-slug>/manifest.yaml`。
3. 根据 manifest 打开与当前任务相关的原始说明书 / Datasheet / 其它权威文档。
4. 检查 manifest 中列出的真实产品参考图片。
5. 把信息严格区分为：
   - 用户明确确认 / 修正的信息
   - 权威文档明确支持的事实
   - 产品图片中可直接观察到的事实
   - AI 合理推断
   - 未知 / 禁止擅自声称的信息
6. 完成证据审查后，才能开始详情页策划或生成。

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

## 5. 最常用：给 ChatGPT 发什么指令？

### 制作 DetailFlow 产品详情页

新开 ChatGPT 会话后，替换 `<product-slug>` 即可：

```text
接下来请使用 DetailFlow 工作流，为产品 <product-slug> 制作英文海外市场电商产品详情页。

DetailFlow Skill：
https://github.com/AJbeckliy/detail-flow

Product repository：
https://github.com/licat233/product-assets

开始任务前：
1. 先读取并遵循 DetailFlow Skill，尤其是 ecommerce 8-screen product detail page 工作流和两个 approval gates。
2. 读取 products/<product-slug>/product.md。
3. 读取 products/<product-slug>/manifest.yaml。
4. 根据 manifest 阅读与当前产品相关的说明书、Datasheet 和其它权威原始资料。
5. 检查 manifest 中列出的所有真实产品参考图片。
6. 必须区分：
   - 用户明确确认的事实
   - 权威文档支持的事实
   - 图片中可以直接观察到的事实
   - AI 合理推断
   - 未知且不能擅自编造的信息
7. 精确参数必须回到原始说明书 / Datasheet 核对，不能只依赖 product.md 摘要。
8. 不得编造参数、认证状态、测试结果、奖项、折扣、合作品牌或其它没有证据支持的商业声明。
9. 所有面向海外客户的可见商业文案默认使用英文。
10. 不要收到资料后立即生成最终详情图。
11. 第一阶段先输出完整的 8-screen Detail Page Blueprint，等待我确认后再继续。
12. 严格遵守 DetailFlow 的两个 approval gates。
```

### 简短指令

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

### 只分析产品，不做详情页

```text
请分析 `licat233/product-assets` 中的产品 `<product-slug>`。

先读取 product.md 和 manifest.yaml，再阅读 manifest 中相关的原始说明书 / Datasheet，并检查所有真实产品参考图。

请分别输出：
1. 用户明确确认的信息
2. 权威文档支持的产品参数和功能
3. 图片中可直接观察到的事实
4. 合理但尚未确认的推断
5. 未知 / 禁止擅自声称的信息

精确技术参数必须注明来源，不要编造缺失信息。
```

更完整说明：[`docs/CHATGPT-USAGE.zh-CN.md`](./docs/CHATGPT-USAGE.zh-CN.md)

---

## 6. product.md 与 manifest.yaml 的分工

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

例如：

```markdown
| Specification | Value | Source |
| --- | --- | --- |
| Rated power | 2W MAX | user-manual.pdf, p.3 |
| Input | DC 5V 1A | datasheet.pdf, Electrical Specifications |
```

### manifest.yaml

`manifest.yaml` 只是机器索引，不是需要用户维护的资料表。

它由：

```bash
bash scripts/sync-manifest.sh <product-slug>
```

自动根据 `product.md`、`docs/` 和 `images/` 生成。

文件顶部会明确标记：

```yaml
# AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.
```

因此，如果目录和 manifest 不一致，正确做法是**重新运行同步脚本，而不是人工修改 YAML**。

---

## 7. DetailFlow 固定原则

- 先分析输入资料。
- 先输出完整 8-screen Blueprint。
- Approval Gate 1。
- 建立 Visual Master / Text Master 后先生成前两屏。
- 审查连续性、产品一致性和文字。
- Approval Gate 2。
- 再生成 Screen 03–08。
- 最后完整拼接与审查。

八屏是一张连续产品详情长页的八个片段，不是八张互不相关的海报。

---

## 8. 仓库地图

```text
products/                          # 每款产品一个目录
templates/                         # product.md / manifest 默认结构
docs/                              # 使用规范和操作文档
prompts/                           # ChatGPT / DetailFlow 提示词
scripts/new-product.sh             # 自动创建产品目录
scripts/sync-manifest.sh           # 自动同步 manifest；用户无需编辑 YAML
scripts/generate-asset-browser.mjs # 生成 assets.licat.xyz 静态浏览器
scripts/build-public.sh            # Cloudflare Pages 构建入口
static/                            # 静态浏览器 CSS / headers / robots / 404
```

重要文档：

- [`docs/PRODUCT-DIRECTORY-SPEC.md`](./docs/PRODUCT-DIRECTORY-SPEC.md)
- [`docs/ADDING-A-PRODUCT.md`](./docs/ADDING-A-PRODUCT.md)
- [`docs/CHATGPT-USAGE.zh-CN.md`](./docs/CHATGPT-USAGE.zh-CN.md)
- [`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md)

---

## 9. 当前项目边界

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
