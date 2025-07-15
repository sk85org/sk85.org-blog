+++
title = "About"
+++

ある化学徒

- [sk85.org/](https://sk85.org/)
- [d.sk85.org/](https://d.sk85.org/)
- [Github](https://github.com/sk85org/)

### 連絡先

- 日本

### Private

- [img.sk85.org](https://img.sk85.org/)

### リンク集

- [こつこつ web 日記]({{< ref 20210320_904627.md >}})

This website is hosted on Cloudfpare Pages.

### history

というほどのものでもないですが

#### 2019-06-28

誕生, Sakura VPS で稼働させる

#### 2020-12-13

Sakura VPS の SSD の書き込み読み込み速度が遅いので、
conoha VPS に移行する。  
デプロイ方法を Github Action に変更する

#### 2021-02-14

記事が増えてきたので  
[Hyper Estraier](https://dbmx.net/hyperestraier/index.ja.html)を Docker 上で動かして、全文検索をつける  
https://github.com/sk85org/docker-HyperEstraier

#### 2021-02-23

念の為にフロントサーバーのアクセスログを取り始める。  
ホスト上で cron と[Go Access](https://goaccess.io)の[docker コンテナ](https://hub.docker.com/r/allinurl/goaccess)を使って、12 時間ごとにログを html 出力するように設定した。

#### 2021-03-07

ドメインを変える

#### 2021-03-21

Github Action で VPS に rsync でリポジトリを同期してから VPS 上の hugo で静的ファイルを作成する方式を止めた。代わりに Github Action ではファイルが push されたら ssh で VPS 上のシェルスクリプトを実行するだけに変更。VPS 上のシェルスクリプトで git pull してから hugo でデプロイ。自由度が上がった

#### 2021-10-14

VPS サーバーを indigo に変更

#### 2021-12-14

デプロイ先を Cloudflare Pages に。VPS を止めて管理から開放された
-->

#### 2022-12

- デザインをシンプルにする
- n 年日記機能をつける

#### 2025-02

- 検索を Hyper Estraier から Meilisearch に変更してインクリメンタル検索を使えるようにした
