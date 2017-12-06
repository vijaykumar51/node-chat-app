var socket = io();
socket.on("connect", function () {
	console.log("Connected to server");
})

socket.on("newMessage", function (message) {
	console.log("newMessage", message);
	var formattedTime = moment(message.createdAt).format("h:mm a");

	var template = $("#message-template").html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	})

	$("#messages").append(html);
})

socket.on("disconnect", function () {
	console.log("Connection to server disconnected");
})

$("#message-form").on("submit", function (e) {
	e.preventDefault();
	var messageTextBox = $("[name=message]");

	socket.emit("createMessage", {
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		messageTextBox.val("");
		console.log("ack");
	})
})