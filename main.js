const Discord = require("discord.js")
require('dotenv').config()
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], shards: 'auto',  intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.checks = new Discord.Collection()
client.functions = new Discord.Collection()

const handlers = ['command_handler', 'event_handler', 'function_handler']
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
});

client.login(process.env.DISCORD_TOKEN);