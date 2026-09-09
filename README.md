# Product Assets 产品资产库

[English](./README.en.md) · [ChatGPT 使用说明](./docs/CHATGPT-USAGE.zh-CN.md) · [产品目录规范](./docs/PRODUCT-DIRECTORY-SPEC.md)

这是一个面向 **ChatGPT / DetailFlow / Codex** 的产品资料仓库。

它的目标不是单纯保存图片，而是让每一款产品都拥有一套长期可复用的、结构化的 **Product Source of Truth**：产品说明书、规格资料、真实产品图片、经过整理的产品事实，以及 DetailFlow 所需的输入信息。

这样以后打开一个全新的 ChatGPT 会话时，不需要重新上传同一套产品说明书和产品图片，只需要告诉 ChatGPT：

> 去 `licat233/product-assets` 读取某个产品。

---

## 1. 核心原则

**一款产品 = 一个独立目录。**

标准结构：

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

- `product.md`：给 ChatGPT 快速理解产品使用的结构化摘要和证据索引。
- `manifest.yaml`：机器可读的产品资料清单，记录文档、图片、URL、DetailFlow 设置等。
- `docs/`：原始证据层，包括说明书、Datasheet、安装说明、测试报告、认证资料等。
- `images/`：真实产品参考图。AI 生成的营销图不应作为产品事实来源放在这里。

`product.md` **不能替代说明书**。当详情页要使用精确参数时，应回到原始说明书 / Datasheet 核对。

---

## 2. 新建一款产品

不要手工回忆目录结构，也不要自己一个个创建子目录。

从仓库根目录运行：

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

例如：

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

脚本会自动创建：

```text
products/led-sensor-light/
├── product.md
├── manifest.yaml
├── docs/
└── images/
```

并自动把产品 slug 和产品名称填入模板。

产品 slug 建议使用稳定的、小写 kebab-case，例如：

```text
led-sensor-light
wireless-shelf-light
24v-power-track
```

创建后，再把真实资料放入对应产品目录，并根据原始资料完善 `product.md` 和 `manifest.yaml`。

详细步骤见：[`docs/ADDING-A-PRODUCT.md`](./docs/ADDING-A-PRODUCT.md)

---

## 3. ChatGPT 应该怎么读取一款产品

对于产品 `<product-slug>`，ChatGPT 应按以下顺序处理：

1. 读取 `products/<product-slug>/product.md`。
2. 读取 `products/<product-slug>/manifest.yaml`。
3. 根据 manifest 打开与当前任务相关的原始说明书 / Datasheet / 其它权威文档。
4. 检查 manifest 中列出的真实产品参考图片。
5. 把获取的信息严格分为：
   - 用户明确确认 / 修正的信息
   - 权威文档明确支持的事实
   - 产品图片中可以直接观察到的事实
   - AI 合理推断
   - 未知 / 禁止擅自声称的信息
6. 只有完成证据审查后，才能开始详情页策划或生成。

证据优先级：

```text
用户明确确认的修正
        ↓
说明书 / Datasheet / 权威原始文件
        ↓
真实产品图片中可直接观察到的事实
        ↓
product.md 中的结构化摘要
        ↓
AI 合理推断
        ↓
未知：禁止编造
```

---

## 4. 最常用：把什么指令发给 ChatGPT？

### 方式 A：制作 DetailFlow 产品详情页

新开一个 ChatGPT 会话后，可以直接发送下面这段，只需要替换 `<product-slug>`：

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

### 方式 B：简短指令

当 ChatGPT 已经知道 DetailFlow 和本仓库规则时，可以只发送：

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

### 方式 C：只分析产品，不做详情页

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

更完整说明见：[`docs/CHATGPT-USAGE.zh-CN.md`](./docs/CHATGPT-USAGE.zh-CN.md)

---

## 5. product.md 的作用

`product.md` 是给 LLM 使用的产品摘要，不是营销文案，也不是随意填写的产品介绍。

它应该整理：

- 产品身份
- 原始资料来源
- 用户确认的修正
- 有来源的技术参数
- 产品功能与工作方式
- 图片中可观察到的事实
- 已支持的应用场景
- 合理创意推断
- Unknown / Do not claim
- DetailFlow claim seeds

例如一个精确参数应该尽量记录来源：

```markdown
| Specification | Value | Source |
| --- | --- | --- |
| Rated power | 2W MAX | user-manual.pdf, p.3 |
| Input | DC 5V 1A | datasheet.pdf, Electrical Specifications |
```

这样半年后再打开新会话，也可以快速知道“这个参数是从哪里来的”。

---

## 6. manifest.yaml 的作用

`manifest.yaml` 是机器可读索引。

ChatGPT / Codex 不应该靠猜测目录里有哪些文件，而应该优先通过 manifest 获取：

- 产品身份
- 原始文档清单
- 图片清单
- 文件 / 公开 URL
- 图片用途
- 证据等级
- DetailFlow 默认参数
- claim policy

如果 manifest 声明某个文件存在，但实际无法访问，应把该证据视为 **不可用**，不能仅凭文件名推断其内容。

---

## 7. DetailFlow 的固定原则

使用 DetailFlow 制作产品详情页时：

- 必须先分析输入资料。
- 必须先输出完整 8-screen Blueprint。
- 必须经过 Approval Gate 1。
- 建立 Visual Master / Text Master 后，先生成前两屏。
- 审查前两屏的连续性、产品一致性和文字后，经过 Approval Gate 2。
- 再生成 Screen 03–08。
- 最后进行完整长图拼接与审查。

八屏应当是一张连续产品详情长页的八个片段，而不是八张互不相关的海报。

---

## 8. 仓库地图

```text
products/                      # 每款产品一个目录
templates/                     # product.md / manifest.yaml 模板
docs/                          # 使用规范和操作文档
prompts/                       # 可复用的 ChatGPT / DetailFlow 提示词
scripts/new-product.sh         # 自动创建产品目录
scripts/                       # 其它资产和部署辅助脚本
static/                        # 静态资源发布相关文件
```

重要文档：

- [`docs/PRODUCT-DIRECTORY-SPEC.md`](./docs/PRODUCT-DIRECTORY-SPEC.md) — 产品目录标准
- [`docs/ADDING-A-PRODUCT.md`](./docs/ADDING-A-PRODUCT.md) — 新产品入库流程
- [`docs/CHATGPT-USAGE.zh-CN.md`](./docs/CHATGPT-USAGE.zh-CN.md) — ChatGPT 中文使用指南
- [`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md) — DetailFlow 会话启动提示词

---

## 9. 这个项目不解决什么

为了避免项目失控，本仓库目前不负责：

- 生成后的营销图片归档
- CMS
- 产品 ERP / PIM
- 电商订单
- 复杂数据库
- 自动发布社媒
- 自动修改产品事实

核心职责始终只有一个：

> **为每一款产品保存可追溯、可被 ChatGPT 稳定读取的真实资料和结构化事实，使产品详情页、内容生产和其它 AI 工作流可以可靠复用这些信息。**

