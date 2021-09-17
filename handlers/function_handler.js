const fs = require(`fs`)

module.exports = (client, Discord) => {
    const funcFiles = fs.readdirSync(`./functions/`).filter(file => file.endsWith('.js'));
    for (const file of funcFiles) {
        const func = require(`../functions/${file}`);

        client.functions.set(func.name, func);

    }
}