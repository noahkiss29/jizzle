const Axios = require("axios")

module.exports = {
    name: "meme",
    description: "Meme command",
    execute(msg, args, discord) {
        Axios.get(`https://meme-api.herokuapp.com/gimme/dankmemes`)
            .then((res) => {
                const msgEmbed = new discord.MessageEmbed()
                    .setAuthor("Jizzle:")
                    .setDescription("Some funny memes for you from r/dankmemes")
                    .setImage(res.data.preview[res.data.preview.length - 1])
                    .setColor("#ffff00")
                    .setTimestamp()
                msg.channel.send({ embeds: [msgEmbed] })
            }).catch((err) => console.log(err))
    }
}