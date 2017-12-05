const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
	console.log("Connection established");

	socket.emit("newMessage", {
		from: "Admin",
		text: "Welcome user"
	})

	socket.broadcast.emit("newMessage", {
		from: "Admin",
		text: "New user joined"
	})

	socket.on("createMessage", (message) => {
		console.log("createMessage", message);
		io.emit("newMessage", generateMessage(message.from, message.text))
	})

	socket.on("disconnect", () => {
		console.log("Connection to client disconnected");
	})
})

server.listen(port, () => {
	console.log(`server started on port ${port}`);
})

