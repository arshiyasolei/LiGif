const discord = require("discord.js")
const fetch = require("node-fetch"); 
const app = new discord.Client()

app.on("ready", () => {
    app.user.setActivity("Thinking too hard...")
    console.log(`Logged in as ${app.user.tag}!`)
})

// Checks every message in every channel!
app.on("message", async message => {

    const   mesg_tokens = message.content.split(" "),
            todo_msgs = [],
            todo_roundtwo = []

    // Go through each message and init a fetch call. 
    for (let msg of mesg_tokens) {
        if ((!message.author.bot) && msg.includes("https://lichess.org/")) {
            try {
                const s = fetch(msg);
                todo_msgs.push(s);
            } catch (error) {
                console.log("another error")
            }
        }
    }
    // await each fetch promise and make a new fetch request
    for (let to of todo_msgs) {
        try {
            const   data = await to,
                    some_comp = data.url.split(' ')[0].replace("https://lichess.org/", "").replace("/black", "").replace("/white", ""),
                    p = fetch("https://lichess1.org/game/export/gif/" + some_comp + '.gif');
            todo_roundtwo.push([p,some_comp])
        } catch (error) {
            console.log("Error! ",error)
        }
    }
    
    // Send to discord. This is the validation round. 
    for (const [to, rr] of todo_roundtwo) {
        try {
            await to;
            message.channel.send("https://lichess1.org/game/export/gif/" + rr + '.gif')
        } catch (error) {
            console.log("Error! ",error)
        }
    }
})


// login with bottoken 
app.login(process.env.BOTTOKEN)
