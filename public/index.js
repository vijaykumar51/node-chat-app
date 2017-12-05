var socket = io();
socket.on("connect", function () {
	console.log("Connected to server");
})

socket.on("newMessage", function (message) {
	console.log("newMessage", message);
	var newMessageElement = $("<li></li>");
	newMessageElement.text(`${message.from}: ${message.text}`);
	$("#messages").append(newMessageElement);
})

socket.on("disconnect", function () {
	console.log("Connection to server disconnected");
})

$("#message-form").on("submit", function (e) {
	e.preventDefault();

	socket.emit("createMessage", {
		from: 'User',
		text: $("[name=message]").val()
	}, function () {
		console.log("ack");
	})
})