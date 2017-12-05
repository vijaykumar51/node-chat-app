const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
	console.log("Connection established");

	socket.emit("newEmail", {
		from: "user1@gmail.com"
	});

	socket.on("createEmail", (email) => {
		console.log("createEmail", email);
	})

	socket.on("disconnect", () => {
		console.log("Connection to client disconnected");
	})
})

server.listen(port, () => {
	console.log(`server started on port ${port}`);
})

