# ChatGPT + DetailFlow 使用指南

这份文档解决一个最常见的问题：

> 新开一个 ChatGPT 会话时，怎样让它真正读取 `licat233/product-assets` 中的产品资料，并且能够继续完成 DetailFlow 图像生成，而不是做到 Gate 1 后才发现二进制资料或图像生成能力不可用？

---

## 1. 先理解两条读取通道

这个仓库现在刻意把“文本 metadata”和“二进制证据”分开读取。

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

原因是：GitHub 连接器虽然可以发现仓库里的 PDF / JPG，但有些 ChatGPT 会话只能拿到 base64 或文件索引，无法把这些二进制内容完整送入文档 / 视觉检查链路。

因此，`manifest.yaml` 会给 `docs/` 和 `images/` 中的文件自动生成 `public_url`，ChatGPT 对二进制证据应优先使用这些 `assets.licat.xyz` URL。

---

## 2. Approval Gate 1 之前必须做 Capability Preflight

**不要一上来就做 8-screen Blueprint。**

先确认当前会话真的能走完整个 DetailFlow：

1. 当前会话具备图像生成能力。
2. 能从 GitHub 读取 `product.md`。
3. 能从 GitHub 读取 `manifest.yaml`。
4. 能通过 manifest 中的 `assets.licat.xyz` `public_url` 检查至少一份原始文档。
5. 能通过 manifest 中的 `assets.licat.xyz` `public_url` 视觉检查至少一张真实产品图。

如果任意一项失败：

> **立即停止，不输出 Blueprint，不进入 Approval Gate 1。**

这样可以避免 Blueprint 已经确认，才发现 Visual Master / Screen 01–02 根本无法生成。

---

## 3. 最推荐的 DetailFlow 启动指令

把下面这段复制到新的 ChatGPT 会话，只需要把 `<product-slug>` 替换成真实产品 slug。

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

1. 先读取并遵循 DetailFlow Skill，尤其是 ecommerce 8-screen product detail page 工作流和两个 approval gates。
2. 阅读与当前 claim 相关的原始说明书、Datasheet 和其它权威原始资料。
3. 检查所有权威真实产品参考图片。
4. 必须区分：
   - 用户明确确认的事实
   - 权威文档支持的事实
   - 图片中可以直接观察到的事实
   - AI 合理推断
   - 未知且不能擅自编造的信息
5. 精确参数必须回到原始说明书 / Datasheet 核对，不能只依赖 product.md 摘要。
6. 不得编造参数、认证状态、测试结果、奖项、折扣、合作品牌或其它没有证据支持的商业声明。
7. 所有面向海外客户的可见商业文案默认使用英文。
8. 第一阶段先输出完整的 8-screen Detail Page Blueprint。
9. 严格遵守 DetailFlow 的两个 approval gates。
```

---

## 4. 简短版

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Run the capability preflight before Gate 1. Use GitHub for product.md/manifest and assets.licat.xyz public_url links for binary evidence. If document/image inspection or image generation is unavailable, stop before the blueprint. Otherwise follow both DetailFlow approval gates strictly.
```

---

## 5. ChatGPT 正确的读取顺序

```text
GitHub product directory
        ↓
product.md
        ↓
manifest.yaml
        ↓
manifest public_url
        ↓
assets.licat.xyz 原始 PDF / 图片 / 视频
        ↓
证据分类
        ↓
DetailFlow Blueprint
```

ChatGPT 不应该直接把 `product.md` 当成唯一事实来源。

精确参数必须在需要时核对原始文档。

---

## 6. 证据分类

任何最终用于详情页的产品信息，都应该落入以下类别之一。

### A. 用户明确确认 / 修正

优先级最高，但最好在 `product.md` 中记录来源和日期。

### B. 权威文档支持的事实

例如：

```text
Rated power: 2W MAX
Source: user-manual.pdf, p.3
```

### C. 图片中直接可观察事实

例如：

```text
产品具有银色长条形外壳。
```

不能仅凭外观看到一个圆形结构，就声称它一定是 PIR Sensor。

### D. 合理推断

可以用于创意策划，但不能包装成精确事实。

### E. Unknown / Do not claim

没有证据的参数必须保持未知。

---

## 7. DetailFlow 固定流程

```text
Capability Preflight
        ↓
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

## 8. 如果资料无法访问怎么办

如果 manifest 中的 `public_url`：

- 404
- 无法打开
- 文件类型错误
- 内容和 manifest 不匹配

ChatGPT 应把对应证据视为不可用。

禁止仅凭文件名推断文件内容。

如果是 GitHub connector 只能返回 base64，但 `public_url` 可以访问，则应改用 `assets.licat.xyz`，而不是要求用户重新上传同一份资料。

---

## 9. 如果当前会话没有图像生成能力

这不是产品仓库能够修复的问题。

DetailFlow 的 Visual Master、Screen 01–08 都依赖当前 ChatGPT 会话实际具备图像生成能力。

因此正确行为是：

```text
Preflight 检查到无法生成图片
→ 立即停止
→ 不做 Blueprint
→ 不进入 Gate 1
→ 换到具备图像生成能力的 ChatGPT 会话重新开始
```

不要用文字、占位图或脚本假装完成 DetailFlow 图像阶段。

---

## 10. 一句话记忆

> **先检查当前会话能不能生成图、能不能读原始 PDF、能不能看真实产品图；全部通过后，再进入 DetailFlow。GitHub 读 metadata，assets.licat.xyz 读二进制原件。**
