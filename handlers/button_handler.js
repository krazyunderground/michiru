const fs = require('fs')

module.exports = (client, Discord) => {

    const buttonFolders = fs.readdirSync('./events/interactions/buttons')
    for (const folder of buttonFolders) {

        const buttonSubFolders = fs.readdirSync(`./events/interactions/buttons/${folder}`)
        for(const subFolder of buttonSubFolders){

            const buttonFiles = fs.readdirSync(`./events/interactions/buttons/${folder}/${subFolder}`)
            for(const file of buttonFiles){

                const button = require(`../events/interactions/buttons/${folder}/${subFolder}/${file}`)

                if(button.name){
                    client.buttons.set(button.name, button)
                } else {
                    continue
                }

            }

        }

    }
    
}