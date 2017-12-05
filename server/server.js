const express = require("express");
const path = require("path");

var app = express();
var publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log("server started on port 3000");
})

