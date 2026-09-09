# ChatGPT + DetailFlow 使用指南

这份文档解决一个最常见的问题：

> 以后新开一个 ChatGPT 会话时，到底应该发什么指令，才能让 ChatGPT 正确读取 `licat233/product-assets` 中的产品资料？

---

## 1. 最推荐的 DetailFlow 启动指令

把下面这段复制到新的 ChatGPT 会话，只需要把 `<product-slug>` 替换成真实产品 slug。

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
4. 根据 manifest 阅读与当前任务相关的说明书、Datasheet 和其它权威原始资料。
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

---

## 2. 简短版

当 ChatGPT 已经熟悉 DetailFlow 和这个仓库时，可以使用：

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

---

## 3. 只做产品资料分析

如果当前目的不是出详情页，而只是先理解产品，可以发：

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

---

## 4. ChatGPT 正确的读取顺序

对于产品 `<product-slug>`：

```text
GitHub product directory
        ↓
product.md
        ↓
manifest.yaml
        ↓
原始说明书 / Datasheet / 权威资料
        ↓
真实产品图片
        ↓
证据分类
        ↓
DetailFlow Blueprint
```

ChatGPT 不应该直接把 `product.md` 当成唯一事实来源。

`product.md` 是为了快速理解产品，而精确参数必须在需要时核对原始证据。

---

## 5. 证据分类

任何最终用于详情页的产品信息，都应该落入以下类别之一。

### A. 用户明确确认 / 修正

例如：

```text
用户确认该产品工作电压为 DC24V，而旧资料中的 12V 已过时。
```

这类明确修正的优先级最高，但最好在 `product.md` 中记录来源和日期。

### B. 权威文档支持的事实

例如：

```text
Rated power: 2W MAX
Source: user-manual.pdf, p.3
```

这类事实可以作为技术型商业文案依据。

### C. 图片中直接可观察事实

例如：

```text
产品具有银色长条形外壳。
```

但不能仅凭外观看到一个圆形结构，就直接声称它一定是 PIR Sensor。

### D. 合理推断

可以用于创意策划，但不能包装成精确事实。

例如：

```text
纤薄外形适合在柜体或货架空间中进行视觉整合。
```

### E. Unknown / Do not claim

没有证据的参数必须明确保持未知。

例如：

```text
battery capacity: unknown
sensor range: unknown
IP rating: unknown
```

DetailFlow 不得擅自补全这些参数。

---

## 6. DetailFlow 固定流程

DetailFlow 的详情页任务不是“拿到产品图以后马上生成八张图”。

标准流程是：

```text
读取输入资料
        ↓
事实与证据分析
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

八屏应该看起来像同一张连续 ecommerce detail page 的八个切片，而不是八张互不相关的广告海报。

---

## 7. 如果资料缺失怎么办

如果 manifest 中列出的文件：

- 404
- 无法访问
- 文件缺失
- 内容和 manifest 不匹配

ChatGPT 应该把对应证据视为不可用。

禁止：

```text
因为 manifest 中有文件名 user-manual.pdf
→ 就假设说明书一定支持某个参数
```

文件名不是事实证据。

---

## 8. 新产品入库后推荐操作

产品资料准备完成后，建议先让 ChatGPT 做一次“Evidence Audit”，再进入 DetailFlow。

例如：

```text
请先对 `licat233/product-assets` 中的 `<product-slug>` 做一次 DetailFlow readiness audit。

读取 product.md、manifest.yaml、相关原始说明书 / Datasheet 和所有真实产品图。

检查：
- manifest 是否和真实文件一致
- product.md 是否有无来源的精确参数
- 是否存在冲突参数
- 是否存在不应声称的认证或功能
- 是否有足够图片支持 8-screen DetailFlow
- 哪些 claim seeds 最可靠

暂时不要生成详情图。
```

这一步很适合第一款新产品正式入库时使用。

---

## 9. 仓库访问失败时

如果 ChatGPT 无法读取 GitHub 内容，先确认：

1. 仓库 URL 是否正确：`https://github.com/licat233/product-assets`
2. 产品 slug 是否正确。
3. `products/<slug>/product.md` 是否实际存在。
4. ChatGPT 当前环境是否具有访问该 GitHub 仓库的能力。

不要因为访问失败就要求用户重新上传所有资料；先检查仓库路径和连接状态。

---

## 10. 一句话记忆

以后只需要记住：

> **告诉 ChatGPT 产品 slug，让它先读 GitHub 的 product.md + manifest，再读原始资料和真实图片，最后才进入 DetailFlow。**
