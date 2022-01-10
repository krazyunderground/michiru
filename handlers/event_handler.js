const fs = require('fs')
const chalk = require('chalk')

module.exports = (client, Discord) => {
    const start = Date.now()
    console.log(chalk.hex('#ffe730').bold('Event registration started...'))

    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(`.js`))

        for(const file of event_files){
            const event = require(`../events/${dirs}/${file}`)
            const event_name = file.split('.')[0]
            client.on(event_name, event.bind(null, Discord, client))
            console.log(chalk.hex('#ffe730').bold(`registerd event: `) + chalk.hex('#ffef78').bold(`${event_name} `) + chalk.hex('#ffe730').bold(`in file: `) + chalk.hex('#ffef78').bold(`${file}`));
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e))

    const end = Date.now()
    const total = end - start
    console.log(chalk.hex('#92fc74').bold(`Event registration completed! (${total}ms)`))
}