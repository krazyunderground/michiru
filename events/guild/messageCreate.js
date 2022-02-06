const meant = require("meant");

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
  if(message.guild === null || message.author.bot) return

  const guildProfile = await client.functions.get("guildCheck").execute(message);

  const prefix = guildProfile.prefix;
  const args = message.content.slice(prefix.length).split(/ +/);

  if (message.mentions.users.first() === client.user && !args[1])
    return message.channel.send(`This server's prefix is \`${prefix}\`!`);

  if (!message.content.toLowerCase().startsWith(prefix))
    return;

  const userutil = await client.functions.get("getUtil").execute(message);
  const command = args[0].toLowerCase();

  const cmd = client.commands.find((v) =>
    [v.name, ...("aliases" in v ? v.aliases : [])].includes(command)
  );

  if (await client.functions.get("ccCheck").execute(message, args[0])) {
    var cc = await client.functions.get("ccCheck").execute(message, args[0]);
    var response = cc.output;
    if(response) message.channel.send(response);
    return;
  }

  const commands = new Array();

  client.commands.forEach((command) => {
    commands.push(command.name);
  });

  if (!cmd) {
    if (meant(command, commands).length)
      return message.channel.send(
        `No command found. Did you mean \`${meant(command, commands)}\`?`
      );
    return message.channel.send(`No command found.`);
  }

  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(cmd.name);
  const cooldown_amount = cmd.cooldown * 1000;

  if (time_stamps.has(message.author.id)) {
    const expiration_time =
      time_stamps.get(message.author.id) + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      const responses = [
        "Hold it!",
        "Objection!",
        "Take that!",
        "Not so fast!",
        "Overruled!",
      ];

      const embed = new Discord.MessageEmbed()
        .setTitle(responses[Math.floor(Math.random() * responses.length)])
        .setDescription(`Please wait \`${time_left.toFixed(1)}\` more seconds before using \`${cmd.name}\` again!`)
        .setThumbnail(
          "https://static.wikia.nocookie.net/aceattorney/images/4/4d/Objection%21_%28SoJ%29.png/revision/latest/scale-to-width-down/275?cb=20210615182924"
        )
        .setColor(userutil.colour);

      let msg = message.channel.send({ embeds: [embed] })
      setTimeout(() => {msg.delete}, 3000)
      return
    }
  }

  time_stamps.set(message.author.id, current_time);

  const min = cmd.minArgs + 1
  if (args.length < min && typeof cmd.minArgs !== 'undefined') return message.channel.send(`looks like you're missing something! correct usage: ${cmd.use}`)
  if (args.length > (cmd.maxArgs + 1) && !typeof cmd.minArgs !== 'undefined' && cmd.maxArgs !== -1) return message.channel.send(`looks like you're adding something! correct usage: ${cmd.use}`)
  
  if (cmd) cmd.execute(client, message, args, Discord);
};