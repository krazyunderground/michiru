const fs = require('fs')

module.exports = (client, Discord) => {
    const buttonFolders = fs.readdirSync('./events/interactions/buttons')

    for (const folder of buttonFolders) {
        const buttonFiles = fs.readdirSync(`./events/interactions/buttons/${folder}`).filter(file => file.endsWith('.js'))

        for (const file of buttonFiles) {           
            const button = require(`../events/interactions/buttons/${folder}/${file}`)

            if(button.name){
                client.buttons.set(button.name, button)

            } else {
                continue
            }
        }
    }
}