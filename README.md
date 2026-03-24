# QreTab v0.3

一个个人使用的 Chrome 新标签页插件骨架，当前包含：

- 新标签页替换（`chrome_url_overrides.newtab`）
- 时间 + 问候语
- 搜索框（Google / Bing / DuckDuckGo）
- 自定义条栏系统（每个 block 是一个条栏）
- 点击条栏 block 后展开该条栏的完整网址条
- 当前条栏内筛选网址（按标题或域名）
- 新增条栏（本地保存）
- 给当前条栏新增网址（本地保存）
- 主题模式与默认搜索引擎持久化（`chrome.storage.local`）

## 目录结构

```text
QreTab/
├── manifest.json
├── newtab.html
├── styles/
│   └── newtab.css
├── scripts/
│   └── newtab.js
└── README.md
```

## 本地加载方式

1. 打开 `chrome://extensions/`
2. 右上角开启开发者模式
3. 点击“加载已解压的扩展程序”
4. 选择当前项目目录 `QreTab`
5. 在扩展卡片中点击“重新加载”可刷新最新改动

## 说明

- 本版本不再依赖 Chrome 书签权限。
- 条栏和网址数据由插件本地维护，互不影响你的系统书签。
