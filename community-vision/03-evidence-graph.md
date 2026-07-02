<!--
title: 📚 Pillar 3 · 循证开源知识图谱 · Evidence-Based Knowledge Graph
labels: pinned, pillar-3, vision, help-wanted, evidence, rag
parent: 00-billboard
-->

> 🔙 **返回** [🌟 社区愿景 BillBoard 顶层 issue #24](https://github.com/PancrePal-xiaoyibao/.github/issues/24)

# 📚 Pillar 3 · 循证开源知识图谱

> **打通 PubMed / OpenAlex / 临床指南 / 真实病历，让医生、患者、家属、AI 助手 站在同一份可追溯的证据基础上。**

## 🌠 为什么这件事重要

- **RAG 时代的核心资产不是模型，是知识库**：而肿瘤/罕见病领域高质量的中文循证知识库**几乎不存在**。
- **医患信息落差的根源**：不是医生藏私，是**证据链条太长、太散**，医生自己检索一份高质量证据都要 30 分钟以上，遑论向病友解释。
- **知识图谱 vs 平文本 RAG**：面对癌症这种多维度、多阶段、多亚型的复杂领域，只有**知识图谱**才能表达"某基因-某突变-某分期-某方案-某循证等级"的多重关系，纯向量 RAG 会失去精度。

**我们的目标**：搭建**全网最完整的开源肿瘤循证知识图谱**，把 PubMed 论文、NCCN/ESMO/CSCO 指南、真实临床决策、患者报告 etl 成结构化关系图谱，任何一位小 x 宝助手都能站在这个图谱上做高精度问答。

## 🎯 里程碑清单（M3）

| # | 里程碑 | 难度 | 预估时长 | 状态 |
|:---:|---|:---:|:---:|:---:|
| **M3.1** | 完善 [graphify-xiaoyibao](https://github.com/opencare-skillhub/graphify-xiaoyibao)：输入本地病历 → 抽取关系 → 图谱可视化 | 🟡 高 | 3-4 周 | 🟡 招募中 |
| **M3.2** | **PubMed 全量爬取 & 清洗管道**：胰腺癌/乳腺癌/肺癌全部题录 + 摘要 → 结构化 | 🟢 中 | 2 周 | 🔵 待认领 |
| **M3.3** | **NCCN/CSCO 指南结构化**：把 PDF 指南 → chapter-> recommendation-> evidence level 的结构化 JSON | 🟡 中 | 2-3 周 | 🔵 待认领 |
| **M3.4** | **临床试验图谱**：ClinicalTrials.gov + CDE + WHO ICTRP → 中文病友可查的入组匹配器 | 🔴 高 | 4-6 周 | 🔵 招募主理人 |
| **M3.5** | [Get 笔记 · 知识星云](https://www.biji.com/) 深度集成：让病友能"点点点"构建个人知识库并分享 | 🟢 中 | 1-2 周 | 🔵 待认领 |
| **M3.6** | **KnowS MCP + 秘塔 MCP 融合**：让所有 x 宝助手都能一句话调用医学专用检索 | 🟢 低 | 1 周 | 🟢 好上手 |
| **M3.7** | **循证等级分级机制**：把 GRADE / SIGN / Oxford EBM 等级体系嵌入 AI 回答，标注可信度 | 🟡 中 | 2 周 | 🔵 待认领 |
| **M3.8** | **中文文献补漏**：知网 / 万方 / 维普关键论文的 OpenAlex 补录 | 🟢 中 | 持续 | 🔵 待认领 |

## 🚪 不同人群怎么参与

<table>
<tr>
<td width="25%" valign="top">

### 🔬 研究者
- **M3.2 / M3.3** 数据管道
- **M3.4** 临床试验匹配
- 用 [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) `/deep-research`

</td>
<td width="25%" valign="top">

### 🩺 医生
- **M3.7** 定义循证分级规则
- Review 指南结构化的临床准确性
- 提供真实临床决策场景

</td>
<td width="25%" valign="top">

### 👨‍💻 开发者
- **M3.1** graphify 前端优化
- **M3.5 / M3.6** MCP 集成
- 图数据库工程

</td>
<td width="25%" valign="top">

### 🎓 学生 / 研究生
- **M3.2 / M3.3 / M3.8** 数据清洗
- 精读 top 30 篇癌种综述
- 15 分钟上手 → 学分级贡献

</td>
</tr>
</table>

## 🔗 相关资源

- **主仓库**：
  - [osintel-pancrepal](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal) · ★ **胰腺癌开源情报中心**，Pillar 3 循证情报旗舰应用（正在生产化，见 [issue #3](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal/issues/3)、[#6](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal/issues/6)、[#7](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal/issues/7)、[#9](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal/issues/9)、[#10](https://github.com/PancrePal-xiaoyibao/osintel-pancrepal/issues/10)）
  - [graphify-xiaoyibao](https://github.com/opencare-skillhub/graphify-xiaoyibao) · 病历 → 知识图谱抽取
  - [NCCN_guideline_download](https://github.com/PancrePal-xiaoyibao/NCCN_guideline_download) · **NCCN 指南同步下载**，M3.3 指南结构化的数据源
  - [ctg-rag-genie](https://github.com/PancrePal-xiaoyibao/ctg-rag-genie) · ClinicalTrials.gov + Chictr 抓取 + LLM 中文化，M3.4 临床试验图谱抓手
  - [fastgpt-rag-kb-automation](https://github.com/PancrePal-xiaoyibao/fastgpt-rag-kb-automation) · **RAG 知识库自动化 CLI**（微信文章下载 / 清洗 / 上传）
  - [fastgpt-kb-automation](https://github.com/PancrePal-xiaoyibao/fastgpt-kb-automation) · FastGPT 知识库自动化（另一版本）
  - [pancreapal-osintel](https://github.com/PancrePal-xiaoyibao/pancreapal-osintel) · 全球胰腺癌治疗热点与医疗资源监控（osintel 数据库版）
  - [get-biji-skills](https://github.com/iswalle/getnote-openclaw) · Get 笔记知识星云集成
- **参考项目**：[Wikidata](https://www.wikidata.org/) · [SNOMED CT](https://www.snomed.org/) · [Neo4j Life Sciences](https://neo4j.com/use-cases/life-sciences/)
- **推荐 skill**：`/deep-research` `/paper-reader` `/pubmed-linker` `/extract`（VitaForge）
- **推荐 MCP**：
  - [PubMed MCP · liueic/mcp-pubmed-llm-server](https://www.modelscope.cn/mcp/servers/liueic/mcp-pubmed-llm-server)
  - [OpenAlex MCP · Damncheater/pubmed-openAlex-mcp](https://www.modelscope.cn/mcp/servers/Damncheater/pubmed-openAlex-mcp)
  - [KnowS MCP · caiql2002/mcp-KnowS-AI_medical_service](https://www.modelscope.cn/mcp/servers/caiql2002/mcp-KnowS-AI_medical_service)
  - [秘塔 MCP · Damncheater/metasota-API-MCP](https://www.modelscope.cn/mcp/servers/Damncheater/metasota-API-MCP)

## 📈 成功指标

- ✅ 覆盖 **3 大癌种** 完整循证知识图谱（PubMed + 指南 + 临床试验）
- ✅ 至少 **1 个小 x 宝助手** 全面切换到知识图谱后端，准确率提升 > 20%
- ✅ 累计 **500+** 病友通过临床试验匹配器找到入组机会

## 👥 现有 mentor / 导师

- **@hhx465453939**（PubMed MCP 作者 · 已在 modelscope 使用超 3000 万次）
- 招募中：知识图谱 SIG 组长、指南结构化主理人

---

**如何认领**：在本 issue 下评论 `我想接手 M3.x，方向 [数据/图谱/临床/开发]，预计 X 天内提 PR`。
