const fs = require(`fs`)
const chalk = require('chalk')

module.exports = (client, Discord) => {
    const start = Date.now()
    console.log(chalk.hex('#19c6ff').bold('Message command registration started...'))

    const commandFolders = fs.readdirSync('./commands')

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`)
            if(command.name){
                client.commands.set(command.name, command)
                console.log(chalk.hex('#19c6ff').bold(`registered message command: `) + chalk.hex('#85e1ff').bold(`${command.name} `) + chalk.hex('#19c6ff').bold(`in file: `) + chalk.hex('#85e1ff').bold(`${file}`));
            } else {
                continue
            }
        }
    }
    const end = Date.now()
    const total = end - start
    console.log(chalk.hex('#92fc74').bold(`Message command registration completed! (${total}ms)`))
}