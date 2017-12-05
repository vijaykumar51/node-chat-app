var socket = io();
socket.on("connect", function () {
	console.log("Connected to server");
	socket.emit("createEmail", {
		to: "user1@gmail.com",
		text: "First email"
	})
})

socket.on("disconnect", function () {
	console.log("Connection to server disconnected");
})

socket.on("newEmail", function (email) {
	console.log("newEmail from ", email);
})