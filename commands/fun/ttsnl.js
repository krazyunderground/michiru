const tts = require('google-tts-api');
const download = require('download');
const { Readable } = require('stream');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  name: "ttsnl",
  gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/tts.js",
  description: "The tts command, without leaving the VC",
  cooldown: 0,
  category: "fun",
  use: "tts <message>",
  async execute(client, message, argsold, Discord) {
    let vc = message.member.voice.channel;
    if (!vc) return message.reply('Your\'re not in a vc!');
    let connection = await joinVoiceChannel({
      channelId: vc.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
  })

    if(!argsold[2]) return message.reply(`Include the language you want to use! <https://cloud.google.com/speech/docs/languages>\n||note: some of the languages won't work||`)

    const args = argsold.slice(1)

    let Lang = args.shift();

    let urls = tts.getAllAudioUrls(args.join(' '), {
      lang: Lang,
      slow: false
    }).map(val => val.url);

    const player = createAudioPlayer()

    for (let url of urls){
      await new Promise(async (resolve, reject) => {
        let audio = createAudioResource(Readable.from(await download(url)))

        connection.subscribe(player)

        const stream = player.play(audio)
      })
    }
  }
}
