# ライフニュース リニューアル試作サイト

地方新聞折込連合広告「ライフニュース」のリニューアル提案用サンプルです。

## 公開する内容

- `docs/index.html`：GitHub Pages公開時の入口ページ
- `docs/life-news-web.html`：住まいと暮らしの安心ガイド Web特集ページ
- `docs/life-news-company.html`：個別企業の記事ページ
- `docs/life-news-mobile.html`：スマートフォン版サンプル
- `docs/life-news-admin.html`：掲載企業情報管理DBの試作
- `docs/life-news-copy-generator.html`：原稿自動生成ツールの試作

## GitHub Pagesで公開する手順

1. GitHubで新しいリポジトリを作成する
2. このフォルダの内容をリポジトリへアップロードする
3. GitHubのリポジトリ画面で `Settings` を開く
4. `Pages` を開く
5. `Build and deployment` の `Source` を `Deploy from a branch` にする
6. `Branch` を `main`、フォルダを `/docs` にして保存する

公開後の入口URLは、通常は次の形になります。

```text
https://ユーザー名.github.io/リポジトリ名/
```

## 共有時の見せ方

まず `index.html` を入口として共有し、必要に応じて以下を説明します。

- 紙面からWebへ誘導する特集ページの完成イメージ
- 個別企業ページを読み物として見せる展開
- 掲載企業情報を管理する簡易DB
- 紙面、Web、SNS向け原稿を効率化する自動生成ツール

今回のテーマは「住まいと暮らしの安心ガイド」ですが、完成形というより、ライフニュースをテーマ型媒体として展開するための試作モデルです。
