<!--
title: 🧬 Pillar 1 · 开源癌症基因图谱 · Open Cancer Genomic Atlas
labels: pinned, pillar-1, vision, help-wanted, good-first-issue-hub
parent: 00-billboard
-->

> 🔙 **返回** [🌟 社区愿景 BillBoard 顶层 issue #24](https://github.com/PancrePal-xiaoyibao/.github/issues/24)

# 🧬 Pillar 1 · 开源癌症基因图谱

> **让全球任何一位肿瘤病友，都能在几分钟内查到自己突变的循证解读、临床试验入组资格、靶向药物匹配、生存曲线参考 —— 免费、开源、隐私保护。**

## 🌠 为什么这件事重要

- **信息鸿沟**：一份基因检测报告，专家能读出 10 层含义，患者只看到"这个基因阳性"。
- **数据垄断**：全球最好的基因-临床联合数据在少数商业平台（OncoKB Pro、Foundation Medicine 等）手里，中国患者难以访问，价格昂贵。
- **开源基础已具备**：TCGA、COSMIC、OncoKB、ClinVar、GTEx、STRING、DGIdb 等数据源都有开放访问接口，缺的是**中文化 / 患者视角 / AI 智能问答 / 隐私安全的本地化搜索**这一层。

**我们的目标**：做出**全球第一个"真正面向患者的开源癌症基因图谱"**，任何一位病友只需要输入基因名或粘贴报告，就能得到"这意味着什么、有哪些循证靶向药、有哪些临床试验、类似患者的治疗预后如何"的**结构化、可追溯、循证** 答案。中文起步，多语言可扩展。

## 🎯 里程碑清单（M1-M8）

| # | 里程碑 | 难度 | 预估时长 | 状态 |
|:---:|---|:---:|:---:|:---:|
| **M1.1** | 完成 [openpancan Phase 1 · COSMIC CGC 基因库对接](https://github.com/PancrePal-xiaoyibao/openpancan/issues/6) | 🟢 中 | 1-2 周 | 🟡 招募中 |
| **M1.2** | 完成 [Phase 2 · TCGA-PAAD 胰腺癌全景数据集成](https://github.com/PancrePal-xiaoyibao/openpancan/issues/7) | 🔴 高 | 2-4 周 | 🟡 招募中 |
| **M1.3** | 完成 [Phase 3 · OncoKB 靶向药物证据等级对接](https://github.com/PancrePal-xiaoyibao/openpancan/issues/8) | 🟢 中 | 1-2 周 | 🟡 招募中 |
| **M1.4** | 完成 [Phase 4 · STRING DB 蛋白互作网络](https://github.com/PancrePal-xiaoyibao/openpancan/issues/9) | 🟢 中 | 1 周 | 🟡 招募中 |
| **M1.5** | 完成 [Phase 5-8 · GTEx / HPO / ClinicalTrials.gov / DGIdb](https://github.com/PancrePal-xiaoyibao/openpancan/issues/10) | 🟢 中 | 2-3 周 | 🟡 招募中 |
| **M1.6** | **患者视角基因解读 Web 前端**：输入 KRAS → 得到中文解读页 | 🟡 前端 | 2-3 周 | 🔵 待认领 |
| **M1.7** | **多癌种复制**：把 openpancan 从胰腺癌扩展到肺癌、乳腺癌、淋巴瘤 | 🔴 高 | 每癌种 3-4 周 | 🔵 招募主理人 |
| **M1.8** | **本地隐私搜索版**：让病友能在自己电脑上跑，不上传任何数据 | 🔴 高 | 4-6 周 | 🔵 待认领 |

> 🎯 [Phase 9 · 测试验证与文档](https://github.com/PancrePal-xiaoyibao/openpancan/issues/14) 也在同步招募中。

## 🚪 不同人群怎么参与

<table>
<tr>
<td width="33%" valign="top">

### 👨‍💻 开发者
- **前端**：M1.6 患者视角展示层
- **后端**：M1.1-1.5 数据管道
- **架构**：M1.8 本地化 + 隐私
- 用 [CodeForge](https://github.com/PancrePal-xiaoyibao/CodeForge) 一句话上手

</td>
<td width="33%" valign="top">

### 🔬 生信 / 研究者
- **数据分析**：TCGA 亚型分析、KM 曲线
- **注释**：细胞类型 / 通路富集
- **对接**：帮忙做数据字典 & 校验
- 用 [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) 走完整 AI4S 流程

</td>
<td width="33%" valign="top">

### 🩺 临床医生
- 定义**患者最想问的 20 个问题**
- Review 中文解读页的临床准确性
- 提供匿名化真实病例做 case study
- 可以只花每周 30 分钟

</td>
</tr>
</table>

## 🔗 相关资源

- **主仓库**：[PancrePal-xiaoyibao/openpancan](https://github.com/PancrePal-xiaoyibao/openpancan)（9 phase 全部有 issue 招募中）
- **参考项目**：[cBioPortal](https://www.cbioportal.org/) · [OncoKB](https://www.oncokb.org/) · [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/)
- **推荐 skill**：`/deep-research` `/ai4s-lab` `/scrna-*`（VitaForge）· `/api-first` `/debug` `/code-review`（CodeForge）
- **推荐 MCP**：PubMed · OpenAlex · GitHub

## 📈 成功指标

- ✅ 覆盖 **6 大癌种** 的完整基因-临床数据集（当前：1 = 胰腺癌）
- ✅ 患者视角 Web 前端**月活 > 1000**
- ✅ 累计**在线可用的靶向药推荐**覆盖 > 200 个基因变异
- ✅ 被至少 **3 家三甲医院** 医生日常使用

## 👥 现有 mentor / 导师

- **@samqin123**（社区主理人 · 全领域 review）
- 招募中：openpancan 主理人（长期 owner，可挂名 co-author）

---

**如何认领**：在里程碑对应的子 issue 下评论 `我想接手 [里程碑编号]，方向 [前端/后端/分析/临床]，预计 X 天内提 PR`。
