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
	socket.on("disconnect", () => {
		console.log("Connection to client disconnected");
	})
})

server.listen(port, () => {
	console.log(`server started on port ${port}`);
})

