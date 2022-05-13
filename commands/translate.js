const { Configuration, OpenAIApi } = require("openai")

module.exports = {
    name: "translate",
    description: "Translates into any language",
    execute(msg, args, discord) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        })
        const openai = new OpenAIApi(configuration);
        const msgParts = msg.content.trim().split(":")
        openai.createCompletion("text-davinci-001", {
            prompt: `Translate this into 1. ${args[0]}:\n\n${msgParts[1].trim()}\n\n`,
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }).then((res) => {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzle translation:")
                .setTitle(msgParts[1].trim())
                .setDescription(res.data.choices[0].text)
                .setImage("https://i.pinimg.com/originals/1d/85/e5/1d85e5aeedc15171e6c1d461f0fa1cf9.jpg")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        }).catch((err) => console.log(err))
    }
}