const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = async (client, Discord) => {

    const commands = new Array()
    const commandFolders = fs.readdirSync('./slash')
    for(const folder of commandFolders){
        const commandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../slash/${folder}/${file}`);
            commands.push(command.data.toJSON());
            client.slashs.set(command.name, command)
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