module.exports = {
    name: "help",
    description: "Help command",
    execute(msg, args, discord) {
        const msgEmbed = new discord.MessageEmbed()
            .setAuthor("Jizzle:")
            .setDescription("Some help for you little bitches: (or just kill yourself)")
            .setFields(
                { name: "Commands", value: `Prefix: -- \n\n - meme: Get a random meme. \n - quote: Get an inspiring quote. \n - waifu (tag url: https://waifu.im/docs/#random-image-query-strings): Get a nice waifu pick. \n - answer: Get an answer to a question you have. \n - translate (language): (<- The colon is needed!) Translate a english sentence into another language. \n - chat: Let us have a conversation. \n - play (title): Play music from YouTube. \n - stop: He leaves your voicechannel. \n - emoji (movie): Gives you a emoji response to a movie title.` }
            )
            .setImage("https://memegenerator.net/img/instances/75686517.jpg")
            .setColor("#ffff00")
            .setTimestamp()
        msg.channel.send({ embeds: [msgEmbed] })
    }
}

//kleine Ver. große Ver. Alter. Gemeinsames Wissen.