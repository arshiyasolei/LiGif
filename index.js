
const discord = require("discord.js")

let request = require('request');
let app = new discord.Client()

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(prompt, callback) {
    rl.question(prompt, function (x) {
        rl.close();
        callback(x);
    });
}

app.on("ready", () => {
	app.user.setActivity("taking a break from discord")
	console.log(`Logged in as ${app.user.tag}!`)
})

app.on("message", message => {
	
	console.log(message.content)
	if (message.content.includes("https://lichess.org/" )) {
		if (!message.author.bot){

			let r = request.get('https://lichess.org/FG9ewMNwHeND', function (err, res, body) {
				console.log(r.uri.href);
				// use lichess gif api
				let rr = res.request.uri.href.replace("https://lichess.org/","")
				message.channel.send("https://lichess1.org/game/export/gif/" + rr + '.gif')
				console.log(this.uri.href);
			});

		}
	}
})

let token = input("Enter your discord bot token here: ", (x) => {app.login(x)});

