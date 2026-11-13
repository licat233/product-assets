# ChatGPT + DetailFlow 使用指南

这份文档解决一个最常见的问题：

> 新开一个 ChatGPT 会话时，怎样先确认它真的具备完整执行 DetailFlow 的能力，再读取 `licat233/product-assets` 中的产品资料？

---

## 1. DetailFlow 不是内置名词

**不要假设新会话已经知道 DetailFlow 是什么。**

DetailFlow 是一个外部 GitHub Skill / workflow：

`https://github.com/AJbeckliy/detail-flow-V2-Ajie`

ChatGPT 使用的 DetailFlow 版本已固定，不跟随上游自动更新：

- 仓库：`https://github.com/AJbeckliy/detail-flow-V2-Ajie`
- 固定 Commit：`64c9cb12eb1d925faa01d38db47a4066d37df69b`
- Skill：`https://github.com/AJbeckliy/detail-flow-V2-Ajie/blob/64c9cb12eb1d925faa01d38db47a4066d37df69b/SKILL.md`
- 必需参考文件：`https://github.com/AJbeckliy/detail-flow-V2-Ajie/blob/64c9cb12eb1d925faa01d38db47a4066d37df69b/references/detail-page-patterns.md`

新会话必须从上述**准确 Commit**读取文件。禁止读取 `main`、最新分支或浮动链接。如果固定 Commit 或必需文件无法读取，立即报告并停止，不得悄悄切换到新版。

仓库里的当前规则优先于：

- ChatGPT 的旧记忆
- 泛化的电商详情页经验
- 对“DetailFlow”这个名字的自行理解

---

## 2. Capability Preflight：先检查图像生成能力

测试已经证明，不同 ChatGPT 会话暴露的工具能力可能不同。

因此 **Preflight 的第 0 步必须先检查图像生成能力**。

需要确认当前会话有真正可调用的 image generation / editing capability，可以完成：

- Visual Master
- 1:3 continuity master（DetailFlow 需要时）
- 前 2–3 屏
- 其余屏

如果没有：

```text
立即停止
→ 不读取剩余产品证据
→ 不做 8-screen Blueprint
→ 不进入 Approval Gate 1
```

不要根据模型名称推测“应该可以生成图”。必须以当前会话实际可调用能力为准。

---

## 3. 产品资料读取通道

如果图像生成能力通过，再读取：

```text
GitHub
→ product.md
→ manifest.yaml
→ DetailFlow Skill 文本规则
```

二进制证据则按 fallback 顺序读取。

### Binary evidence fallback

对于 PDF、JPG、PNG、视频、尺寸图、彩页等二进制原件：

```text
1. manifest public_url
   → assets.licat.xyz

失败
   ↓
2. manifest source_url
   → raw.githubusercontent.com

仍失败
   ↓
3. 如果 GitHub connector 返回的是完整 binary base64，
   并且当前会话能够把它 decode 还原成原始文件，
   则允许还原后真正打开 / 检查原件。
```

关键规则：

> **base64 本身不等于“已经检查了原始证据”。**

只有满足下面条件才算 PASS：

- PDF 还原后被真正打开和阅读；或
- 图片还原后被真正视觉检查；或
- 其它二进制文件被恢复到可检查的原始格式并实际检查。

以下都不算证据检查：

- 只看到文件名
- 只看到 manifest 条目
- 只看到 binary size
- 只拿到一段 base64
- 根据 `product.md` 摘要猜测原始文档内容

---

## 4. Approval Gate 1 之前的完整 Preflight

必须按顺序通过：

```text
Stage 0
当前会话能真正生成 / 编辑图片？
        ↓ PASS
Stage 1
读取固定 Commit `64c9cb12eb1d925faa01d38db47a4066d37df69b` 的 `SKILL.md` 与 `references/detail-page-patterns.md`
读取 product.md + manifest.yaml
        ↓ PASS
Stage 2
至少真正检查一份权威原始文档
至少真正视觉检查一张真实产品图
        ↓ PASS
8-screen Blueprint
        ↓
Approval Gate 1
```

如果任意阶段失败：

> **立即停止，不输出 Blueprint，不进入 Approval Gate 1。**

---

## 5. 最推荐的新会话启动指令

只需要替换 `<product-slug>`：

```text
Use the DetailFlow workflow to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know what "DetailFlow" means.

DetailFlow is an external GitHub Skill/workflow stored at:
https://github.com/AJbeckliy/detail-flow-V2-Ajie/tree/64c9cb12eb1d925faa01d38db47a4066d37df69b

Product source repository:
https://github.com/licat233/product-assets

BEFORE producing any Blueprint or reaching Approval Gate 1, run this capability preflight in order.

STAGE 0 — IMAGE GENERATION FIRST

Confirm that this ChatGPT session has an actually invokable image-generation/editing capability required to create:
- Visual Master
- 1:3 continuity master when required
- 前 2–3 屏
- 其余屏

Do not infer this from the model name.

If image generation/editing is unavailable:
STOP IMMEDIATELY.
Do not read the remaining product evidence.
Do not produce the 8-screen Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — DETAILFLOW CONTRACT + PRODUCT METADATA

If Stage 0 passes:
1. Read the immutable `SKILL.md` at `https://raw.githubusercontent.com/AJbeckliy/detail-flow-V2-Ajie/64c9cb12eb1d925faa01d38db47a4066d37df69b/SKILL.md` completely.
2. Read the required immutable reference `https://raw.githubusercontent.com/AJbeckliy/detail-flow-V2-Ajie/64c9cb12eb1d925faa01d38db47a4066d37df69b/references/detail-page-patterns.md` completely.
3. Treat commit `64c9cb12eb1d925faa01d38db47a4066d37df69b` as the execution contract. Do not read `main`, a latest branch, or any later commit. Do not substitute prior memory, a generic ecommerce workflow, or your own interpretation.
4. Read from GitHub:
   - products/<product-slug>/product.md
   - products/<product-slug>/manifest.yaml

STAGE 2 — BINARY EVIDENCE

For every PDF, image, video, drawing, brochure, or other binary source:

1. First try the manifest public_url on assets.licat.xyz.
2. If that cannot actually be opened, try the manifest source_url on raw.githubusercontent.com as a direct HTTP source.
3. If both direct URL routes fail, and the GitHub connector provides the COMPLETE binary as base64 and the current session can decode it into the original file, you may decode it and restore the file.
4. Base64 alone does NOT count as evidence inspection. The restored PDF/image/video must actually be opened and inspected.

The binary preflight only passes when you have:
- successfully opened and inspected at least one authoritative original document; and
- successfully opened and visually inspected at least one authoritative real product image.

If any required capability still fails after these allowed fallbacks:
STOP BEFORE THE BLUEPRINT.
Tell me exactly what failed.
Do not simulate image generation, do not create placeholders, and do not promote product.md summaries into verified source facts.

IF THE PREFLIGHT PASSES:

1. Read the authoritative original source documents relevant to every exact claim.
2. Inspect all authoritative real product reference images.
3. Separate information into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
4. Verify exact technical values against original source evidence rather than relying only on product.md.
5. Never invent unsupported specifications, certifications, test results, awards, discounts, partnerships, or regulated claims.
6. Follow the pinned DetailFlow `SKILL.md` at commit `64c9cb12eb1d925faa01d38db47a4066d37df69b` strictly, including both approval gates.
7. Use English visible commercial copy by default.
8. Preserve the real product's geometry, proportions, ports, controls, markings, colors, and materials.
9. Treat all eight screens as sequential sections of one continuous ecommerce long page, not eight unrelated posters.
```

仓库里的 canonical prompt：

[`prompts/detailflow-session-bootstrap.md`](../prompts/detailflow-session-bootstrap.md)

---

## 6. 证据分类

任何最终用于详情页的产品信息，都必须归入以下类别之一：

1. **用户明确确认 / 修正**
2. **权威文档支持的事实**
3. **图片中直接可观察的事实**
4. **合理但未确认的创意推断**
5. **Unknown / Do not claim**

精确参数必须回到原始说明书 / Datasheet / 尺寸图等权威原件核对。

---

## 7. DetailFlow 固定流程

完整 Preflight 通过后，才进入：

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
前 2–3 屏
        ↓
两屏拼接预览 + Audit
        ↓
Approval Gate 2
        ↓
其余屏
        ↓
完整拼接 + Final Audit
```

八屏是一张连续 ecommerce detail page 的八个片段，不是八张互不相关的海报。

---

## 8. 如果 binary evidence 最终还是无法读取

只有在以下三条路径都无法真正检查原件时，才把 binary evidence 判定为 FAIL：

```text
assets.licat.xyz public_url
        ↓ fail
raw.githubusercontent.com source_url
        ↓ fail
完整 connector base64 → decode → 原件检查
        ↓ fail
Binary evidence unavailable
```

不要因为第一条 URL 失败就立即要求用户重新上传资料。

如果运行环境最终仍无法把远程二进制证据送入 PDF / 视觉检查链路，则这是当前 ChatGPT runtime 的能力边界，不应通过继续更换 Cloudflare、GitHub 或对象存储架构来反复规避。

---

## 9. 一句话记忆

> **先确认当前会话有真正的图像生成工具；随后读取固定 Commit `64c9cb12eb1d925faa01d38db47a4066d37df69b` 的 DetailFlow Skill 和产品 metadata；二进制原件按 public_url → source_url → 可还原的完整 base64 顺序尝试。只有真正打开并检查原件才算 PASS。**
