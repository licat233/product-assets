# ChatGPT + Product Detail Designer 使用指南

这份文档解决一个最常见的问题：

> 新开一个 ChatGPT 会话时，怎样读取 Product Detail Designer 并检查图像生成能力，再读取 `licat233/product-assets` 中的产品资料？

---

## 1. Product Detail Designer 是独立开源 Skill

Product Detail Designer 是我们自建的、面向整个电商行业的通用开源 Skill。

- 仓库：https://github.com/licat233/product-detail-designer
- 固定版本：`v1.0.5`
- 唯一必需文件：https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.5/SKILL.md

新会话只需读取这个固定版本的 `SKILL.md`，不需要额外参考文件、本地安装或外部工具链。

**具体制作提示词是本次任务的权威规范**，负责定义页面数量、内容结构、母版、审批节点和交付物。Skill 负责通用的产品身份保护、事实准确性、视觉一致性、图像生成和质量审核；不得增加提示词没有要求的步骤。

## 2. Capability Preflight：先检查图像生成能力

测试已经证明，不同 ChatGPT 会话暴露的工具能力可能不同。

因此 **Preflight 的第 0 步必须先检查图像生成能力**。

需要确认当前会话有真正可调用的 image generation / editing capability，可以完成：

- Visual Master
- 1:3 continuity master（仅当用户的具体提示词明确要求时）
- 前 2–3 屏
- 其余屏

如果没有：

```text
立即停止
→ 不读取剩余产品证据
→ 不做 8-slice Page Blueprint
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
→ Product Detail Designer Skill 文本规则
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

## Page-first, Slice-second（强制规则）

**先设计一张完整的纵向电商详情页，再把它分成多个图片文件。页面才是设计单位，图片只是交付切片。** 不得逐张设计独立画布，再用相同背景或字体把它们拼成一张长图。

- 整张页面只有一个主标题 / H1，只能出现在第一张图片。
- 中间图片不得重新出现产品介绍标题、独立 Hero、页面抬头或标题栏。
- 任何切片都不得添加网站 Footer、联系信息底栏、重复 Logo、重复产品名称栏、版权栏或装饰性收尾。
- 最终 CTA 如有必要，只能在整张页面真正结束的位置出现一次，不得在每张图片底部重复。
- 内容模块可以跨越图片切分边界；切分位置不等于内容章节边界。
- 中间图片可以从一个正在进行的场景或内容模块中途进入，也可以在模块尚未结束时离开；它们不需要各自完整、自成一体。
- 后续图片必须按顺序延续上一张的内容与视觉状态。优先使用图像扩展 / Outpainting 从上一张底部向下延伸；不支持时，必须以上一张的底边作为下一张顶部的具体参考，不能从空白画布重新设计。
- 检查图片拼接预览：若出现重复 Title / Footer、重复 Hero、独立海报结构或每张图都从头开始、各自结束的 PPT 节奏，必须返修。

## Open-ended Slice（开放式切片，强制规则）

v1.0.4 解决了重复标题和 Footer，但没有完全解决中间图片的视觉收尾问题。**每一张非最终图片，底部都必须保持开放，不能在视觉上结束。** 只有整张详情页的最后一张图片允许真正收尾。

- Slice 01：顶部是页面开场，底部开放。
- Slice 02–07：顶部承接上一张，底部继续开放。
- Slice 08（或实际最后一张）：顶部承接上一张，底部才允许收尾。
- 每张切片必须定义 `top_edge_mode`、`bottom_edge_mode`、`continuity_carrier` 和 `next_slice_handoff`。
- 每张非最终图片底部 10–15% 是视觉延续区，不是收尾区。标题、正文、参数和重要标签不得进入该区域。
- 至少一个明确的非文字视觉元素必须抵达或穿过图片下边缘，并在下一张继续，例如货架/导轨、线缆、承托表面、透视线、示意图路径、光带或建筑空间结构。仅仅背景颜色相同不算连续元素。
- 中间图片底部禁止出现任何视觉终点：大面积留白、渐隐、暗角、整体变暗、完整卡片/网格、居中且完整的终结构图、分割线、装饰底栏、总结或 CTA。
- 不得为了制造连续感而切断重要产品结构或文字；应延续周围环境或次要视觉元素。
- **每次只生成一张图片**，禁止一次批量生成 Slice 03–08。每张生成后先检查底边；如果看起来已经结束，必须先返修，再将其作为下一张的参考。
- 生成下一张时，同时提供上一张实际生成的图片和下一张的计划交接说明。下一张必须接续上一张底边的视觉元素与场景。
- 如果图像工具无法可靠保持开放式底边，应采用工具支持的连续画布/扩图流程，或如实说明限制。不得把一组各自收尾的图片冒充连续详情页。

## 制作需求确认（Blueprint 之前必须完成）

完成产品资料和图片的真实检查后、制作 Blueprint 之前，按照 Product Detail Designer v1.0.5 确认以下四项：

1. **输出语言**：最终图片中显示的文案语言。当前推荐提示词明确写了 English，因此使用该提示词时不必重复询问；如果用户另行指定其他语言，以用户指定为准。
2. **图片尺寸 / 比例**：每张图片最终图片的像素尺寸或宽高比例。若用户的具体制作提示词已经规定 9:21 或其他尺寸 / 比例，不要重复询问；否则必须确认。
3. **电商平台 / 展示位置**：例如 Amazon 商品图片、Amazon A+ Content、Shopify 产品页、Alibaba.com 详情页等。未指定时必须询问。
4. **销售地区 / 目标市场**：具体国家或地区，或明确说明全球市场。“海外市场”本身不等于具体国家或地区；未明确时必须询问。

将所有缺失项合并为一条简洁消息一次问完。若平台和展示位置已知但尺寸未知，先给出有依据的尺寸 / 比例建议并让用户确认；如果用户明确授权 AI 决定，则自行选择并说明采用的设定。不要把设计建议说成平台官方要求，也不要编造平台规格。

四项信息全部已提供或由用户明确授权 AI 决定后，继续制作 Blueprint。此处是制作参数确认，不是额外的视觉审批节点。

## 产品资料与视觉设计必须分离（强制规则）

**内容参考不等于视觉参考。** 产品说明书、规格书、宣传册 PDF、产品手册和技术资料，默认只用于核实产品事实，不是电商详情页的设计模板。

资料必须按用途分类：

- **产品事实资料**：提取参数、功能、卖点、材料、适用场景、限制条件和已确认的宣传表述。
- **产品视觉素材**：产品实拍图、白底图、细节图、安装图和应用场景图，用于识别和呈现真实产品。
- **工程图 / 原理图**：用于理解结构、尺寸、接线和工作原理；确有必要时可以重新绘制清晰的解释图，但必须保留工程含义，不得补造缺失数据。
- **视觉设计参考**：只有用户明确指定为风格参考的品牌规范、Moodboard、样例页面或设计稿，才可用于指导视觉设计。

除非用户明确要求复刻、改版、转换原 PDF，或明确指定 PDF 为布局 / 风格模板，否则禁止：

- 临摹、重制、换色、换字体、翻译或重新排列 PDF 的页面 UI 和版式；
- 照搬原 PDF 的页面顺序、构图、标题位置、文本区块、表格、图标网格、装饰元素、背景和信息层级；
- 默认把整页 PDF 或 PDF 截图作为图像生成的视觉参考；
- 将 PDF 每一页对应改编成一张电商详情图。

可以提取并重新组织 PDF 中经过核实的事实、文字、单独的产品图片和有用技术信息，但必须围绕目标买家、购买决策和已确认的平台重新策划内容与视觉设计。最终作品必须是独立构思的电商详情页，而不是宣传册的换皮版本。

如果产品图片只嵌在 PDF 中，只能在清晰度足够时提取单张产品图片作为产品外观参考；不得用整页 PDF 代替产品照片。没有足够清晰的真实产品图时，应明确说明或请求补充，不能凭宣传册页面臆造产品外观。

**验收标准：** 如果最终图片看起来像原 PDF 页面换了颜色、字体或布局，或者仍然沿用原 PDF 的逐页结构，即判定设计不合格，必须重新独立设计。

## 4. Approval Gate 1 之前的完整 Preflight

必须按顺序通过：

```text
Stage 0
当前会话能真正生成 / 编辑图片？
        ↓ PASS
Stage 1
读取固定版本 `v1.0.5` 的 `SKILL.md`
读取 product.md + manifest.yaml
        ↓ PASS
Stage 2
至少真正检查一份权威原始文档
至少真正视觉检查一张真实产品图
        ↓ PASS
Production Brief Confirmation
确认语言、尺寸、平台 / 展示位置、销售地区
        ↓ PASS
8-slice Page Blueprint
        ↓
Approval Gate 1
```

如果任意阶段失败：

> **立即停止，不输出 Blueprint，不进入 Approval Gate 1。**

---

## 5. 最推荐的新会话启动指令

只需要替换 `<product-slug>`：

```text
Use Product Detail Designer and the task-specific production prompt to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know this Skill; read the pinned SKILL.md first.

Product Detail Designer is our own open-source GitHub Skill, fixed at release v1.0.5:
https://github.com/licat233/product-detail-designer/tree/v1.0.5

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
Do not produce the 8-slice Page Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — PRODUCT DETAIL DESIGNER SKILL + PRODUCT METADATA

If Stage 0 passes:
1. Read the pinned `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.5/SKILL.md` completely.
2. Treat the user's production prompt as the task-specific source of truth; use the Skill for general safeguards.
3. Read from GitHub:
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
6. Follow the user's task-specific production prompt for stages and approval gates; use Product Detail Designer v1.0.5 for general safeguards.
7. Use English visible commercial copy by default.
8. Preserve the real product's geometry, proportions, ports, controls, markings, colors, and materials.
9. Treat all eight image slices as sequential sections of one continuous ecommerce long page, not eight unrelated posters.
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

## 7. 产品详情页固定流程

完整 Preflight 通过后，才进入：

```text
读取并核验输入资料
        ↓
完整 8-slice Page Blueprint
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

八张图片切片是一张连续 ecommerce detail page 的八个片段，不是八张互不相关的海报。

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

> **先确认当前会话有真正的图像生成工具；随后读取固定版本 `v1.0.5` 的 Product Detail Designer Skill 和产品 metadata；二进制原件按 public_url → source_url → 可还原的完整 base64 顺序尝试。只有真正打开并检查原件才算 PASS。**
