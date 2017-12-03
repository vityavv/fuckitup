var restify = require("restify");
var builder = require("botbuilder");

// Setup Restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
	console.log("%s listening to %s", server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from user
server.post("api/messages", connector.listen());

//var connector = new builder.ConsoleConnector().listen();
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
	//session.send("You said: %s", session.message.text);
	var text = session.message.text;
	if (text == "victor sucks") {
		text = "no he doesn't";
	} else if (text == "hello im felix") {
		text = "hi felix";
	}
	text = text.split("");
	for (var i = 0; i < text.length; i++) {
		if (Math.random() > .5) {
			text[i] = text[i].toUpperCase();
		} else {
			text[i] = text[i].toLowerCase();
		}
	}
	session.send(text.join(""));
});
