const Discord = require("discord.js")
require('dotenv').config()
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]})

const disbut = require('discord-buttons')
disbut(client);

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.checks = new Discord.Collection()

const handlers = ['command_handler', 'event_handler', 'check_handler']
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN)