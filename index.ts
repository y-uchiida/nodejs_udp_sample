import dgram from "node:dgram";
import { appendFile } from "fs";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", async (msg, rinfo) => {
  // 受信した内容をファイルに書き込む
  await appendFile("udp_reserved", msg, () => { });
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234, "127.0.0.1");
// Prints: server listening 127.0.0.1:41234
