const tts = require('google-tts-api');
const download = require('download');
const { Readable } = require('stream');

module.exports = {
  name: "tts",
  description: "talks for a user in a VC",
  cooldown: 0,
  category: "music",
  use: "!m tts",
  settings: {
    baseAudio: 1
  },
  async execute(client, message, argsold, Discord, economy, util) {
    let vc = message.member.voice.channel;
    if (!vc) return message.channel.send('Your\'re not in a vc!');
    await vc.join()

    if(!argsold[2]) return message.channel.send(`Include the language you want to use! <https://cloud.google.com/speech/docs/languages>\n||note: some of the languages won't work||`)

    const args = argsold.slice(1)

    let Lang = args.shift();

    let urls = tts.getAllAudioUrls(args.join(' '), {
      lang: Lang,
      slow: false
    }).map(val => val.url);

    let options = {
      seek: 0,
      volume: this.settings.baseAudio
    };

    for (let url of urls){
      await new Promise(async (resolve, reject) => {
        let audio = Readable.from(await download(url));

        const stream = message.guild.me.voice.connection.play(audio, options);

        stream.on('finish', () => {
          stream.end();
          delete audio, stream;
          vc.leave()
          resolve();
        });
      })
    }
  }
}
