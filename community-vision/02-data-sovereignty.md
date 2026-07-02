<!--
title: 🔒 Pillar 2 · 患者数据主权与隐私安全 · Patient Data Sovereignty
labels: pinned, pillar-2, vision, help-wanted, privacy, security
parent: 00-billboard
-->

> 🔙 **返回** [🌟 社区愿景 BillBoard 顶层 issue #24](https://github.com/PancrePal-xiaoyibao/.github/issues/24)

# 🔒 Pillar 2 · 患者数据主权与隐私安全

> **患者的数据，理应在患者自己手里。不在医院系统里、不在 SaaS 供应商服务器上、不在任何第三方那里 —— 我们要用开源工具证明这件事可以做到。**

## 🌠 为什么这件事重要

- **现状痛点**：一位癌症患者从确诊到治疗，会在 3-5 家医院、10+ 个检查机构留下数据，**每一份数据都不属于患者本人**，患者甚至无法完整获取自己的病历。
- **AI 时代的新风险**：AI 助手需要长期病情上下文才能真正有用，但把所有病情数据传到云端 AI 服务，等同于**把最私密的健康信息交给不透明的第三方**。
- **技术已具备**：本地大模型（llama.cpp / ollama）、本地向量库、E2EE 存储、SQLite + 加密扩展、iOS/Android 的隐私安全底座 —— 所有底层拼图都已开源可用。

**我们的目标**：让每一位病友都能**在自己的电脑或手机上**跑一个"个人健康档案 AI 助手"，所有数据本地存储、本地推理，云端只用来查公共知识库（PubMed 等），患者的病情信息**永远不出本机**。

## 🎯 里程碑清单（M2）

| # | 里程碑 | 难度 | 预估时长 | 状态 |
|:---:|---|:---:|:---:|:---:|
| **M2.1** | 完善 [小图宝](https://github.com/PancrePal-xiaoyibao/ca199_toolbox_donated_by_lihb) 本地肿瘤标志物可视化：新增趋势预测 & 危险值预警 | 🟢 中 | 2 周 | 🔵 待认领 |
| **M2.2** | 完善 [Aura Health Profile](https://github.com/opencare-skillhub/aura_health_profile) 慢性病本地健康助手：适配肿瘤患者场景 | 🟡 高 | 3-4 周 | 🔵 待认领 |
| **M2.3** | **本地 RAG 病情管理助手**：ollama + qdrant + Streamlit 一键部署包，让病友"下载即用" | 🔴 高 | 4-6 周 | 🔵 招募主理人 |
| **M2.4** | **端到端加密的病历同步**：手机 ↔ 电脑同步病情文档，全程 E2EE，服务端只见密文 | 🔴 高 | 6-8 周 | 🔵 招募主理人 |
| **M2.5** | **患者数据权利科普**：写一份 "如何合法获取你在医院的完整病历"（含 HIPAA / 中国个人信息保护法）的 wiki | 🟢 低 | 1 周 | 🟢 好上手 |
| **M2.6** | **威胁模型 & 安全评估**：为小X宝所有应用做一次公开的威胁建模，识别数据泄漏路径 | 🟡 中 | 2-3 周 | 🔵 招募安全志愿者 |

## 🚪 不同人群怎么参与

<table>
<tr>
<td width="33%" valign="top">

### 👨‍💻 开发者 / 安全工程师
- **M2.3 / M2.4** 本地化 + E2EE 是硬核任务
- **M2.6** 威胁建模是**安全从业者的最佳 CV 加分项**
- 完成后可挂 co-maintainer

</td>
<td width="33%" valign="top">

### ⚖️ 法律 / 合规
- **M2.5** 患者数据权利科普
- 帮 review 隐私政策、用户协议
- 联系 [@JudyLU](mailto:) 社区法律顾问

</td>
<td width="33%" valign="top">

### 🩺 医生 / 护士
- 定义临床场景下**必须本地/可上云** 的数据分界
- 提供匿名化测试数据集
- 参与 UX 评审

</td>
</tr>
</table>

## 🔗 相关资源

- **主仓库**：
  - [小图宝](https://github.com/PancrePal-xiaoyibao/ca199_toolbox_donated_by_lihb) · 本地肿瘤标志物可视化
  - [Aura Health Profile](https://github.com/opencare-skillhub/aura_health_profile) · 慢性病个人健康助手
  - [medical-desensitization](https://github.com/PancrePal-xiaoyibao/medical-desensitization) · **医疗数据脱敏工具链**（M2.5 / M2.6 直接抓手）
- **参考项目**：[Signal Protocol](https://signal.org/docs/) · [Ollama](https://ollama.ai/) · [Solid Project](https://solidproject.org/)
- **推荐 skill**：`/api-first` `/code-review` `/security-review`（CodeForge）· `/medical-advisory`（VitaForge）
- **法律依据**：中国《个人信息保护法》、《数据安全法》、《医疗器械监督管理条例》 · 国际 HIPAA / GDPR

## 📈 成功指标

- ✅ 至少 **1 个"零上传"病情 AI 助手** 上线并被 100+ 病友日常使用
- ✅ 完成小X宝生态的**公开威胁建模报告**
- ✅ 患者数据权利科普 wiki 被 **10+ 病友社群** 转载

## 👥 现有 mentor / 导师

- **@JudyLU**（社区法律顾问）
- **@RichardLin**（开源社老师，隐私工程视角）
- 招募中：安全领域 SIG 组长

---

**如何认领**：在本 issue 下评论 `我想接手 M2.x，方向 [开发/法律/临床/安全]，预计 X 天内提 PR / 交付物`。
