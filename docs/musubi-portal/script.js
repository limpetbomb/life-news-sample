// Dummy Article Data: STUDIO CMS化を想定した記事データ
const articles = [
  {
    id: 1,
    title: "朝のバタバタを10分短くする、親子の身支度ルーティン",
    description: "小さな準備と声かけで、平日の朝を少し軽やかにするアイデア集。",
    category: "子育て",
    date: "2026.06.11",
    tags: ["時短", "朝時間", "ワーママ"],
    author: "むすび編集部",
    thumbClass: "thumb-sun"
  },
  {
    id: 2,
    title: "リビング学習が続く、文具とプリントの置き場所ルール",
    description: "散らかりやすい学用品を、子どもが自分で戻せる仕組みに整えます。",
    category: "教育",
    date: "2026.06.10",
    tags: ["学び", "収納", "小学生"],
    author: "佐伯ゆい",
    thumbClass: "thumb-edu"
  },
  {
    id: 3,
    title: "週末に作り置きしない、15分でできる親子ごはん",
    description: "冷蔵庫にある食材で作りやすい、取り分けしやすい夕食メニュー。",
    category: "食・レシピ",
    date: "2026.06.09",
    tags: ["レシピ", "時短", "親子ごはん"],
    author: "食卓ラボ",
    thumbClass: "thumb-food"
  },
  {
    id: 4,
    title: "雨の日でも気分が上がる、近場のおでかけアイデア",
    description: "移動時間を短く、親子で過ごしやすい屋内スポットの選び方。",
    category: "おでかけ",
    date: "2026.06.08",
    tags: ["おでかけ", "週末", "雨の日"],
    author: "三浦はる",
    thumbClass: "thumb-trip"
  },
  {
    id: 5,
    title: "洗濯物がたまらない家の、夜5分リセット習慣",
    description: "家事をがんばりすぎず、翌朝の負担を減らす暮らしの整え方。",
    category: "暮らし",
    date: "2026.06.07",
    tags: ["家事", "時短", "収納"],
    author: "むすび編集部",
    thumbClass: "thumb-home"
  },
  {
    id: 6,
    title: "夏休み前に決めたい、親子で納得できるスクリーン時間",
    description: "ルールを押しつけず、家庭ごとのちょうどいい使い方を考えます。",
    category: "子育て",
    date: "2026.06.06",
    tags: ["夏休み", "デジタル", "子育て"],
    author: "中川りさ",
    thumbClass: "thumb-life"
  },
  {
    id: 7,
    title: "水遊びデビューの日に持っていくものチェックリスト",
    description: "着替え、日差し対策、帰り道まで安心できる準備をまとめました。",
    category: "おでかけ",
    date: "2026.06.05",
    tags: ["水遊び", "おでかけ", "夏休み"],
    author: "おでかけ班",
    thumbClass: "thumb-trip"
  },
  {
    id: 8,
    title: "習い事を始める前に、親が見ておきたい3つの相性",
    description: "先生、通いやすさ、子どもの気持ち。続けやすさの見極め方。",
    category: "教育",
    date: "2026.06.04",
    tags: ["習い事", "学び", "子育て"],
    author: "村上あき",
    thumbClass: "thumb-edu"
  }
];

const articleList = document.querySelector("#articleList");
const editorPicks = document.querySelector("#editorPicks");
const editorCardList = document.querySelector("#editorCardList");
const rankingList = document.querySelector("#rankingList");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const activeFilterBar = document.querySelector("#activeFilterBar");
const searchForm = document.querySelector("#searchForm");
const keywordInput = document.querySelector("#keywordInput");
const categoryFilter = document.querySelector("#categoryFilter");
const tagFilter = document.querySelector("#tagFilter");
const resetButton = document.querySelector("#resetButton");
const categoryTabs = document.querySelectorAll("[data-category-tab]");
const trendKeywords = document.querySelector("#trendKeywords");
const drawerTags = document.querySelector(".drawer-tag-list");
const menuOverlay = document.querySelector("#menuOverlay");
const openMenuButtons = document.querySelectorAll("[data-open-menu]");
const closeMenuButtons = document.querySelectorAll("[data-close-menu]");
const siteShell = document.querySelector(".site-shell");

const categoryClassMap = {
  "子育て": "category-parenting",
  "暮らし": "category-living",
  "教育": "category-education",
  "おでかけ": "category-trip",
  "食・レシピ": "category-food"
};

const initialWakaruCounts = [28, 33, 19, 41, 12, 36, 24, 17];
const wakaruCounts = articles.reduce((counts, article) => {
  counts[article.id] = initialWakaruCounts[article.id - 1] || 0;
  return counts;
}, {});
const readLaterStorageKey = "musubiReadLaterIds";
const storedReadLaterIds = (() => {
  try {
    return JSON.parse(localStorage.getItem(readLaterStorageKey) || "[]");
  } catch {
    return [];
  }
})();
const readLaterArticles = new Set(storedReadLaterIds);

// Article Rendering: 記事カード一覧を生成
function isSearchActive() {
  return keywordInput.value.trim() !== "" || categoryFilter.value !== "すべて" || tagFilter.value !== "すべて";
}

function createStoryCards(items) {
  return items.map((article) => {
    const categoryClass = categoryClassMap[article.category] || "category-parenting";
    const tags = [
      `<span class="tag-category ${categoryClass}">${article.category}</span>`,
      ...article.tags.map((tag) => `<span>#${tag}</span>`)
    ].join("");
    const displayNumber = String(100 - article.id).padStart(3, "0");
    const wakaruCount = wakaruCounts[article.id] || 0;
    const isNew = article.id <= 3;

    return `
      <article class="article-card story-card">
        <a class="story-link" href="article.html?id=${article.id}">
          <div class="story-number">${displayNumber}</div>
          ${isNew ? `<div class="new-ribbon">NEW</div>` : ""}
          <div class="story-thumb thumb ${article.thumbClass}">
            <span>${article.category}</span>
          </div>
          <div class="story-body article-body">
            <span class="category-pill ${categoryClass}">${article.category}</span>
            <h3><span>${article.title}</span></h3>
            <p>${article.description}</p>
            <div class="tag-row">${tags}</div>
            <div class="article-footer">
              <time>${article.date}</time>
              <span>by ${article.author}</span>
            </div>
          </div>
        </a>
        <div class="card-actions">
          <button class="read-later-button" type="button" data-read-later-id="${article.id}" aria-pressed="false">
            <span class="read-icon">＋</span>
            <span>あとで読む</span>
          </button>
          <button class="wakaru-button" type="button" data-wakaru-id="${article.id}" aria-label="${article.title}にわかるを送る">
            <span class="wakaru-face">☺</span>
            <span>わかる〜</span>
            <span class="wakaru-count">${wakaruCount}</span>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderEditorCards(items) {
  editorCardList.innerHTML = items.map((article) => {
    const categoryClass = categoryClassMap[article.category] || "category-parenting";
    const tags = article.tags.slice(0, 2).map((tag) => `<span>#${tag}</span>`).join("");

    return `
      <article class="editor-card">
        <a class="editor-card-link" href="article.html?id=${article.id}">
          <div class="editor-card-thumb thumb ${article.thumbClass}">
            <span>${article.category}</span>
          </div>
          <div class="editor-card-body">
            <span class="editor-location ${categoryClass}">${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div class="editor-tags">${tags}</div>
          </div>
        </a>
        <button class="read-later-button editor-read-later" type="button" data-read-later-id="${article.id}" aria-pressed="false">
          <span class="read-icon">＋</span>
          <span>あとで読む</span>
        </button>
      </article>
    `;
  }).join("");
}

function renderRanking() {
  if (!rankingList) return;

  const rankedArticles = [...articles]
    .sort((a, b) => (wakaruCounts[b.id] || 0) - (wakaruCounts[a.id] || 0))
    .slice(0, 5);

  rankingList.innerHTML = rankedArticles.map((article, index) => {
    const categoryClass = categoryClassMap[article.category] || "category-parenting";
    return `
      <a class="ranking-item" href="article.html?id=${article.id}">
        <span class="ranking-rank">${String(index + 1).padStart(2, "0")}</span>
        <span class="ranking-thumb thumb ${article.thumbClass}"></span>
        <span class="ranking-body">
          <span class="ranking-category ${categoryClass}">${article.category}</span>
          <strong>${article.title}</strong>
          <small>わかる〜 ${wakaruCounts[article.id] || 0}</small>
        </span>
      </a>
    `;
  }).join("");
}

function renderArticles(items) {
  const filtering = isSearchActive();
  const visibleItems = filtering ? items : items.filter((article) => article.id <= 3);
  const recommendedItems = articles.filter((article) => article.id > 3).slice(0, 4);

  articleList.innerHTML = createStoryCards(visibleItems);
  resultCount.textContent = filtering ? `${items.length}件` : `${visibleItems.length}件`;
  emptyState.hidden = items.length !== 0;
  editorPicks.hidden = filtering || items.length === 0;
  renderActiveFilters();
  if (!filtering) {
    renderEditorCards(recommendedItems);
  }
  syncReadLaterButtons();
  renderRanking();
}

function renderActiveFilters() {
  const chips = [];
  const keyword = keywordInput.value.trim();

  if (keyword) {
    chips.push(`<button type="button" data-clear-filter="keyword">キーワード: ${keyword}<span>×</span></button>`);
  }

  if (categoryFilter.value !== "すべて") {
    chips.push(`<button type="button" data-clear-filter="category">カテゴリー: ${categoryFilter.value}<span>×</span></button>`);
  }

  if (tagFilter.value !== "すべて") {
    chips.push(`<button type="button" data-clear-filter="tag">タグ: #${tagFilter.value}<span>×</span></button>`);
  }

  if (!chips.length) {
    activeFilterBar.hidden = true;
    activeFilterBar.innerHTML = "";
    return;
  }

  activeFilterBar.hidden = false;
  activeFilterBar.innerHTML = `
    <span class="active-filter-label">検索条件</span>
    ${chips.join("")}
    <button class="clear-all-filters" type="button" data-clear-filter="all">すべて解除</button>
  `;
}

function handleWakaruClick(event) {
  const button = event.target.closest(".wakaru-button");
  if (!button) return;

  const articleId = Number(button.dataset.wakaruId);
  if (!articleId) return;

  wakaruCounts[articleId] = (wakaruCounts[articleId] || 0) + 1;
  button.querySelector(".wakaru-count").textContent = wakaruCounts[articleId];

  button.classList.remove("is-popped");
  void button.offsetWidth;
  button.classList.add("is-popped");
  renderRanking();
}

function syncReadLaterButtons() {
  document.querySelectorAll("[data-read-later-id]").forEach((button) => {
    const articleId = Number(button.dataset.readLaterId);
    const saved = readLaterArticles.has(articleId);
    button.classList.toggle("is-saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.querySelector(".read-icon").textContent = saved ? "✓" : "＋";
    button.querySelector("span:last-child").textContent = saved ? "保存済み" : "あとで読む";
  });
}

function saveReadLaterState() {
  localStorage.setItem(readLaterStorageKey, JSON.stringify([...readLaterArticles]));
}

function handleReadLaterClick(event) {
  const button = event.target.closest("[data-read-later-id]");
  if (!button) return;

  const articleId = Number(button.dataset.readLaterId);
  if (!articleId) return;

  if (readLaterArticles.has(articleId)) {
    readLaterArticles.delete(articleId);
  } else {
    readLaterArticles.add(articleId);
  }

  button.classList.remove("is-bounced");
  void button.offsetWidth;
  button.classList.add("is-bounced");
  saveReadLaterState();
  syncReadLaterButtons();
}

// Search Logic: キーワード / カテゴリー / タグで絞り込み
function searchArticles() {
  const keyword = keywordInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const tag = tagFilter.value;

  const filtered = articles.filter((article) => {
    const searchText = [
      article.title,
      article.description,
      article.category,
      article.author,
      ...article.tags
    ].join(" ").toLowerCase();

    const matchesKeyword = keyword === "" || searchText.includes(keyword);
    const matchesCategory = category === "すべて" || article.category === category;
    const matchesTag = tag === "すべて" || article.tags.includes(tag);

    return matchesKeyword && matchesCategory && matchesTag;
  });

  renderArticles(filtered);
}

// Menu Overlay: 右上メニュー / 検索バーから検索ポップアップを開閉
function openMenu() {
  menuOverlay.classList.add("is-open");
  menuOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  window.setTimeout(() => keywordInput.focus(), 120);
}

function closeMenu() {
  menuOverlay.classList.remove("is-open");
  menuOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveToArticles() {
  closeMenu();
  document.querySelector("#articles").scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyTagFilter(tag) {
  keywordInput.value = "";
  if (!setSelectValue(tagFilter, tag)) {
    keywordInput.value = tag;
  }
  searchArticles();
}

function resetFilters() {
  keywordInput.value = "";
  categoryFilter.value = "すべて";
  tagFilter.value = "すべて";
  setActiveCategoryTab("すべて");
  renderArticles(articles);
  history.replaceState(null, "", location.pathname + location.hash);
}

// Category Navigation: 横スクロールカテゴリから検索へ反映
function setActiveCategoryTab(category) {
  categoryTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.categoryTab === category);
  });
}

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.categoryTab;
    categoryFilter.value = category;
    setActiveCategoryTab(category);
    searchArticles();
  });
});

// Trend Keywords: タップしたキーワードで検索
trendKeywords.addEventListener("click", (event) => {
  const button = event.target.closest("[data-keyword]");
  if (!button) return;

  applyTagFilter(button.dataset.keyword);
  document.querySelector("#articles").scrollIntoView({ behavior: "smooth", block: "start" });
});

drawerTags.addEventListener("click", (event) => {
  const button = event.target.closest("[data-keyword]");
  if (!button) return;

  applyTagFilter(button.dataset.keyword);
  closeMenu();
  document.querySelector("#articles").scrollIntoView({ behavior: "smooth", block: "start" });
});

articleList.addEventListener("click", handleWakaruClick);
articleList.addEventListener("click", handleReadLaterClick);
editorCardList.addEventListener("click", handleReadLaterClick);

activeFilterBar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clear-filter]");
  if (!button) return;

  const target = button.dataset.clearFilter;
  if (target === "keyword") keywordInput.value = "";
  if (target === "category") {
    categoryFilter.value = "すべて";
    setActiveCategoryTab("すべて");
  }
  if (target === "tag") tagFilter.value = "すべて";
  if (target === "all") {
    resetFilters();
    return;
  }

  searchArticles();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setActiveCategoryTab(categoryFilter.value);
  searchArticles();
  moveToArticles();
});

categoryFilter.addEventListener("change", () => {
  setActiveCategoryTab(categoryFilter.value);
  searchArticles();
});

tagFilter.addEventListener("change", searchArticles);
keywordInput.addEventListener("input", searchArticles);

resetButton.addEventListener("click", () => {
  resetFilters();
});

openMenuButtons.forEach((button) => {
  button.addEventListener("click", openMenu);
});

closeMenuButtons.forEach((button) => {
  button.addEventListener("click", closeMenu);
});

menuOverlay.addEventListener("click", (event) => {
  if (event.target === menuOverlay) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOverlay.classList.contains("is-open")) {
    closeMenu();
  }
});

function setSelectValue(select, value) {
  const optionExists = [...select.options].some((option) => option.value === value);
  if (optionExists) {
    select.value = value;
    return true;
  }
  return false;
}

function initializeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const tag = params.get("tag");
  const keyword = params.get("q");

  if (category && setSelectValue(categoryFilter, category)) {
    setActiveCategoryTab(category);
  }

  if (tag && !setSelectValue(tagFilter, tag)) {
    keywordInput.value = tag;
  }

  if (keyword) {
    keywordInput.value = keyword;
  }

  if (category || tag || keyword) {
    searchArticles();
    window.setTimeout(() => {
      document.querySelector("#articles").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return;
  }

  renderArticles(articles);
}

initializeFromUrl();
