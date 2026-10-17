---
id: diverge
title: "共通の挨拶から、同じ行を別々に変えた"
state: diverge
diagram: assets/collaboration-integration.svg
---

共通のcommitにあるhello.pyでは、greet関数がHello, world!を表示していました。そこからmainはHello, everyone!へ、feat/jaはこんにちは!へ、それぞれ同じprintの行を変えてcommitしています。図の上は共通のコード、下の左右は現在の各ブランチのコードです。

3つのコードと履歴の分岐を対応させて見ます。別のファイルや離れた行の変更なら自動統合できることもありますが、この例は同じ行に異なる変更を入れているため、人の判断が必要になります。

## 要点

共通のHello, world!から、同じ行に2つの変更がある。

## 付箋

### diverge-lecture [講義]

mainは英語の対象を、feat/jaは挨拶の言語を変えました。

### diverge-study

PDF74の共通コード→左右の変更と中央の分岐履歴を、縦長画面でも追える配置へ移しています。
