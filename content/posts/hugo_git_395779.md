---
title: "Hugoで作った静的サイトのデータをgithubで管理する"
date: 2019-06-29T13:23:38+09:00
tags: ["hugo"]
archives: ["2019-06"]
slug: 395779
---

hugoでサイトを作るにあたって、Markdownファイルやテンプレートはgithub上で管理している。  
github上のリポジトリにcommitがあるとgithubからwebhookが飛ぶ。  
それを受け取ったサーバー上でgit pullして同期、その後hugoでデプロイ

### Webhookサーバーを書いた
[skt1984/webhook](https://github.com/skt1984/webhook)  
hook.jsonにアドレス, シークレットキー, X-GitHub-Event及び実行したいシェルスクリプトを指定する。
```
[
    {
        "path": "/hugo",
        "name": "put",
        "shell": "sh",
        "execute-command": "hugo.sh",
        "execute-command-directry": "/home/username/webhook",
        "X-GitHub-Event": "push",
        "method": "POST",
        "secret": "secret_key"
    }
]
```
起動時にjsonファイルとポートの指定が可能

```
./webhook -f hook.json -p :8080
```

github上のリポジトリでhostname:8080/hugoを対象にwebhookの設定を行い、commitが行われるとhugo.shが実行される。/home/username/repositoryではリモートリポジトリをgithubに指定

まずローカルにGitHubのリポジトリをcloneする
```
cd /home/username
git clone git@github.com:username/repository.git
```
hugoのbinaryを入手
```
cd /home/username/repository
git pull
cd /home/username/repository 
/path/to/hugobinary/hugo -d /phome/username/public```
```
- systemdの登録について (userを指定しないとgitpull　できない・)
```
[Unit]
Description = webhook

[Service]
ExecStart = /path/to/webhook/webhook -f /path/to/webhook/hook.json -p :8080
Restart = always
Type = simple
User=user

[Install]
WantedBy = multi-user.target
```
