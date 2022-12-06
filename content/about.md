+++
title = "About"
+++
ある化学徒
- [sk85.org/](https://sk85.org/)
- [d.sk85.org/](https://d.sk85.org/)
- [Github](https://github.com/sk85org/)
### Private
- [img.sk85.org](https://img.sk85.org/)
### リンク集
- [こつこつweb日記]({{< ref 20210320_904627.md >}})

This website is hosted on Cloudfpare Pages.
### history
というほどのものでもないですが
####  2019-06-28
誕生, Sakura VPSで稼働させる
####  2020-12-13
Sakura VPSのSSDの書き込み読み込み速度が遅いので、
conoha VPSに移行する。  
デプロイ方法をGithub Actionに変更する
####  2021-02-14
記事が増えてきたので  
[Hyper Estraier](https://dbmx.net/hyperestraier/index.ja.html)をDocker上で動かして、全文検索をつける  
https://github.com/sk85org/docker-HyperEstraier
####  2021-02-23
念の為にフロントサーバーのアクセスログを取り始める。  
ホスト上でcronと[Go Access](https://goaccess.io)の[dockerコンテナ](https://hub.docker.com/r/allinurl/goaccess)を使って、12時間ごとにログをhtml出力するように設定した。  
####  2021-03-07
ドメインを変える
####  2021-03-21
Github ActionでVPSにrsyncでリポジトリを同期してからVPS上のhugoで静的ファイルを作成する方式を止めた。代わりにGithub ActionではファイルがpushされたらsshでVPS上のシェルスクリプトを実行するだけに変更。VPS上のシェルスクリプトで git pull してからhugoでデプロイ。自由度が上がった
####  2021-10-14
VPSサーバーをindigoに変更
####  2021-12-14
デプロイ先をCloudflare Pagesに。VPSを止めて管理から開放された
--> 
#### 2022-12
- デザインをシンプルにする
- n年日記機能をつける