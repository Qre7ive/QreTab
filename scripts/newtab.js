const STORAGE_KEY = "qretab:v3";

const SECRET_GROUP_TRIGGERS = new Set(["././", "。/。/"]);
const SECRET_GROUP_NAME = "Midnight Vault";

const SEARCH_ENGINES = {
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
};

const I18N = {
  zh: {
    settingsButton: "设置",
    searchPlaceholder: "输入关键词后回车",
    searchButton: "搜索",
    entryTitle: "访问入口",
    refreshButton: "刷新",
    addGroupButton: "新增分组",
    panelNoSelection: "未选择分组",
    addLinkButton: "新增网址",
    activeFolderMeta: "共 {count} 条网址",

    settingsTitle: "QreTab 设置",
    close: "关闭",
    themeLabel: "主题模式",
    themeAuto: "跟随系统",
    themeLight: "浅色",
    themeDark: "深色",
    searchEngineLabel: "默认搜索引擎",
    languageLabel: "语言",
    languageZh: "中文",
    languageEn: "English",

    groupDialogTitle: "新增分组",
    groupNameLabel: "分组名称",
    groupNamePlaceholder: "例如：AI",
    createButton: "创建",

    linkDialogTitle: "新增网址到当前分组",
    linkNameLabel: "网址名称",
    linkNamePlaceholder: "例如：ChatGPT",
    linkUrlLabel: "网址",
    linkUrlPlaceholder: "例如：chatgpt.com",
    saveButton: "保存",

    alertSelectGroupToAddLink: "请先选择一个分组，再新增网址。",
    alertSelectGroup: "请先选择一个分组。",
    alertInvalidLink: "请输入有效的网址名称和地址，例如 chatgpt.com",
    renameGroupPrompt: "重命名分组",
    renameLinkPrompt: "重命名网址",
    renameGroupAction: "重命名分组",
    deleteGroupAction: "删除分组",
    confirmDeleteGroup: "确认删除分组“{name}”？",
    renameLinkAction: "重命名网址",
    deleteLinkAction: "删除网址",
    confirmDeleteLink: "确认删除网址“{name}”？",

    helloMorning: "早上好",
    helloNoon: "中午好",
    helloAfternoon: "下午好",
    helloEvening: "晚上好",
  },
  en: {
    settingsButton: "Settings",
    searchPlaceholder: "Type a query and press Enter",
    searchButton: "Search",
    entryTitle: "Access Hub",
    refreshButton: "Refresh",
    addGroupButton: "Add Group",
    panelNoSelection: "No Group Selected",
    addLinkButton: "Add Link",
    activeFolderMeta: "{count} links",

    settingsTitle: "QreTab Settings",
    close: "Close",
    themeLabel: "Theme",
    themeAuto: "System",
    themeLight: "Light",
    themeDark: "Dark",
    searchEngineLabel: "Default Search Engine",
    languageLabel: "Language",
    languageZh: "中文",
    languageEn: "English",

    groupDialogTitle: "Add Group",
    groupNameLabel: "Group Name",
    groupNamePlaceholder: "e.g. AI",
    createButton: "Create",

    linkDialogTitle: "Add Link to Current Group",
    linkNameLabel: "Link Name",
    linkNamePlaceholder: "e.g. ChatGPT",
    linkUrlLabel: "URL",
    linkUrlPlaceholder: "e.g. chatgpt.com",
    saveButton: "Save",

    alertSelectGroupToAddLink: "Please select a group before adding a link.",
    alertSelectGroup: "Please select a group first.",
    alertInvalidLink: "Please enter a valid link name and URL, such as chatgpt.com",
    renameGroupPrompt: "Rename group",
    renameLinkPrompt: "Rename link",
    renameGroupAction: "Rename group",
    deleteGroupAction: "Delete group",
    confirmDeleteGroup: "Delete group \"{name}\"?",
    renameLinkAction: "Rename link",
    deleteLinkAction: "Delete link",
    confirmDeleteLink: "Delete link \"{name}\"?",

    helloMorning: "Good morning",
    helloNoon: "Good afternoon",
    helloAfternoon: "Good afternoon",
    helloEvening: "Good evening",
  },
};

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createDefaultState() {
  return {
    theme: "auto",
    searchEngine: "google",
    language: "zh",
    activeFolderId: null,
    folders: [
      {
        id: createId(),
        title: "AI",
        bookmarks: [
          { id: createId(), title: "ChatGPT", url: "https://chatgpt.com" },
          { id: createId(), title: "Gemini", url: "https://gemini.google.com" },
        ],
      },
    ],
  };
}

const refs = {
  greeting: document.getElementById("greeting"),
  dateText: document.getElementById("dateText"),
  timeText: document.getElementById("timeText"),
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),
  searchSubmitBtn: document.getElementById("searchSubmitBtn"),
  engineSelect: document.getElementById("engineSelect"),

  settingsBtn: document.getElementById("settingsBtn"),
  settingsDialog: document.getElementById("settingsDialog"),
  settingsTitle: document.getElementById("settingsTitle"),
  settingsCloseBtn: document.getElementById("settingsCloseBtn"),
  themeLabel: document.getElementById("themeLabel"),
  themeSelect: document.getElementById("themeSelect"),
  themeAutoOption: document.getElementById("themeAutoOption"),
  themeLightOption: document.getElementById("themeLightOption"),
  themeDarkOption: document.getElementById("themeDarkOption"),
  settingsEngineLabel: document.getElementById("settingsEngineLabel"),
  settingsEngineSelect: document.getElementById("settingsEngineSelect"),
  languageLabel: document.getElementById("languageLabel"),
  languageSelect: document.getElementById("languageSelect"),
  languageZhOption: document.getElementById("languageZhOption"),
  languageEnOption: document.getElementById("languageEnOption"),

  entryTitle: document.getElementById("entryTitle"),
  folderGrid: document.getElementById("folderGrid"),
  activeFolderPanel: document.getElementById("activeFolderPanel"),
  activeFolderName: document.getElementById("activeFolderName"),
  bookmarkRow: document.getElementById("bookmarkRow"),
  refreshFoldersBtn: document.getElementById("refreshFoldersBtn"),
  addFolderBtn: document.getElementById("addFolderBtn"),
  addBookmarkBtn: document.getElementById("addBookmarkBtn"),
  folderContextMenu: document.getElementById("folderContextMenu"),
  folderRenameAction: document.getElementById("folderRenameAction"),
  folderDeleteAction: document.getElementById("folderDeleteAction"),
  bookmarkContextMenu: document.getElementById("bookmarkContextMenu"),
  bookmarkRenameAction: document.getElementById("bookmarkRenameAction"),
  bookmarkDeleteAction: document.getElementById("bookmarkDeleteAction"),

  folderDialog: document.getElementById("folderDialog"),
  folderDialogTitle: document.getElementById("folderDialogTitle"),
  folderCloseBtn: document.getElementById("folderCloseBtn"),
  folderForm: document.getElementById("folderForm"),
  folderNameLabel: document.getElementById("folderNameLabel"),
  folderNameInput: document.getElementById("folderNameInput"),
  folderCreateBtn: document.getElementById("folderCreateBtn"),

  bookmarkDialog: document.getElementById("bookmarkDialog"),
  bookmarkDialogTitle: document.getElementById("bookmarkDialogTitle"),
  bookmarkCloseBtn: document.getElementById("bookmarkCloseBtn"),
  bookmarkForm: document.getElementById("bookmarkForm"),
  bookmarkTitleLabel: document.getElementById("bookmarkTitleLabel"),
  bookmarkTitleInput: document.getElementById("bookmarkTitleInput"),
  bookmarkUrlLabel: document.getElementById("bookmarkUrlLabel"),
  bookmarkUrlInput: document.getElementById("bookmarkUrlInput"),
  bookmarkSaveBtn: document.getElementById("bookmarkSaveBtn"),
};

let state = createDefaultState();
let draggingFolderId = null;
let draggingBookmarkId = null;
let contextMenuFolderId = null;
let contextMenuBookmarkId = null;

function t(key, vars = {}) {
  const langPack = I18N[state.language] || I18N.zh;
  const fallback = I18N.zh[key] || key;
  const template = langPack[key] || fallback;

  return Object.entries(vars).reduce((text, [name, value]) => {
    return text.replaceAll(`{${name}}`, String(value));
  }, template);
}

function hasChromeStorage() {
  return typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
}

function normalizeUrl(rawUrl) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.href;
  } catch (_error) {
    return null;
  }
}

function shortUrl(fullUrl) {
  try {
    const parsed = new URL(fullUrl);
    return parsed.hostname.replace(/^www\./i, "");
  } catch (_error) {
    return fullUrl;
  }
}

function getThemeByPreference(theme) {
  if (theme === "light" || theme === "dark") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(themeSetting) {
  const resolvedTheme = getThemeByPreference(themeSetting);
  document.documentElement.dataset.theme = resolvedTheme;
}

function syncFormValues() {
  refs.engineSelect.value = state.searchEngine;
  refs.settingsEngineSelect.value = state.searchEngine;
  refs.themeSelect.value = state.theme;
  refs.languageSelect.value = state.language;
}

function applyI18n() {
  document.documentElement.lang = state.language === "en" ? "en" : "zh-CN";

  refs.settingsBtn.textContent = "⚙️";
  refs.settingsBtn.title = t("settingsButton");
  refs.settingsBtn.setAttribute("aria-label", t("settingsButton"));
  refs.searchInput.placeholder = t("searchPlaceholder");
  refs.searchSubmitBtn.textContent = t("searchButton");

  refs.entryTitle.textContent = t("entryTitle");
  refs.refreshFoldersBtn.textContent = t("refreshButton");
  refs.addFolderBtn.textContent = t("addGroupButton");
  refs.addBookmarkBtn.textContent = t("addLinkButton");
  refs.folderRenameAction.textContent = t("renameGroupAction");
  refs.folderDeleteAction.textContent = t("deleteGroupAction");
  refs.bookmarkRenameAction.textContent = t("renameLinkAction");
  refs.bookmarkDeleteAction.textContent = t("deleteLinkAction");

  refs.settingsTitle.textContent = t("settingsTitle");
  refs.settingsCloseBtn.textContent = t("close");
  refs.themeLabel.textContent = t("themeLabel");
  refs.themeAutoOption.textContent = t("themeAuto");
  refs.themeLightOption.textContent = t("themeLight");
  refs.themeDarkOption.textContent = t("themeDark");
  refs.settingsEngineLabel.textContent = t("searchEngineLabel");
  refs.languageLabel.textContent = t("languageLabel");
  refs.languageZhOption.textContent = t("languageZh");
  refs.languageEnOption.textContent = t("languageEn");

  refs.folderDialogTitle.textContent = t("groupDialogTitle");
  refs.folderCloseBtn.textContent = t("close");
  refs.folderNameLabel.textContent = t("groupNameLabel");
  refs.folderNameInput.placeholder = t("groupNamePlaceholder");
  refs.folderCreateBtn.textContent = t("createButton");

  refs.bookmarkDialogTitle.textContent = t("linkDialogTitle");
  refs.bookmarkCloseBtn.textContent = t("close");
  refs.bookmarkTitleLabel.textContent = t("linkNameLabel");
  refs.bookmarkTitleInput.placeholder = t("linkNamePlaceholder");
  refs.bookmarkUrlLabel.textContent = t("linkUrlLabel");
  refs.bookmarkUrlInput.placeholder = t("linkUrlPlaceholder");
  refs.bookmarkSaveBtn.textContent = t("saveButton");

  if (!getActiveFolder()) {
    refs.activeFolderName.textContent = t("panelNoSelection");
  }

  updateRefreshButtonVisibility();
}

function updateClock() {
  const now = new Date();
  const hour = now.getHours();

  let hello = t("helloEvening");
  if (hour >= 5 && hour < 11) hello = t("helloMorning");
  if (hour >= 11 && hour < 14) hello = t("helloNoon");
  if (hour >= 14 && hour < 18) hello = t("helloAfternoon");

  refs.greeting.textContent = state.language === "en" ? hello + ", 7ING" : hello + "，7ING";

  const locale = state.language === "en" ? "en-GB" : "zh-CN";

  refs.dateText.textContent = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  refs.timeText.textContent = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

function closeFolderContextMenu() {
  contextMenuFolderId = null;
  refs.folderContextMenu.classList.add("hidden-block");
  refs.folderContextMenu.style.left = "";
  refs.folderContextMenu.style.top = "";
}

function openFolderContextMenu(folderId, clientX, clientY) {
  closeBookmarkContextMenu();
  contextMenuFolderId = folderId;
  refs.folderContextMenu.classList.remove("hidden-block");

  const menu = refs.folderContextMenu;
  const padding = 8;
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  const left = Math.max(padding, Math.min(clientX, window.innerWidth - width - padding));
  const top = Math.max(padding, Math.min(clientY, window.innerHeight - height - padding));

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function closeBookmarkContextMenu() {
  contextMenuBookmarkId = null;
  refs.bookmarkContextMenu.classList.add("hidden-block");
  refs.bookmarkContextMenu.style.left = "";
  refs.bookmarkContextMenu.style.top = "";
}

function openBookmarkContextMenu(bookmarkId, clientX, clientY) {
  closeFolderContextMenu();
  contextMenuBookmarkId = bookmarkId;
  refs.bookmarkContextMenu.classList.remove("hidden-block");

  const menu = refs.bookmarkContextMenu;
  const padding = 8;
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  const left = Math.max(padding, Math.min(clientX, window.innerWidth - width - padding));
  const top = Math.max(padding, Math.min(clientY, window.innerHeight - height - padding));

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

async function renameFolderById(folderId) {
  const folder = state.folders.find((item) => item.id === folderId);
  if (!folder) return;

  const nextName = prompt(t("renameGroupPrompt"), folder.title);
  if (nextName === null) return;

  const normalized = nextName.trim();
  if (!normalized || normalized === folder.title) return;

  folder.title = normalized;
  await saveState();
  renderFolderGrid();
  renderActiveFolderPanel();
}

async function deleteFolderById(folderId) {
  const folder = state.folders.find((item) => item.id === folderId);
  if (!folder) return;

  const confirmed = confirm(t("confirmDeleteGroup", { name: folder.title }));
  if (!confirmed) return;

  state.folders = state.folders.filter((item) => item.id !== folderId);
  if (state.activeFolderId === folderId) {
    state.activeFolderId = null;
  }

  await saveState();
  refreshFolderData();
}

async function renameBookmarkById(bookmarkId) {
  const activeFolder = getActiveFolder();
  if (!activeFolder) return;

  const bookmark = activeFolder.bookmarks.find((item) => item.id === bookmarkId);
  if (!bookmark) return;

  const currentTitle = bookmark.title || shortUrl(bookmark.url);
  const nextName = prompt(t("renameLinkPrompt"), currentTitle);
  if (nextName === null) return;

  const normalized = nextName.trim();
  if (!normalized || normalized === currentTitle) return;

  bookmark.title = normalized;
  await saveState();
  renderFolderGrid();
  renderActiveFolderPanel();
}

async function deleteBookmarkById(bookmarkId) {
  const activeFolder = getActiveFolder();
  if (!activeFolder) return;

  const bookmark = activeFolder.bookmarks.find((item) => item.id === bookmarkId);
  if (!bookmark) return;

  const bookmarkName = bookmark.title || shortUrl(bookmark.url);
  const confirmed = confirm(t("confirmDeleteLink", { name: bookmarkName }));
  if (!confirmed) return;

  activeFolder.bookmarks = activeFolder.bookmarks.filter((item) => item.id !== bookmarkId);
  await saveState();
  renderFolderGrid();
  renderActiveFolderPanel();
}

function createTag(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (typeof text === "string") node.textContent = text;
  return node;
}

function normalizeBookmark(item) {
  if (!item || typeof item !== "object") return null;

  const url = normalizeUrl(String(item.url || ""));
  if (!url) return null;

  const title = String(item.title || "").trim() || shortUrl(url);
  return {
    id: typeof item.id === "string" ? item.id : createId(),
    title,
    url,
  };
}

function normalizeFolder(folder) {
  if (!folder || typeof folder !== "object") return null;

  const title = String(folder.title || "").trim();
  if (!title) return null;

  const bookmarks = Array.isArray(folder.bookmarks)
    ? folder.bookmarks.map(normalizeBookmark).filter(Boolean)
    : [];

  return {
    id: typeof folder.id === "string" ? folder.id : createId(),
    title,
    bookmarks,
  };
}

function normalizeLoadedState(raw) {
  if (!raw || typeof raw !== "object") {
    return createDefaultState();
  }

  const fallback = createDefaultState();
  const folders = Array.isArray(raw.folders)
    ? raw.folders.map(normalizeFolder).filter(Boolean)
    : fallback.folders;

  return {
    theme: ["auto", "light", "dark"].includes(raw.theme) ? raw.theme : fallback.theme,
    searchEngine: Object.hasOwn(SEARCH_ENGINES, raw.searchEngine) ? raw.searchEngine : fallback.searchEngine,
    language: ["zh", "en"].includes(raw.language) ? raw.language : fallback.language,
    activeFolderId: typeof raw.activeFolderId === "string" ? raw.activeFolderId : null,
    folders: folders.length ? folders : fallback.folders,
  };
}

async function storageGet() {
  if (hasChromeStorage()) {
    return new Promise((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        resolve(result[STORAGE_KEY] ?? null);
      });
    });
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function storageSet(data) {
  if (hasChromeStorage()) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEY]: data }, () => resolve());
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function loadState() {
  const saved = await storageGet();
  return normalizeLoadedState(saved);
}

function isSecretTrigger(title) {
  return SECRET_GROUP_TRIGGERS.has(title);
}

function isSecretFolder(folder) {
  return Boolean(folder && folder.isSecret);
}

function revealSecretFolder() {
  let secretFolder = state.folders.find((folder) => isSecretFolder(folder));

  if (!secretFolder) {
    secretFolder = {
      id: createId(),
      title: SECRET_GROUP_NAME,
      bookmarks: [],
      isSecret: true,
    };
    state.folders.unshift(secretFolder);
  }

  state.activeFolderId = secretFolder.id;
  return secretFolder;
}

function clearSecretFolders() {
  if (!Array.isArray(state.folders)) return false;

  const previousLength = state.folders.length;
  state.folders = state.folders.filter((folder) => !isSecretFolder(folder));

  if (state.folders.length === previousLength) {
    return false;
  }

  if (!state.folders.some((folder) => folder.id === state.activeFolderId)) {
    state.activeFolderId = null;
  }

  return true;
}

function buildStorageSnapshot() {
  const folders = (Array.isArray(state.folders) ? state.folders : [])
    .filter((folder) => !isSecretFolder(folder))
    .map((folder) => ({
      id: folder.id,
      title: folder.title,
      bookmarks: (Array.isArray(folder.bookmarks) ? folder.bookmarks : []).map((bookmark) => ({
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
      })),
    }));

  const activeFolderId = folders.some((folder) => folder.id === state.activeFolderId)
    ? state.activeFolderId
    : null;

  return {
    theme: state.theme,
    searchEngine: state.searchEngine,
    language: state.language,
    activeFolderId,
    folders,
  };
}

async function saveState() {
  await storageSet(buildStorageSnapshot());
}

function getActiveFolder() {
  if (!state.activeFolderId) return null;
  return state.folders.find((folder) => folder.id === state.activeFolderId) ?? null;
}

function updateRefreshButtonVisibility() {
  const activeFolder = getActiveFolder();
  const shouldShow = isSecretFolder(activeFolder);
  refs.refreshFoldersBtn.classList.toggle("hidden-block", !shouldShow);
}

function refreshFolderData() {
  if (!Array.isArray(state.folders)) {
    state.folders = createDefaultState().folders;
  }

  if (state.activeFolderId && !getActiveFolder()) {
    state.activeFolderId = null;
  }

  renderFolderGrid();
  renderActiveFolderPanel();
}

function moveFolderToTarget(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return false;

  const sourceIndex = state.folders.findIndex((folder) => folder.id === sourceId);
  const targetIndex = state.folders.findIndex((folder) => folder.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0) return false;

  const [moved] = state.folders.splice(sourceIndex, 1);
  const adjustedTargetIndex = state.folders.findIndex((folder) => folder.id === targetId);
  if (adjustedTargetIndex < 0) return false;

  const insertIndex = sourceIndex < targetIndex ? adjustedTargetIndex + 1 : adjustedTargetIndex;
  state.folders.splice(insertIndex, 0, moved);
  return true;
}

function moveBookmarkToTarget(sourceId, targetId) {
  const activeFolder = getActiveFolder();
  if (!activeFolder || !sourceId || !targetId || sourceId === targetId) return false;

  const sourceIndex = activeFolder.bookmarks.findIndex((item) => item.id === sourceId);
  const targetIndex = activeFolder.bookmarks.findIndex((item) => item.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0) return false;

  const [moved] = activeFolder.bookmarks.splice(sourceIndex, 1);
  const adjustedTargetIndex = activeFolder.bookmarks.findIndex((item) => item.id === targetId);
  if (adjustedTargetIndex < 0) return false;

  const insertIndex = sourceIndex < targetIndex ? adjustedTargetIndex + 1 : adjustedTargetIndex;
  activeFolder.bookmarks.splice(insertIndex, 0, moved);
  return true;
}

function renderFolderGrid() {
  refs.folderGrid.innerHTML = "";

  if (!state.folders.length) {
    return;
  }

  for (const folder of state.folders) {
    const block = createTag("button", "folder-block");
    block.type = "button";
    block.draggable = true;
    if (folder.id === state.activeFolderId) {
      block.classList.add("active");
    }

    const title = createTag("p", "folder-title", folder.title);
    block.append(title);
    block.addEventListener("click", async () => {
      closeFolderContextMenu();
      closeBookmarkContextMenu();
      state.activeFolderId = folder.id;
      await saveState();
      renderFolderGrid();
      renderActiveFolderPanel();
    });

    block.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      openFolderContextMenu(folder.id, event.clientX, event.clientY);
    });

    block.addEventListener("dragstart", (event) => {
      draggingFolderId = folder.id;
      block.classList.add("dragging");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", folder.id);
      }
    });

    block.addEventListener("dragover", (event) => {
      if (!draggingFolderId || draggingFolderId === folder.id) return;

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }

      block.classList.add("drag-over");
    });

    block.addEventListener("dragleave", (event) => {
      const related = event.relatedTarget;
      if (related && block.contains(related)) return;

      block.classList.remove("drag-over");
    });

    block.addEventListener("drop", async (event) => {
      event.preventDefault();
      block.classList.remove("drag-over");

      const sourceId = draggingFolderId || event.dataTransfer?.getData("text/plain");
      if (!sourceId || sourceId === folder.id) return;

      const moved = moveFolderToTarget(sourceId, folder.id);
      if (!moved) return;

      await saveState();
      renderFolderGrid();
      renderActiveFolderPanel();
    });

    block.addEventListener("dragend", () => {
      draggingFolderId = null;
      block.classList.remove("dragging");
      document.querySelectorAll(".folder-block.drag-over").forEach((node) => {
        node.classList.remove("drag-over");
      });
    });

    refs.folderGrid.append(block);
  }
}

function renderActiveFolderPanel() {
  const activeFolder = getActiveFolder();
  if (!activeFolder) {
    refs.activeFolderPanel.classList.add("hidden-block");
    refs.activeFolderName.textContent = t("panelNoSelection");
    updateRefreshButtonVisibility();
    return;
  }

  refs.activeFolderPanel.classList.remove("hidden-block");
  refs.activeFolderName.textContent = activeFolder.title;
  updateRefreshButtonVisibility();

  const allBookmarks = activeFolder.bookmarks;
  refs.bookmarkRow.innerHTML = "";

  for (const item of allBookmarks) {
    const anchor = createTag("a", "bookmark-pill");
    anchor.href = item.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";

    const title = createTag("span", "bookmark-title", item.title || shortUrl(item.url));
    const host = createTag("span", "bookmark-host", shortUrl(item.url));
    anchor.append(title, host);
    anchor.draggable = true;

    anchor.addEventListener("dragstart", (event) => {
      draggingBookmarkId = item.id;
      anchor.classList.add("dragging");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", item.id);
      }
    });

    anchor.addEventListener("dragover", (event) => {
      if (!draggingBookmarkId || draggingBookmarkId === item.id) return;

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }

      anchor.classList.add("drag-over");
    });

    anchor.addEventListener("dragleave", (event) => {
      const related = event.relatedTarget;
      if (related && anchor.contains(related)) return;

      anchor.classList.remove("drag-over");
    });

    anchor.addEventListener("drop", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      anchor.classList.remove("drag-over");

      const sourceId = draggingBookmarkId || event.dataTransfer?.getData("text/plain");
      if (!sourceId || sourceId === item.id) return;

      const moved = moveBookmarkToTarget(sourceId, item.id);
      if (!moved) return;

      await saveState();
      renderFolderGrid();
      renderActiveFolderPanel();
    });

    anchor.addEventListener("dragend", () => {
      draggingBookmarkId = null;
      anchor.classList.remove("dragging");
      document.querySelectorAll(".bookmark-pill.drag-over").forEach((node) => {
        node.classList.remove("drag-over");
      });
    });

    anchor.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openBookmarkContextMenu(item.id, event.clientX, event.clientY);
    });

    refs.bookmarkRow.append(anchor);
  }
}

function attachListeners() {
  refs.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = refs.searchInput.value.trim();
    if (!query) return;

    const engine = SEARCH_ENGINES[state.searchEngine] ?? SEARCH_ENGINES.google;
    window.location.href = `${engine}${encodeURIComponent(query)}`;
  });


  refs.engineSelect.addEventListener("change", async (event) => {
    state.searchEngine = event.target.value;
    refs.settingsEngineSelect.value = state.searchEngine;
    await saveState();
  });

  refs.settingsEngineSelect.addEventListener("change", async (event) => {
    state.searchEngine = event.target.value;
    refs.engineSelect.value = state.searchEngine;
    await saveState();
  });

  refs.themeSelect.addEventListener("change", async (event) => {
    state.theme = event.target.value;
    applyTheme(state.theme);
    await saveState();
  });

  refs.languageSelect.addEventListener("change", async (event) => {
    state.language = event.target.value;
    applyI18n();
    updateClock();
    renderFolderGrid();
    renderActiveFolderPanel();
    await saveState();
  });

  refs.settingsBtn.addEventListener("click", () => {
    closeFolderContextMenu();
    closeBookmarkContextMenu();
    refs.settingsDialog.showModal();
  });

  refs.folderRenameAction.addEventListener("click", async () => {
    const folderId = contextMenuFolderId;
    closeFolderContextMenu();
    if (!folderId) return;
    await renameFolderById(folderId);
  });

  refs.folderDeleteAction.addEventListener("click", async () => {
    const folderId = contextMenuFolderId;
    closeFolderContextMenu();
    if (!folderId) return;
    await deleteFolderById(folderId);
  });

  refs.bookmarkRenameAction.addEventListener("click", async () => {
    const bookmarkId = contextMenuBookmarkId;
    closeBookmarkContextMenu();
    if (!bookmarkId) return;
    await renameBookmarkById(bookmarkId);
  });

  refs.bookmarkDeleteAction.addEventListener("click", async () => {
    const bookmarkId = contextMenuBookmarkId;
    closeBookmarkContextMenu();
    if (!bookmarkId) return;
    await deleteBookmarkById(bookmarkId);
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const inFolderMenu = refs.folderContextMenu.contains(event.target);
    const inBookmarkMenu = refs.bookmarkContextMenu.contains(event.target);
    if (inFolderMenu || inBookmarkMenu) return;

    closeFolderContextMenu();
    closeBookmarkContextMenu();
  });

  document.addEventListener("contextmenu", (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.closest(".folder-block") || event.target.closest("#folderContextMenu")) return;
    if (event.target.closest(".bookmark-pill") || event.target.closest("#bookmarkContextMenu")) return;

    closeFolderContextMenu();
    closeBookmarkContextMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFolderContextMenu();
      closeBookmarkContextMenu();
    }
  });

  refs.refreshFoldersBtn.addEventListener("click", async () => {
    closeFolderContextMenu();
    closeBookmarkContextMenu();
    const removed = clearSecretFolders();
    if (removed) {
      await saveState();
    }
    refreshFolderData();
  });

  refs.addFolderBtn.addEventListener("click", () => {
    closeFolderContextMenu();
    closeBookmarkContextMenu();
    refs.folderDialog.showModal();
    requestAnimationFrame(() => {
      refs.folderNameInput.focus();
      refs.folderNameInput.select();
    });
  });

  refs.addBookmarkBtn.addEventListener("click", () => {
    closeFolderContextMenu();
    closeBookmarkContextMenu();

    const activeFolder = getActiveFolder();
    if (!activeFolder) {
      alert(t("alertSelectGroupToAddLink"));
      return;
    }
    refs.bookmarkDialog.showModal();
  });

  refs.folderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputTitle = refs.folderNameInput.value.trim();
    if (!inputTitle) return;

    if (isSecretTrigger(inputTitle)) {
      revealSecretFolder();
      refs.folderForm.reset();
      refs.folderDialog.close();
      refreshFolderData();
      return;
    }

    const newFolder = {
      id: createId(),
      title: inputTitle,
      bookmarks: [],
    };

    state.folders.unshift(newFolder);
    state.activeFolderId = newFolder.id;

    refs.folderForm.reset();
    refs.folderDialog.close();

    await saveState();
    refreshFolderData();
  });

  refs.bookmarkForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const activeFolder = getActiveFolder();
    if (!activeFolder) {
      alert(t("alertSelectGroup"));
      return;
    }

    const title = refs.bookmarkTitleInput.value.trim();
    const url = normalizeUrl(refs.bookmarkUrlInput.value);

    if (!title || !url) {
      alert(t("alertInvalidLink"));
      return;
    }

    activeFolder.bookmarks.unshift({
      id: createId(),
      title,
      url,
    });

    refs.bookmarkForm.reset();
    refs.bookmarkDialog.close();

    await saveState();
    refreshFolderData();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (state.theme === "auto") {
      applyTheme(state.theme);
    }
  });
}

async function bootstrap() {
  state = await loadState();
  state.activeFolderId = null;

  applyTheme(state.theme);
  syncFormValues();
  applyI18n();

  updateClock();
  setInterval(updateClock, 1000);

  attachListeners();
  refreshFolderData();
}

bootstrap();
