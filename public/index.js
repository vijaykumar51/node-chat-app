var socket = io();
socket.on("connect", function () {
	console.log("Connected to server");

	socket.emit("createMessage", {
		to: "user1",
		text: "First message"
	})

})

socket.on("newMessage", function (message) {
	console.log("newMessage", message);
})

socket.on("disconnect", function () {
	console.log("Connection to server disconnected");
})