import dgram from "node:dgram";
import { appendFile } from "fs";
import { formatDate } from "./formatDate";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  console.error(err);
  server.close();
});

server.on("message", async (msg, rinfo) => {
  // 受信した内容をファイルに書き込む
  const now = new Date();
  const fileName = formatDate(now, "yyyy_MM_dd_HH:mm:ss:SSS");
  await appendFile(`${__dirname}/${fileName}`, msg, () => { });
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234, "127.0.0.1");
