const { joinVoiceChannel, createAudioPlayer } = require("@discordjs/voice")

module.exports = {
    name: "stop",
    dexcription: "Kicks the bot out of the current channel his in",
    execute(msg) {
        const connection = joinVoiceChannel({
            channelId: msg.member.voice.channel.id,
            guildId: msg.member.guild.id,
            adapterCreator: msg.member.voice.channel.guild.voiceAdapterCreator,
        })
        const player = createAudioPlayer();

        if (connection.subscribe(player)) {
            connection.destroy()
        } else {
            return
        }
    }
}