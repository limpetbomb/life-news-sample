#!/bin/zsh
cd "/Users/design03b/Documents/Codex/2026-06-02/d3-40-60-web-90-40/outputs" || exit 1
echo "ライフニュース管理画面を起動します。"
echo "ブラウザで以下を開いてください:"
echo "http://127.0.0.1:8787/life-news-admin.html"
echo ""
echo "終了するときは、このウィンドウで Control + C を押してください。"
"/Users/design03b/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3" -m http.server 8787
