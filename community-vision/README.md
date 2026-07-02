# 🌟 Community Vision · BillBoard 目录

> 本目录存放的是**公开宣传型愿景 issue 的 markdown 草稿**。等主人 review 完成后，浮浮酱会用 `gh issue create` 命令把它们一次性发到线上，并挂到组织级 Public Project 看板。

## 📁 目录结构

| 文件 | 用途 | 目标 issue 位置 |
|---|---|---|
| [00-billboard.md](./00-billboard.md) | 🌟 愿景 BillBoard 顶层 issue（总纲） | pin 到 org 主页 |
| [01-genomic-atlas.md](./01-genomic-atlas.md) | 🧬 Pillar 1 · 开源癌症基因图谱 | .github issue |
| [02-data-sovereignty.md](./02-data-sovereignty.md) | 🔒 Pillar 2 · 患者数据主权与隐私安全 | .github issue |
| [03-evidence-graph.md](./03-evidence-graph.md) | 📚 Pillar 3 · 循证开源知识图谱 | .github issue |
| [04-ai-infrastructure.md](./04-ai-infrastructure.md) | 🤖 Pillar 4 · AI 基建支柱 | .github issue |
| [05-companion.md](./05-companion.md) | 🩺 Pillar 5 · AI+蓝马甲全病程陪伴 | .github issue |
| [06-life-support.md](./06-life-support.md) | 💊 Pillar 6 · 并发症与生活支持库 | .github issue |
| [07-methodology-replication.md](./07-methodology-replication.md) | 🌐 Pillar 7 · 跨癌种方法学复制 | .github issue |
| [08-academic-hub.md](./08-academic-hub.md) | 🎓 Pillar 8 · 学术共建：综述/生信/预印本/脚本 | .github issue |

## 🎯 定位说明

**这是"公开宣传通道"**：任何人访问都能看到、能认领、能贡献。

**与私域"飞书志愿者体系"的关系**：并行独立、相互补充。
- 私域：深度志愿者、有敏感度的合作项目、导师制、内部知识库
- 公域（本目录）：招募橱窗、低门槛任务池、社区宣传阵地

## 🏗️ Project 看板结构（推荐）

**推荐组织级 Public Project 命名**：`Community Vision BillBoard 2026`

**Project URL**：`https://github.com/orgs/PancrePal-xiaoyibao/projects/<new-id>`

### 看板列（Columns）

| 列 | 含义 | 谁能移动 |
|---|---|---|
| 📥 **Backlog** | 已发布但未有人认领的里程碑 | 自动进入 |
| 🎯 **Claimed** | 志愿者已评论认领，社区管理员确认 | 社区管理员 |
| 🚧 **In Progress** | 认领者开始工作 | 认领者 self-move |
| 👀 **Review** | 提了 PR，等 review | 自动（PR opened） |
| ✅ **Merged** | PR 合并 | 自动（PR merged） |
| 🚀 **Shipped** | 已上线并给社区带来实际价值 | 社区管理员 |

### 自定义字段（Custom Fields）

| 字段 | 类型 | 选项 |
|---|---|---|
| **Pillar** | Single select | Pillar 1-8 |
| **难度** | Single select | 🟢 好上手 · 🟡 中等 · 🔴 高难度 |
| **角色** | Multi select | 👨‍💻 开发 · 🩺 临床 · 🔬 研究 · 🎓 学生 · ❤️ 病友 · 🥗 营养 · 🧠 心理 · 🎨 设计 · 📢 传播 |
| **预估时长** | Text | 例："2 周" |
| **Mentor** | GitHub user | @samqin123 等 |
| **认领者** | GitHub user | 从评论自动 sync |
| **开始日期** | Date | |
| **目标完成日期** | Date | |

### 视图（Views）

1. **📋 Board**：默认看板视图，按 Column 分组
2. **🏛️ Pillar View**：按 Pillar 分组，横向对比进度
3. **🎯 Good First Issue**：只显示"好上手"任务，专给新手
4. **⏰ 时间线**：按目标完成日期排序，看季度节奏
5. **👥 我的认领**：按认领者过滤，个人视图

## 🏷️ 标签体系（Labels）

所有 issue 用统一标签，便于跨仓库检索：

### 类型标签
- `vision` · 愿景 issue
- `billboard` · BillBoard 顶层
- `pillar-1` `pillar-2` ... `pillar-8` · 对应支柱
- `milestone` · 里程碑级子任务

### 认领标签
- `good-first-issue` · 好上手，欢迎新玩家
- `help-wanted` · 招募中
- `mentor-available` · 有导师可以带
- `claimed` · 已被认领
- `in-progress` · 进行中
- `blocked` · 卡住了，需要帮助

### 角色标签
- `role-developer` · 开发者
- `role-clinician` · 临床医生 / 护士
- `role-researcher` · 研究者
- `role-student` · 学生
- `role-patient-family` · 病友家属
- `role-designer` · 设计者
- `role-content-creator` · 内容创作者

### 领域标签
- `domain-genomics` · 基因组学
- `domain-security` · 安全与隐私
- `domain-evidence` · 循证医学
- `domain-nlp` · NLP / RAG
- `domain-clinical` · 临床
- `domain-companion` · 陪伴关怀
- `domain-academic` · 学术

## 📝 新 issue 提交模板（社区管理员后续用）

```markdown
<!--
title: <emoji> 里程碑标题
labels: pillar-<n>, milestone, good-first-issue / help-wanted, role-<role>, domain-<domain>
parent: 对应 Pillar issue #号
-->

## 📖 背景
（本里程碑属于哪个 Pillar，为什么重要）

## 🎯 交付什么
- [ ] 具体交付物 1
- [ ] 具体交付物 2
- [ ] 具体交付物 3

## 🚀 建议流程
1. 用 [CodeForge](https://github.com/PancrePal-xiaoyibao/CodeForge) 或 [VitaForge](https://github.com/PancrePal-xiaoyibao/VitaForge) 部署 Agent
2. 跑 `/xxx` skill
3. ...
4. 提 PR

## 🔗 相关
- 相关仓库：
- 相关 skill：
- 相关 MCP：
- 参考文档：

## 👥 Mentor
@... （可选）

## 📅 预估
- 难度：🟢 / 🟡 / 🔴
- 预估时长：X 天 / 周
```

## 🚀 落地检查清单（等主人 review 通过后执行）

- [ ] 在 GitHub 上创建组织级 Public Project：`Community Vision BillBoard 2026`
- [ ] 配置 Custom Fields 与 6 个 Views
- [ ] 创建标签体系（可以用 `gh label create` 批量）
- [ ] 用 `gh issue create` 依次发布 9 个 issue（1 BillBoard + 8 Pillar）
- [ ] 把 BillBoard issue **pin 到组织** 与 **.github 仓库** 的主页
- [ ] 更新每个 Pillar issue 里对其他 Pillar 的相对链接为**线上 issue 编号**
- [ ] 更新 [profile/README.md](../profile/README.md) 的 BillBoard 卡片链接
- [ ] 在 CodeForge / VitaForge README 中也加一条"看看社区愿景"入口
- [ ] （可选）加一个 GitHub Actions workflow，在 issue assigned/closed 时 @mention org owners

## 📌 版本记录

- **v1.0** · 2026-07-02 · 初稿完成（1 BillBoard + 8 Pillar + Project 结构 + 标签体系 + issue 模板）
