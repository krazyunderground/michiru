const Discord = require("discord.js")
require('dotenv').config()

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.functions = new Discord.Collection()
client.slashs = new Discord.Collection()

const handlers = ['command_handler', 'event_handler', 'function_handler', 'slash_handler']
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})
const mongoose = require('mongoose')
const start = Date.now()
mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    const end = Date.now()
    const total = end - start
    console.log(`Connected to database (${total}ms)`);
}).catch((err) => {
    console.log(err);
});

client.login(process.env.DISCORD_TOKEN);
