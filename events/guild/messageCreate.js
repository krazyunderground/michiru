const meant = require("meant");
const fs = require("fs");

const util = null
const economy = null

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
  if(message.guild === null) return
  if(!message.guild.me.permissions.has("EMBED_LINKS")) message.channel.send("It appears the bot is missing the embed permission! \n(This is crucial to the bot's functionality, meaning some features wont work)")
  const guildProfile = await client.functions
    .get("checkGuild")
    .execute(message);

  let prefix = guildProfile.prefix;
  const args = message.content.slice(prefix.length).split(/ +/);

  if (message.mentions.users.first() === client.user && !args[1])
    return message.channel.send(
      `Hello! This server's prefix is \`${prefix}\`!`
    );

  if (
    !message.content.toLowerCase().startsWith(prefix) ||
    message.author === client.user
  )
    return;
  const userutil = await client.functions.get("getUtil").execute(message);
  const userecon = await client.functions.get("getAuthorEcon").execute(message);
  const command = args[0].toLowerCase();

  const cmd =
    (await client.commands.get(command)) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(command));

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
        .setDescription(
          `Please wait \`${time_left.toFixed(
            1
          )}\` more seconds before using \`${cmd.name}\` again!`
        )
        .setThumbnail(
          "https://static.wikia.nocookie.net/aceattorney/images/4/4d/Objection%21_%28SoJ%29.png/revision/latest/scale-to-width-down/275?cb=20210615182924"
        )
        .setColor(userutil.colour);

      return message.channel.send({ embeds: [embed] });
    }
  }

  time_stamps.set(message.author.id, current_time);

  if(message.guild.id !== "859775203328262144"){
    if (cmd.category === "eco") {
      if (client.guilds.cache.get("848707853350862858")) {
        if (
          !client.guilds.cache
            .get("848707853350862858")
            .members.cache.get(message.author.id)
            .roles.cache.has("854061604258054214")
        ) {
          return message.channel.send(
            "Economy overhaul in progress! stay tuned in the support server for when it drops!"
          );
        }
      } else {
        return message.channel.send(
          "Economy overhaul in progress! stay tuned in the support server for when it drops!"
        );
      }
    }
  }

  if (cmd) cmd.execute(client, message, args, Discord, economy, util);
};