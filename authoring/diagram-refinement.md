# 図の再調整（2026-10-17）

`tmp/reference-slides/` の54・58〜64・70相当の画像と、`tmp/source-review/pages/` の74〜76を実見して調整した。参考画像は公開物へ埋め込まず、SVGで描き直す。

## 編集と再生成

`node tools/build-diagrams.cjs` で `docs/assets/branch-model.svg` を生成する。図中の文言・位置・形状の編集元はこのスクリプト。本文と章の順序は従来どおりcontent/で管理する。自学習・講義・拡大表示に同じSVGを使う。

## branch章

- 図を1120×630にし、教材の16:9の枠に合わせた。各図に見出しと短い読み方を付ける。
- commit追加・branch成長・PRの前後比較で、既存のcommitの座標を固定する。上が新しく、下が古い。
- 灰色の実線は親子関係、緑はbranchの参照や操作、赤はHEADの参照先。青いcommitは作業側の識別用であり、別種のGitオブジェクトという意味ではない。
- 54のHEAD比較は通常状態と過去の一例の2列に整理する。通常はHEAD→main→commit、detachedはHEAD→commitという違いを明示する。
- 59の誤解比較は左右で履歴の丸と線を揃え、囲む範囲だけを変える。分岐時・merge後を上下に示す。
- PR図のorigin/*は、共有先の状態をfetchした後の手元の参照として説明する。共有先のmergeだけでローカルmainが進んだようには描かない。
- 相対参照・mergeモデル・クイズは従来のgraph.jsonと共通rendererを使う。ノードや答えを単純化しない。

## 確認

`node --test tools/build-content.test.cjs` と `node tools/check-content.cjs` に加え、ChromeでSVGの全状態をレンダリングし、文字のviewBox外へのはみ出しと実際の講義表示・390px幅の自学習表示を確認する。画像による確認記録はワークスペースのtmp/diagram-review/に置き、公開物やGitには含めない。
