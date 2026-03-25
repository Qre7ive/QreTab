# QreTab v0.1

QreTab is a personal Chrome New Tab extension focused on fast daily access.

## Features

- Replaces the default New Tab page via `chrome_url_overrides.newtab`
- Live greeting + clock
- Search bar with Google / Bing / DuckDuckGo
- Custom group-based quick links
- Expand a group by clicking its block
- Add groups and links with local persistence
- Right-click rename and delete for both groups and links
- Drag-and-drop sorting for groups and links
- Bilingual UI (Chinese / English)
- Theme mode and default search engine persistence via `chrome.storage.local`

## Project Structure

```text
QreTab/
├── manifest.json
├── newtab.html
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── styles/
│   └── newtab.css
├── scripts/
│   └── newtab.js
└── README.md
```

## Load Locally in Chrome

1. Open `chrome://extensions/`.
2. Enable **Developer mode** (top-right).
3. Click **Load unpacked**.
4. Select this project folder: `QreTab`.
5. Click **Reload** on the extension card after each local change.

## Notes

- This version does not require Chrome bookmarks permission.
- All groups and links are maintained locally and do not modify system bookmarks.
