<!--
title: 🤖 Pillar 4 · AI 基建支柱 · AI Infrastructure Backbone
labels: pinned, pillar-4, vision, help-wanted, infrastructure
parent: 00-billboard
-->

> 🔙 **返回** [🌟 社区愿景 BillBoard 顶层 issue #24](https://github.com/PancrePal-xiaoyibao/.github/issues/24)

# 🤖 Pillar 4 · AI 基建支柱

> **让所有 x 宝、蓝马甲、志愿者、研究者、临床医生、患者，都能站在同一套开源、可信、跨平台、可复用的 AI 基础设施上。**

## 🌠 为什么这件事重要

- **每个新病种社区都在重复造轮子**：小胃宝、小肺宝、小妍宝、小铃铛…… 每一次复制都要从头搭 RAG、配 prompt、调 skill —— 效率极低。
- **AI Agent 时代的社区乘数**：一个成熟的 skill package 一旦沉淀，可以被下一个 100 个社区复用 —— 这是**软件复利** vs 项目型开发的关键分野。
- **中国医疗 AI 的独特土壤**：国产大模型（GLM-5.2、DeepSeek、Kimi、MiMo）在 coding 与医学场景已经追平甚至超越国际；社区级"国产 API 一键切换"的教程还不多见。

**我们的目标**：把 [CodeForge](https://github.com/PancrePal-xiaoyibao/CodeForge) 和 [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) 打造成**开源公益 AI 社区最好用的开发脚手架**，让任何一位病友社区主理人、任何一位临床医生、任何一位医学生，都能一句话装、一句话用。

## 🎯 里程碑清单（M4）

| # | 里程碑 | 难度 | 预估时长 | 状态 |
|:---:|---|:---:|:---:|:---:|
| **M4.1** | CodeForge **新增中文 skill**：`/ai-spec-cn` `/prd-cn` `/code-review-cn` 中文原生输出 | 🟢 低 | 1 周 | 🟢 好上手 |
| **M4.2** | CodeForge **国产 API 兼容测试矩阵**：GLM/DeepSeek/Kimi/MiMo/硅基流动 每季度回归 | 🟢 低 | 持续 | 🟢 好上手 |
| **M4.3** | VitaForge **新增 skill**：肿瘤心理支持 · 疼痛管理 · 姑息治疗 · 药物相互作用查询 | 🟡 中 | 每 skill 1-2 周 | 🔵 招募中 |
| **M4.4** | VitaForge **医学 MCP 生态扩充**：新增病理图像 MCP · 影像 DICOM MCP · CDE MCP | 🔴 高 | 4-6 周 | 🔵 招募主理人 |
| **M4.5** | **一键部署到 Docker / Kubernetes**：给医院/科室的本地化部署方案 | 🟡 中 | 2-3 周 | 🔵 待认领 |
| **M4.6** | **多 CLI 支持**：从 Claude/Codex/Gemini 扩展到 Cursor / Cline / OpenClaw / Hermes | 🟡 中 | 每 CLI 1 周 | 🔵 待认领 |
| **M4.7** | **教学视频 & 教程**：15 分钟入门系列（CodeForge / VitaForge 各 1 套） | 🟢 低 | 1 周 | 🟢 好上手 |
| **M4.8** | **Agent 性能与工程优化**：见 [#8 Agent 项目性能与工程优化](https://github.com/PancrePal-xiaoyibao/.github/issues/8) | 🔴 高 | 长期 | 🟡 招募中 |

## 🚪 不同人群怎么参与

<table>
<tr>
<td width="33%" valign="top">

### 👨‍💻 开发者
- **M4.1 / M4.6 / M4.5** 是最直接的贡献路径
- 每完成一个 skill 会自动挂到 CONTRIBUTORS.md
- 用 `/ai-spec` `/skill-governor` 加速

</td>
<td width="33%" valign="top">

### 🩺 医生 / 护士
- **M4.3** 定义临床 skill 的场景与话术
- 帮 review skill 输出的临床准确性
- 可以只花每周 30 分钟评审

</td>
<td width="33%" valign="top">

### 🎥 内容创作者
- **M4.7** 教学视频 / 图文教程
- 发 B 站、公众号、小红书
- 每篇优质教程都会记入 CONTRIBUTORS

</td>
</tr>
</table>

## 🔗 相关资源

- **主仓库**：
  - [CodeForge](https://github.com/PancrePal-xiaoyibao/CodeForge) · 开发者贡献引擎
  - [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) · 医学临床与研究人员引擎
  - [Genie-X-PAL-prompts-center](https://github.com/PancrePal-xiaoyibao/Genie-X-PAL-prompts-center) · **社区共建 AI Agent Prompts 中心**（为病友/家属提供 AI 助手 prompts 库）
  - [fastgpt-rag-kb-automation](https://github.com/PancrePal-xiaoyibao/fastgpt-rag-kb-automation) · FastGPT 知识库自动化 CLI 工具
- **参考项目**：[Superpowers](https://github.com/obra/superpowers) · [Claude Code](https://claude.com/claude-code)
- **推荐 skill**：`/loop-engineer` `/skill-governor` `/skill-deploy`（VitaForge 主调度层）
- **国产 API 文档**：[cn-api-providers.md](https://github.com/PancrePal-xiaoyibao/CodeForge/blob/main/docs/cn-api-providers.md)

## 📈 成功指标

- ✅ CodeForge / VitaForge 累计 **star > 1000**、被 **10+ 病种社区** 采用
- ✅ 至少 **5 个国产大模型** 保持季度回归通过
- ✅ 教学视频系列在 B 站累计 **播放 > 10 万**

## 👥 现有 mentor / 导师

- **@samqin123**（CodeForge / VitaForge 主维护者）
- **@hhx465453939**（PubMed MCP 作者 · MCP 生态导师）
- 招募中：CLI 平台专家（Cursor / Cline / OpenClaw 方向）

---

**如何认领**：在本 issue 下评论 `我想接手 M4.x，方向 [skill/MCP/部署/内容]，预计 X 天内提 PR`。
