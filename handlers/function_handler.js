const fs = require(`fs`)
const chalk = require('chalk')

module.exports = (client, Discord) => {
    const start = Date.now()
    console.log(chalk.hex('#ffb65c').bold('Function registration started...'))

    const funcFiles = fs.readdirSync(`./functions/`).filter(file => file.endsWith('.js'));

    for (const file of funcFiles) {
        const func = require(`../functions/${file}`);

        client.functions.set(func.name, func);
        console.log(chalk.hex('#ffb65c').bold(`registered function: `) + chalk.hex('#ffc57d').bold(`${func.name} `) + chalk.hex('#ffb65c').bold(`in file: `) + chalk.hex('#ffc57d').bold(`${file}`));
    }

    const end = Date.now()
    const total = end - start
    console.log(chalk.hex('#92fc74').bold(`Function registration completed! (${total}ms)`))
}