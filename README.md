# nodejs_udp_sample

Node.js で UDP 通信を行うサンプルコードです

## 動作環境

- Node.js 16.19.0

## 実行方法

1. `index.ts` を実行して、受信用プロセスを起動する

```bash
npx ts-node index.ts
server listening 127.0.0.1:41234
```

2. 別のターミナルを開いて `sender.ts` を実行し、任意の文字列を送信するプロセスを起動する

```bash
npx ts-node sender.ts
UDP送信する内容を入力:send message
# input.ts を起動しているターミナルに、以下のな文字列が出力される
server got: send message from 127.0.0.1:****

# 終了するときは Ctrl + C
```
