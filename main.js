const Discord = require("discord.js")
const mongoose = require('mongoose')
const chalk = require("chalk");
require('dotenv').config()
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],})

const { AutoPoster } = require('topgg-autoposter')
const ap = AutoPoster(process.env.TOPGG, client)
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.functions = new Discord.Collection();
client.slashs = new Discord.Collection();
client.buttons = new Discord.Collection();
client.menus = new Discord.Collection();

(async () => {
    const handlers = ['command_handler', 'event_handler', 'function_handler', 'slash_handler', 'button_handler', 'menu_handler']
    handlers.forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord)
    })
  
    const start = Date.now();
    console.log(chalk.hex("#92fc74").bold("Trying to establish connection to database..."));

    mongoose.connect(process.env.MONGO_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true
      }).then(() => {
        const end = Date.now();
        const total = end - start;
        console.log(chalk.hex("#92fc74").bold(`Successfully established connection to database! (${total}ms)`));
      }).catch((err) => {
        console.log(chalk.hex("#ff0000").bold(err));
      });
  })();
  
client.login(process.env.DISCORD_TOKEN);
