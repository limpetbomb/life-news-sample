// Detail Page Data: トップページと同じCMS想定のダミー記事
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

const categoryClassMap = {
  "子育て": "category-parenting",
  "暮らし": "category-living",
  "教育": "category-education",
  "おでかけ": "category-trip",
  "食・レシピ": "category-food"
};

const detailRoot = document.querySelector("#articleDetail");
const relatedRoot = document.querySelector("#relatedArticles");
const params = new URLSearchParams(window.location.search);
const currentId = Number(params.get("id")) || 1;
const currentArticle = articles.find((article) => article.id === currentId) || articles[0];

function searchUrl(key, value) {
  return `index.html?${key}=${encodeURIComponent(value)}#articles`;
}

function createTagLinks(article) {
  return [
    `<a class="tag-category" href="${searchUrl("category", article.category)}">${article.category}</a>`,
    ...article.tags.map((tag) => `<a href="${searchUrl("tag", tag)}">#${tag}</a>`)
  ].join("");
}

function createRelatedCards(items) {
  return items.map((article) => {
    const displayNumber = String(100 - article.id).padStart(3, "0");
    const tags = [
      `<span class="tag-category">${article.category}</span>`,
      ...article.tags.map((tag) => `<span>#${tag}</span>`)
    ].join("");

    return `
      <article class="article-card story-card">
        <a class="story-link" href="article.html?id=${article.id}">
          <div class="story-number">${displayNumber}</div>
          <div class="story-thumb thumb ${article.thumbClass}">
            <span>${article.category}</span>
          </div>
          <div class="story-body article-body">
            <h3><span>${article.title}</span></h3>
            <p>${article.description}</p>
            <div class="tag-row">${tags}</div>
          </div>
        </a>
      </article>
    `;
  }).join("");
}

function renderDetail(article) {
  const categoryClass = categoryClassMap[article.category] || "category-parenting";
  document.title = `${article.title} | むすび`;

  detailRoot.innerHTML = `
    <div class="detail-hero">
      <div class="detail-number">${String(100 - article.id).padStart(3, "0")}</div>
      <div class="detail-thumb thumb ${article.thumbClass}">
        <span>${article.category}</span>
      </div>
      <h1><span>${article.title}</span></h1>
    </div>
    <div class="detail-meta">
      <a class="category-pill ${categoryClass}" href="${searchUrl("category", article.category)}">${article.category}</a>
      <time>${article.date}</time>
      <span>by ${article.author}</span>
    </div>
    <div class="detail-tags tag-row">${createTagLinks(article)}</div>
    <div class="detail-body">
      <p class="lead">${article.description}</p>
      <p>これはSTUDIO実装前に、記事詳細の導線・カテゴリ検索・タグ検索の見え方を確認するためのサンプル本文です。CMS化する場合は、タイトル、サムネイル、本文、著者、カテゴリ、タグをコレクション項目として持たせます。</p>
      <h2>親子で続けやすい小さな工夫</h2>
      <p>完璧に整えるより、毎日の流れに無理なく入ることを大切にします。朝や夕方の忙しい時間でも、家族が同じ場所を見れば次の行動がわかる状態を作ると、声かけの回数も少しずつ減っていきます。</p>
      <h2>検索テスト用リンク</h2>
      <p>上のカテゴリやタグを押すと、トップページの記事一覧へ戻り、該当する記事だけに絞り込まれます。</p>
    </div>
  `;
}

function renderRelated(article) {
  const primaryRelated = articles
    .filter((item) => item.id !== article.id && (item.category === article.category || item.tags.some((tag) => article.tags.includes(tag))))
    .slice(0, 3);

  const fallbackRelated = articles
    .filter((item) => item.id !== article.id && !primaryRelated.some((relatedItem) => relatedItem.id === item.id))
    .slice(0, 3 - primaryRelated.length);

  relatedRoot.innerHTML = createRelatedCards([...primaryRelated, ...fallbackRelated]);
}

renderDetail(currentArticle);
renderRelated(currentArticle);
