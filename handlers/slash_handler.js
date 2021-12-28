const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require(`@discordjs/builders`);
const fs = require('fs');

module.exports = async (client, Discord) => {

    const commands = new Array()
    /*const slashFolders = fs.readdirSync('./slash')
    for(const folder of slashFolders){
        const slashFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of slashFiles) {
            const slash = require(`../slash/${folder}/${file}`);
            commands.push(slash.data.toJSON());
            client.slashs.set(slash.name, slash)
        }
    } */

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
            console.log(`Successfully reloaded application (/) commands! (${total}ms)`);
        } catch (error) {
            console.error(error);
        }
    })()
}