# branch章：元PDFへの対応（70%段階）

## 実見した資料

`presentation/git-seminar.pdf` の下記19ページについて、`tmp/source-review/pages/page-N.png` の1600px画像を一枚ずつ開き、図の丸・線・四角・HEAD・左右比較・クイズの対象を確認した。本文の正本は `docs/lessons/branches.js`、履歴データの正本は同ファイルの `graph.nodes` と `graph.states`。自学習と本番で同じデータを使う。

図の意味を先に復元し、旧版のc1〜mergeを6段階で見せる構成から、原資料に近い18節へ分けた。見た目は共通の静かな配色を使い、元PDFの装飾枠・スクリーンショット・ターミナル配色の完全な複製はしていない。

## ページと教材の対応

| PDF | 確認した内容 | 節／図での表現 |
| --- | --- | --- |
| 52 | 作業フォルダ内の.git、履歴・HEAD・branch・remote情報 | dotgit。branch-model.svgでフォルダ・ファイルのアイコンと階層線、.gitから管理情報へつながる図 |
| 53 | commit ID、親子関係、c3の親c2、上向きの時間軸 | objects。c1〜c4とc3/c2強調、IDと保存内容の本文 |
| 54 | commitとHEAD、過去の各位置にも移動できる、detachedへの導入 | head／detached。headのSVGに通常1列＋過去の各位置4列を横並びし、mainとHEADの関係を比較。detachedは拡大した別図でも説明 |
| 55 | c3からc4追加、現在地の移動、前後比較 | commit-change。左右にcommit前／後を並べる |
| 56 | branch目印、mainと作業側がそれぞれ進む、命名 | branch-growth。m2から分岐してmain m3／作業b1の前図と、main m5／作業b3まで進む後図を横並び。HEAD省略は原図と同じ |
| 57 | m5のmerge、m6/m7追加、作業目印b2は移動しない | merge-model。m5の親をm4/b2とし、mainはm7、作業はb2 |
| 58 | commit追加・HEADの到達先・branchの移動 | commit-change。55の前後図にmainの目印の移動も明示 |
| 59 | 線全体を囲む誤解／1commitを囲む正解、統合前後の比較 | misconception。左右で同じ丸・同じ線を保ち、四角の範囲だけを変更。上段分岐、下段merge後 |
| 61 | ~1／^1と~2／^^、^2は二つ前ではない | first-parent。main m6からm5/m4へ第一親をたどり、線と注記を表示 |
| 62 | m5の第一親m4／第二親b2の比較 | second-parent。同じm5から緑m4と青b2へ二経路を表示 |
| 63 | 3列・二つのmergeを持つクイズ、青と緑の強調先、答え | quiz。原図と同じ親子構造をq/r/sノードで保持し、青B=r3、緑G=s3を強調 |
| 64 | commit・branch・HEADの整理、tag、正誤比較 | summary／misconception。役割の図と本文、tagを含む |
| 65 | 作業を分ける動機、branchは1commitの目印、他branchは自動更新されない | misconception／clone。図の正誤比較と、README実習へ入る説明 |
| 67 | branch作成、*が現在地、prefix/Issue番号、refsの階層 | create。作成前後の図、同じcommitに2名の目印、HEAD main、branch一覧とrefs treeを横並び |
| 68 | checkout／switchで切り替え、status clean | switch。HEADだけfeature/nameへ、同じcommitを指す状態 |
| 69 | README編集、modified／not staged、履歴図は不変 | edit。switchと同じノード/目印、status・diffと本文 |
| 70 | add→staged→commit→clean、新commitとbranchの移動 | feature-commit。f1追加、main c3のまま、HEAD feature/name |
| 71 | branch -vv、初回push -u、ローカルbranchは不変 | push-pr。feature-commitと同じグラフを参照、pushの注記 |
| 72 | PR／MR、mainへの統合、origin/HEAD、競合への入口 | push-pr。共有先のPR作成時／merge後を横並び。origin/HEAD→origin/main、mainがmerge commitへ進み、作業目印が移動しない構造を再現 |

## クイズの構造を確認した方法

原図63は左列11個、中央列3個、右列4個のcommitを持つ。左上をq10、次のmergeをq9とし、q9の第一親がq8、第二親がr1。中央列r1の第一親はr2、r2は第一親r3（青）、第二親s1。r3の親は左列q4。右列はs1→s2→s3（緑）→s4→左列q2へつながる。

- 青：`HEAD~^2~2` → q10→q9→r1→r2→r3。
- 緑：`HEAD~^2~^2~2` → q10→q9→r1→r2→s1→s2→s3。
- 原資料の別解 `HEAD^^2^^` は青と同値。

グラフを単純な1分岐の模型に置き換えていない。B/Gは色の対象を区別しやすくする追加ラベルであり、実際のGit IDではない。

## 正確さのために調整した点

- HEADの通常状態を「branchを介してcommitを指す」と明示。原資料54・64の「commitのポインタ」だけの説明を補い、detachedの図ではcommitを直接指す赤ラベルに切り替える。
- 原資料56の作業側ラベルはb2が2回表示される。教材では下からb1/b2/b3と区別する。57・61・62のb2とは状態を切り替え、m5がmergeするかどうかも `states.parents` で上書きする。
- 第一親を二回たどる~2と、第二親を一度選ぶ^2を区別する。原資料61のcheckout例は現在地を動かさない `git show` に置き換えた。原資料62の説明用名m5をコマンドへそのまま貼らせず、HEAD~1で参照する。
- 図のcommit物体・スナップショットと、保存時の圧縮／再利用を区別。「毎回すべての内容を複製」「差分だけの記録」と誤解させない表現にした。
- 原資料67〜71に `feat/name`・`feature/name`・出力中の `branch/c` が混在する。実習の入力・本文・図は `feature/name` に統一した。
- origin/HEADはリモートのデフォルトブランチを表す参照で、作業中のHEADとは別であることを72相当の本文へ補った。
- 実習はREADMEのプロフィール追加を維持。前半のmerge概念図を実際の共有mainへ実行してから続ける手順にはしない。別cloneからbranch→switch→edit→add→commit→pushと進み、PRを提案して次章へつなぐ。

## rendererの拡張

`GitCommitGraph.render(graph, state)` の呼び出しは互換のまま。追加で `graph.viewBox`、状態ごとの `nodePositions`・`labels`・`parents`・`branchPositions`・`nodeColors`・`focusColors`・`annotations`・`paths`・`head.commit`（detached）・`showTimeAxis`・`legend` を扱う。ノードや履歴を自学習／本番用に複製しない。

## 70%段階で残している差分

- PDF54・56・67・72の比較構造も追加済み。図の装飾、色、ターミナルの背景やプロンプトは共通の読みやすい配色へ置き換えた。
- PDF67の一覧・treeは、実習で作るmain／feature/nameに統一した。原図のbranch/a・branch/bの別名は転載していない。treeはloose refsの概念図と明示し、packed-refs等の保存形式もあることを付箋へ補った。
- PDF72のorigin/HEADを「作業中のHEAD」としてcommitへ直接付けず、origin/mainへ向く参照として表示。共有先でmergeした後もローカルは自動更新されないことを補足した。
- PDF60・66は今回の指定対象外で、画像も配置されていないため実見していない。cloneの入口は演習を単独で辿れるよう補足した。
- 公式資料はGitのobjects／branch／switch／gitrevisions／mergeを確認。構文・状態対応・クイズの親参照はコードで検証する。ブラウザでの最終投影表示と拡大表示は統合担当で確認する。
