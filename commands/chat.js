const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    name: "chat",
    description: "Lets the bot chat with you",
    execute(msg, args, discord) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        })
        const openai = new OpenAIApi(configuration)
        const msgParts = msg.content.trim().split(":")
        openai.createCompletion("text-davinci-001", {
            prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ${msgParts[0].trim()}\nAI:`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        }).then((res) => {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzle chat:")
                .setTitle(msgParts[0].trim())
                .setDescription(res.data.choices[0].text)
                .setImage("https://i.imgflip.com/294e3m.jpg?a456696")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        }).catch((err) => console.log(err))
    }
}