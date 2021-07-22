const fs = require(`fs`)

module.exports = (client, Discord) => {
    const checkFiles = fs.readdirSync(`./checks/`).filter(file => file.endsWith('.js'));
    for (const file of checkFiles) {
        const check = require(`../checks/${file}`);
        if(file){
            client.checks.set(check.name, check);
        } else {
            console.log(`+-${file}-[ERR]`)
            continue
        }
    }
}