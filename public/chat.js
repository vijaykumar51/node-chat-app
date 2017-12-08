var socket = io();

var scrollToBottom = function () {
	var messages = $("#messages");
	var newMessage = messages.children("li:last-child");

	var clientHeight = messages.prop("clientHeight");
	var scrollHeight = messages.prop("scrollHeight");
	var scrollTop = messages.prop("scrollTop");
	var newMessageHeight = newMessage.innerHeight();
	var prevMessageHeight = newMessage.prev().innerHeight();

	if (scrollTop + clientHeight + newMessageHeight + prevMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

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
	scrollToBottom();
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