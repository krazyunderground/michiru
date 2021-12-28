const fs = require('fs')

module.exports = (client, Discord) => {
    const menuFolders = fs.readdirSync('./events/interactions/menus')

    for (const folder of menuFolders) {
        const menuFiles = fs.readdirSync(`./events/interactions/menus/${folder}`).filter(file => file.endsWith('.js'))

        for (const file of menuFiles) {           
            const menu = require(`../events/interactions/menus/${folder}/${file}`)

            if(menu.name){
                client.menus.set(menu.name, menu)

            } else {
                continue
            }
        }
    }
}