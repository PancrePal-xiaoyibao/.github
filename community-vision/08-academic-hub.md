<!--
title: 🎓 Pillar 8 · 学术共建：综述 · 生信 · 预印本 · 脚本仓库 · Academic Co-Building
labels: pinned, pillar-8, vision, help-wanted, academic, patient-communication, bioinformatics
parent: 00-billboard
-->

> 🔙 **返回** [🌟 社区愿景 BillBoard 顶层 issue #24](https://github.com/PancrePal-xiaoyibao/.github/issues/24)

# 🎓 Pillar 8 · 学术共建与患者向科普桥梁

> **每一位医学生、研究生、临床科研工作者的每一份研究，都值得在社区沉淀、传播、成为下一位研究者的起点。更重要的是 —— 那些牵扯到患者直接福祉的研究，都值得被翻译成病友能读懂的语言，传递希望与善意。**

## 🌠 为什么这件事重要

- **学术孤岛化**：太多硕博论文躺在校园图书馆里落灰，太多有价值的分析脚本永远死在导师的 U 盘里，太多综述只服务于一次答辩然后被遗忘。
- **临床科研的独特窘境**：临床医生想做科研没时间、想发论文没经验、想申基金没导师；研究生的分析代码想给学弟学妹用没渠道；PI 的经验想传承没载体。
- **患者视角的科研鸿沟最深**：一篇能真正改变患者预后的论文发表在 SCI 期刊上，多数病友一辈子看不到、看不懂；而**"这项研究对我意味着什么"** 这种翻译工作，本该是科研人的社会责任，但没有机制承载。
- **AI 时代给学术公益开辟的新范式**：VitaForge 的 SPEC + OODA + Gate + Worklog 强制了研究可追溯性和可复现性；PubMed / OpenAlex MCP 让文献不再是障碍；开源社区让每一份贡献都被看见。

**我们的目标（两条腿走路）：**
1. **社区不做预印本平台**，而是做**"论文+代码+患者向科普"的桥梁仓库**：无论您把论文发在 SCI、CNS、bioRxiv、medRxiv、中华医学、还是任何期刊 —— 都欢迎 fork 一份代码 + 论文到社区仓库，并**在此基础上，把研究结果向病友社区做一次通俗的解释与传播**
2. **让开源医学学术共建成为公共土壤**：任何医学问题、基础研究、临床困惑、开源生信、分析脚本都能找到自己的位置，而不是散落在无人问津的角落

## 🎯 里程碑清单（M8）

| # | 里程碑 | 难度 | 预估时长 | 状态 |
|:---:|---|:---:|:---:|:---:|
| **M8.1** | **权威综述孵化器**：临床常见困惑 → 结构化文献综述 → PR 到社区综述仓库 → 挂通讯作者 | 🟡 中 | 每篇 2-4 周 | 🔵 招募中 |
| **M8.2** | **开源生信脚本仓库**：`community-bioinformatics` 新建仓库，收纳 R/Python 单细胞、bulk RNA、meta 分析脚本 | 🟢 中 | 2 周搭好 → 持续 | 🔵 待认领 |
| **M8.3** | **📢 论文患者向科普桥梁**：您的论文（任何期刊）→ fork 代码/PDF 到社区 → 写 500 字病友能读懂的"这对我意味着什么" | 🟢 低 | 每篇 3-5 天 | 🟢 好上手 |
| **M8.4** | **学位论文开源计划**：本科毕业论文、硕博论文的匿名化开源版本，作为下一位学生的起点 | 🟢 低 | 每篇 1 周提交 | 🟢 好上手 |
| **M8.5** | **临床常见困惑对答库**：medical-advisory 沉淀 → 结构化 Q&A → 社区问答库（对接 [Genie-X-PAL-prompts-center](https://github.com/PancrePal-xiaoyibao/Genie-X-PAL-prompts-center)） | 🟢 中 | 持续 | 🟢 好上手 |
| **M8.6** | **国自然基金开源辅导集**：`/nsfc-proposal-advisor` 走通的破题案例 → 教学教程 → 社区申请季启动 | 🟡 中 | 3-4 周 | 🔵 招募中 |
| **M8.7** | **复旦 9A 范式复制**：把 [老年胰腺癌 + AI 助手论文](https://doi.org/10.3969/j.issn.1008-8296.2025.01.0) 的范式扩展到其他小 x 宝 | 🔴 高 | 每篇 6-12 周 | 🔵 招募主理人 |
| **M8.8** | **社区学术引用规范**：让所有 VitaForge / 小胰宝生态的产出都能被规范引用 | 🟢 低 | 1 周 | 🟢 好上手 |
| **M8.9** | **医学写作服务**：与 [web-xyb-writer-pal](https://github.com/PancrePal-xiaoyibao/web-xyb-writer-pal) 深度集成，为医学生/临床研究者提供在线论文辅助 | 🟡 中 | 3-4 周 | 🔵 待认领 |
| **M8.10** | **医疗脱敏工具链**：与 [medical-desensitization](https://github.com/PancrePal-xiaoyibao/medical-desensitization) 集成，让病例研究可以合规开源 | 🟡 中 | 2-3 周 | 🔵 招募中 |

## 📢 关于 M8.3 · 患者向科普桥梁（重点展开）

**这是主人在 BillBoard 起草时特别强调的核心方向**：

**社区不与任何期刊竞争**，不做预印本平台。相反：
- 📄 您把论文发在**任何平台**都可以 —— SCI、CNS、bioRxiv、medRxiv、中华医学、临床肿瘤学杂志……
- 🔄 论文发表后，**fork 一份代码 + PDF/DOI 链接** 到社区仓库
- 💬 **在这个基础上，写一份 300-500 字病友能读懂的"这对我意味着什么"** —— 尤其是当您的研究涉及：
  - 治疗方案有效性、生存率、副作用管理 —— 直接影响病友选择
  - 早筛、早诊、复发监测 —— 关乎生存质量
  - 心理支持、康复、并发症 —— 关乎生活质量
  - 罕见病、罕见突变 —— 关乎"被看见"

**给病友的不仅是信息，更是希望与善意**。您的 500 字，可能是一位家属在深夜找方向时抓住的那道光。

## 🚪 不同人群怎么参与

<table>
<tr>
<td width="25%" valign="top">

### 🎓 医学生 / 本科生
- **M8.4** 学位论文开源
- **M8.2** 提交你的分析脚本
- 用 [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) 15 分钟入门
- 挂"社区首个学生贡献者"荣誉

</td>
<td width="25%" valign="top">

### 🧪 研究生
- **M8.1 / M8.3** 综述与患者向科普
- **M8.4** 硕博论文匿名开源
- co-author 挂社区 · 挂论文致谢
- 走 `/thesis-writing-mentor`

</td>
<td width="25%" valign="top">

### 🩺 临床医生
- **M8.3 / M8.5 / M8.6** 临床科研
- 已发表论文 → 患者向科普
- 30 分钟/周即可
- 走 `/deep-research` + `/nsfc-*`

</td>
<td width="25%" valign="top">

### 🔬 PI / 高年资
- **M8.6 / M8.7** 基金辅导 + 范式复制
- 带徒弟 = 双倍贡献
- 社区可挂 co-PI
- 走 `/executive-consultant`

</td>
</tr>
</table>

## 🌾 三种"沉淀 → 传播"路径

我们提供**三条完全不同的沉淀路径**，按你的开放度选择：

### 🌱 路径一 · 论文+科普桥梁（最推荐 · 门槛最低）
- 您的论文**已发表在任何期刊**（SCI/CNS/中华系列/bioRxiv/medRxiv 均可）
- fork 一份**代码 + 论文 PDF/DOI** 到社区专题仓库
- 用 `/thesis-writing-mentor` 或直接手写一份**病友向 300-500 字通俗解读**
- **署名**：正规学术署名 + 社区在贡献者名单中记名
- **适合**：任何已经在做临床科研 / 基础研究的医生 / 学者 —— **传递研究背后的希望与善意**

### 🌿 路径二 · 匿名开源（最低门槛）
- 您只提供匿名化的**分析脚本 / SOP / 综述初稿**（可先经 [medical-desensitization](https://github.com/PancrePal-xiaoyibao/medical-desensitization) 脱敏）
- 社区帮您脱敏、润色、结构化、挂到公共仓库
- **署名**：可选"社区志愿者贡献" 或 使用 GitHub handle
- **适合**：怕导师不同意的学生、有临床数据脱敏顾虑的医生、想低调练手的研究者

### 🌳 路径三 · 深度合作（长期）
- 加入飞书志愿者 + 学术 SIG，参与社区级别的联合课题
- 复旦 9A 范式 / 与 pancan.org 合作 / 微光成炬合作项目
- **署名**：多方联合、可申请联合基金
- **适合**：PI、高年资医生、开题深度的研究生

## 🔗 相关资源

- **主要 skill**（VitaForge）：
  - `/deep-research` 多 agent 并行调研
  - `/paper-reader` 批判性精读
  - `/thesis-writing-mentor` 学位论文 + 去 AI 化 + 盲审模拟 + **患者向改写**
  - `/sci-journal-submission-expert` SCI 投稿全流程
  - `/nsfc-proposal-advisor` 国自然辅导
  - `/scrna-bindlab-full-workflow` 单细胞全流程
  - `/pubmed-linker` 引用管理
- **推荐 MCP**：PubMed · OpenAlex · KnowS · 秘塔（见 Pillar 3）
- **社区仓库抓手**：
  - [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) · AI4S 全流程主引擎
  - [web-xyb-writer-pal](https://github.com/PancrePal-xiaoyibao/web-xyb-writer-pal) · 在线论文写作辅助服务
  - [medical-desensitization](https://github.com/PancrePal-xiaoyibao/medical-desensitization) · 医疗数据脱敏工具
  - [Genie-X-PAL-prompts-center](https://github.com/PancrePal-xiaoyibao/Genie-X-PAL-prompts-center) · 社区共建 prompts 中心
- **参考范式**：[复旦肿瘤 9A 论文](https://doi.org/10.3969/j.issn.1008-8296.2025.01.0) · bioRxiv · medRxiv · PROSPERO 系统综述注册

## 📈 成功指标

- ✅ 社区**累计学术产出桥接**：论文 fork + 患者向科普 > 30 篇
- ✅ **学位论文开源仓库** 收录 > 30 份匿名化论文
- ✅ **开源生信脚本仓库** > 100 个可复用脚本
- ✅ 至少 **5 位年轻研究者** 通过社区完成人生第一篇 SCI
- ✅ **患者向科普阅读**（公众号 + wiki + 病友群转发）> 10 万次

## 👥 现有 mentor / 导师

- **@samqin123**（社区主理人 · VitaForge 作者）
- **@复旦肿瘤 9A 团队**（论文范式导师）
- **@学海** **@海翔**（年轻研究者代表 · CMC）
- 招募中：学术 SIG 组长（临床科研方向 + 基础研究方向 各 1 位）

---

**如何认领**：在本 issue 下评论 `我想接手 M8.x，方向 [综述/生信/患者向科普/学位论文/临床科研/基金]，身份 [学生/研究生/临床/PI]，预计 X 天内交付`。

> 💌 **给不敢主动认领的年轻研究者**：**没有"资历不够"这回事**。医学生可以直接来做 M8.4 / M8.2，只要脚本能跑、只要论文脱敏，社区就欢迎。第一次贡献不完美完全没关系，我们的 review 机制就是为了让你成长的喵～ (´｡• ᵕ •｡`) ♡
>
> 💗 **给已发表论文的临床医生 / 研究者**：**M8.3 患者向科普桥梁，是您能为病友做的最珍贵的事之一**。您的 500 字，可能就是一位家属在深夜找方向时抓住的那道光。
