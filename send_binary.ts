import dgram from "node:dgram";
import { readFileSync } from "fs";

const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
	console.error(`server error:\n${err.stack}`);
	socket.close();
});

socket.on("close", () => {
	console.log("sender socket is closed");
});

socket.bind();

const data = Buffer.alloc(8, 0);

console.log("data read finish, start sending...");

//localhost:41234 へデータを送信
socket.send(data, 41234, "127.0.0.1", (err, bytes) => {
	// エラー発生時は例外を投げる
	if (err) {
		console.log('error')
		socket.close();
		throw err;
	}
	console.log('data send finished');
	socket.close();
});
