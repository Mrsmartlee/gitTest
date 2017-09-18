var ws = require("nodejs-websocket")
var port =3000
var clientCount=0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickname='用户'+clientCount
	sendStr(conn.nickname+'已进入');
	conn.on("text", function (str) {
		console.log("Received "+str)
		sendStr(conn.nickname+":"+str)//用户发送消息，格式
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		sendStr(conn.nickname+'已离开');

		
	})
	conn.on("error",function(err){
		console.log("handle err");
		console.log(err);
	})
}).listen(port)
console.log("websocket server listening on port "+ port);
//发送方法
function sendStr(str){
	server.connections.forEach(function(connection){
		connection.sendText(str)
	})
}