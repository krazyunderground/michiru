const userEcon = require("../../../../models/userEcon");
module.exports = {
  name: "deposit",
  async execute(interaction, client, Discord) {
    interaction.deferUpdate();
    const memberBal = await client.functions
      .get("getUserEcon")
      .execute(interaction.member);
    const userutil = await client.functions
      .get("getUserUtil")
      .execute(interaction.member);
    const filter = (m) => (m.author.id === interaction.user.id);
    const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });
    let notifmsg = await interaction.channel.send({content: "How much would you like to deposit? ||<amount>||" })
    let amount;
    collector.on("collect", (m) => {
      if (isNaN(m.content)) {
        return interaction.channel.send({ content: "*Don't forget to give me a deposit amount!*" });
      } else {
        amount = m.content;
        notifmsg.delete()
        m.delete()
      }
    });

    collector.on("end", async (collected) => {
      if (collected.size == 0) {
        let timemsg = await interaction.channel.send({
          content: "You didn't provide a deposit amount in time! Try again.",
          ephemeral: true,
        });
        setTimeout(() => {
          timemsg.delete();
        }, 5000);
        return;
      } else {
        if (amount > memberBal.coins) {
          let failmsg = await interaction.channel.send(
            `You're trying to deposit more coins than you're holding!`
          );
          setTimeout(() => {
            failmsg.delete();
          }, 5000);
          return;
        }
        const newbank = parseInt(memberBal.bank) + parseInt(amount);
        const newbal = parseInt(memberBal.coins) - parseInt(amount);
        await userEcon.findOneAndUpdate(
          { userID: interaction.user.id },
          { $inc: { bank: amount, coins: -amount } }
        );
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("deposit")
              .setLabel("Deposit")
              .setStyle("SUCCESS")
              .setEmoji("📨"),
            new Discord.MessageButton()
              .setCustomId("withdrawl")
              .setLabel("Withdrawl")
              .setStyle("DANGER")
              .setEmoji("🏧"),
            new Discord.MessageButton()
              .setCustomId("transfer")
              .setLabel("Transfer")
              .setStyle("PRIMARY")
              .setEmoji("🤝")
          );
          const embed = new Discord.MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setTitle(`${interaction.user.username}'s Bank!`)
            .setDescription(`\n**__🏦 ${interaction.user.username} has \`${newbank}\` coins in the bank! 🏦__**\n\nUse the buttons below to interact with your bank account!`)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(`${userutil.colour}`);
          interaction.message.edit({ embeds: [embed], components: [row] });
          let finmsg = await interaction.channel.send(`Successfully made a deposit of ${amount} coins, you're now holding ${newbal} coins.`);
          setTimeout(() => {
              finmsg.delete();
            }, 5000);
            return;
      }
    })
  },
};
