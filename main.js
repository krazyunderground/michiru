const Discord = require("discord.js")
require('dotenv').config()
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], shards: 'auto',  intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.checks = new Discord.Collection()

const handlers = ['command_handler', 'event_handler', 'check_handler']
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN)