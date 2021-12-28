module.exports = async (Discord, client, interaction) => {
	if (interaction.isCommand()){
		try {
			args = [null]
			if(interaction.options.getString("args")) interaction.options.getString("args").split(" ").forEach(arg => args.push(arg))
			await client.slashs.get(interaction.commandName).execute(client, interaction, args, Discord);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There seems to be an issue with this command! Please report it to <https://discord.gg/t9yebSe7jg>.', ephemeral: true });
		}
	}
	else if (interaction.isSelectMenu()) {
		const menu = client.menus.get(interaction.customId);
		if (!menu) return await interaction.reply({ content: 'There seems to be an issue with this menu! Please report it to <https://discord.gg/t9yebSe7jg>.', ephemeral: true })
		try {
			await menu.execute(interaction, client, Discord)
		} catch (err) {
			console.log(err)
			await interaction.reply({ content: 'There seems to be an issue with this menu! Please report it to <https://discord.gg/t9yebSe7jg>.', ephemeral: true })
		}
	}
	else if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		if (!button) return await interaction.reply({ content: 'There seems to be an issue with this button! Please report it to <https://discord.gg/t9yebSe7jg>.', ephemeral: true })
		try {
			await button.execute(interaction, client, Discord)
		} catch (err) {
			console.log(err)
			await interaction.reply({ content: 'There seems to be an issue with this button! Please report it to <https://discord.gg/t9yebSe7jg>.', ephemeral: true })
		}
	}
	}