# 図の再調整（2026-10-17）

`tmp/reference-slides/` の54・58〜64・70相当の画像と、`tmp/source-review/pages/` の74〜76を実見して調整した。参考画像は公開物へ埋め込まず、SVGで描き直す。

## 編集と再生成

`node tools/build-diagrams.cjs` で `docs/assets/branch-model.svg` と `docs/assets/collaboration-integration.svg` を生成する。図中の文言・位置・形状の編集元はこのスクリプト。本文と章の順序は従来どおりcontent/で管理する。自学習・講義・拡大表示に同じSVGを使う。

## branch章

- 図を1120×630にし、教材の16:9の枠に合わせた。各図に見出しと短い読み方を付ける。
- commit追加・branch成長・PRの前後比較で、既存のcommitの座標を固定する。上が新しく、下が古い。
- 灰色の実線は親子関係、緑はbranchの参照や操作、赤はHEADの参照先。青いcommitは作業側の識別用であり、別種のGitオブジェクトという意味ではない。
- 54のHEAD比較は通常状態と過去の一例の2列に整理する。通常はHEAD→main→commit、detachedはHEAD→commitという違いを明示する。
- 59の誤解比較は左右で履歴の丸と線を揃え、囲む範囲だけを変える。分岐時・merge後を上下に示す。
- PR図のorigin/*は、共有先の状態をfetchした後の手元の参照として説明する。共有先のmergeだけでローカルmainが進んだようには描かない。
- 相対参照・mergeモデル・クイズは従来のgraph.jsonと共通rendererを使う。ノードや答えを単純化しない。

## 競合解消の章

- 全12状態を16:9で再配置。長いコードを縮めて収めず、等幅の文字と十分な幅を持つカードを使う。
- 74の共通コード→左右の変更を維持し、M1・F1・C1を各コードと履歴の対応に使う。取り込むfeat/ja側はコード・commitとも青で揃える。
- 75の予定の合流点を点線にし、「まだ存在しない」と明記。競合停止時にはmainをM1に残す。
- 76のmerge失敗出力・マーカー表示を分ける。マーカー表示はmain側とfeat/ja側をコードの行に沿って色分けし、右側に説明する。
- 解消後のM2はM1とF1を親に持つ。mainはM2へ移動するがfeat/jaはF1に残る。同じコードの完成形を横に置く。
- PRのbase/compareは変更元から取り込み先へ向かう矢印で表す。共有先のmainと手元のorigin/mainの意味を分け、pullの図でfetchによる取得も説明する。

## 確認

`node --test tools/build-content.test.cjs` と `node tools/check-content.cjs` に加え、ChromeでSVGの全状態をレンダリングし、文字のviewBox外へのはみ出しと実際の講義表示・390px幅の自学習表示を確認する。画像による確認記録はワークスペースのtmp/diagram-review/に置き、公開物やGitには含めない。
