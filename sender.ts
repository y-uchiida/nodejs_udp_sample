import dgram from "node:dgram";
import readline from "node:readline";

const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  socket.close();
});

socket.on("close", () => {
  console.log("sender socket is closed");
});

socket.bind();

/**
 * 標準入力を取得する
 */
const getInput = (question: string) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

// main loop
(async () => {
  for (; ;) {
    const input = await getInput("UDP送信する内容を入力:");
    const data = Buffer.from(String(input));

    //localhost:41234 へデータを送信
    socket.send(data, 41234, "127.0.0.1", (err, bytes) => {
      // エラー発生時のコールバック
      if (err) {
        socket.close();
        throw err;
      }
    });
  }
})();
