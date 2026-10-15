# Chapter 00・03・04 編集メモ

## 範囲と共通データ

`docs/lessons/foundations.js` に3章・各6節を追加。`window.GitSeminarModules` に既存と同じlesson契約で登録する。本文、要点、付箋は自学習・投影で共用し、図は各lessonの `diagram.src` とsectionの `diagramState` で対応させる。`content.js` やアプリの統合処理は変更していない。

SVGは `foundations-prepare.svg`・`foundations-inspect.svg`・`foundations-practice.svg`。全て520×480、本文22px以上。`data-current-state` に一致する `g[data-state]` だけを表示する。アニメーションはなく、初期状態は各章の先頭節。

## 元資料との対応

元の `ppt-src.pptx` のZip XMLテキストを参照。PPT・参考PDFは変更していない。

| 追加章 | 主な元スライド | 再構成 |
| --- | --- | --- |
| 00 準備 | 2、15–20 | Gitとシェル→作者設定→鍵ペア→公開鍵登録→config→接続テスト |
| 03 確認・取得 | 21–25、30–31 | clone→status→diff→log→fetch→pull |
| 04 実践 | 26–28、33、39–43 | 新規フォルダー→編集→最初のcommit→空remote→push→小演習 |

4領域の詳しいadd・commit・push説明は既存Chapter 02へ譲り、本章は準備・観察・実践に絞った。Chapter 03のdiffとlogの説明、およびChapter 04の解答例は原本を補った新規教材文。口頭説明の録音から起こした文章ではない。

図は既存PPTのSVG化による忠実なトレースではなく、学習順に合わせて作った説明用模式図。原本15–19の「手元に鍵ペア、公開鍵をGitHubへ」という関係、21–23・30–31の領域と取得の関係は保つ。原本15の暗号処理の詳細図は現行SSHの認証手順として再現していない。Chapter 03のlog図は子から親へ、Chapter 04の演習図は作業の順に矢印を描いており、矢印の意味は各説明に対応する。

## 手順の前提と修正

- SSHコマンドはWindowsのGit Bash、macOS/Linuxのbash・zshを前提とした。PowerShellではシェル構文が異なることを明示。WindowsのSSH実装の混在は付箋と公式リンクで扱う。
- 既存鍵を上書きせず、鍵名は一貫して `id_ed25519_github` とした。原本19の `id_25519_github` の綴り不一致を修正。
- 原本16の「パスフレーズはEnterでよい」は踏襲せず、設定を推奨。秘密鍵は送らず、`.pub` の公開鍵だけを登録する。
- 作者のuser.name/emailは認証と別。noreplyアドレスは学習者本人のSettingsで確認する。
- SSH configはコマンド実行ではなく、エディターで書く設定内容として表示。鍵の実ファイル名とIdentityFileを一致させる。
- 初回接続時は公式ホスト鍵の指紋を照合する。成功メッセージとアカウント名、シェル提供なし、終了コード1の場合も説明。
- GitHubアカウントパスワードをSSH認証に使う説明はしない。鍵のパスフレーズと区別する。
- statusのahead/behindは最新サーバーへの問い合わせではない。origin/mainは手元のリモート追跡情報と説明。
- fetchが現在のmainと作業ファイルを変更しないことを明記。pullを常にfetch+mergeと断定せず、教材では `--ff-only` を指定し、分岐時は拒否される手順とする。
- Chapter 04は他のGitリポジトリ外の新規練習用フォルダーに限定。初回branchを `git init -b main` で明示する。Git 2.28以降の構文が利用できる環境を想定。
- ファイルの作成はエディターで行い、複雑なecho・heredocは使わない。GitHub側は自分所有の空リポジトリを使い、README等の初期追加をしない。
- push拒否をforceで回避する操作、研究コード削除、reset/clean、外部公開や実際の鍵生成は実行していない。記載は学習者向けの手順のみ。

## 公式資料での確認

2026-10-15に以下のGit/GitHub公式資料を閲覧。各lessonの末尾表示用 `sources` にも格納している。

- [Gitの導入](https://git-scm.com/install/)・[初期設定](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)：OS別導入、作者設定。
- [SSH鍵の生成](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)：Ed25519、パスフレーズ、鍵名、OS別agentとWindowsでの混在。
- [公開鍵登録](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)・[接続確認](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)・[ホスト鍵の指紋](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)：登録対象、認証成功の判定、接続先確認。
- [clone](https://git-scm.com/docs/git-clone)・[status](https://git-scm.com/docs/git-status)・[diff](https://git-scm.com/docs/git-diff)・[log](https://git-scm.com/docs/git-log)：各表示と比較対象。
- [fetch](https://git-scm.com/docs/git-fetch)・[pull](https://git-scm.com/docs/git-pull)：追跡情報の更新と `--ff-only` の統合制限。
- [init](https://git-scm.com/docs/git-init)・[変更の記録](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)・[remote](https://git-scm.com/docs/git-remote)・[push](https://git-scm.com/docs/git-push)：新規ローカルからの記録と共有。
- [GitHubリポジトリ作成](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)：練習用の共有先作成。
