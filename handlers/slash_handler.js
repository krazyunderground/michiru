const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require(`@discordjs/builders`);
const fs = require('fs');
const chalk = require('chalk')

module.exports = async (client, Discord) => {
    const start = Date.now()
    console.log(chalk.hex('#c880ff').bold('Slash command registration started...'))

    const commands = new Array()
    const commandFolders = fs.readdirSync('./commands')

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`)
            client.slashs.set(command.name, command)
            commands.push(
                new SlashCommandBuilder()
                .setName(command.name)
                .setDescription(command.description)
                .addStringOption(option => 
                    option.setName("args").setDescription("Additional arguments for the command") 
                )
            )
            console.log(chalk.hex('#c880ff').bold(`registered slash command: `) + chalk.hex('#ff80fd').bold(`${command.name} `) + chalk.hex('#c880ff').bold(`in file: `) + chalk.hex('#ff80fd').bold(`${file}`));    
        }
    }

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            const start = Date.now()

            await rest.put(
                Routes.applicationCommands(process.env.ID),
                { body: commands },
            );
            const end = Date.now()
            const total = end - start
            console.log(chalk.hex('#92fc74').bold(`Slash command registration completed! (${total}ms)`))
        } catch (error) {
            console.error(error);
        }
    })()
}