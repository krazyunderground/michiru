module.exports = async (Discord, client, interaction) => {
	if (!interaction.isCommand()) return;

	try {
		await client.slashs.get(interaction.commandName).execute(interaction, client, Discord);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
