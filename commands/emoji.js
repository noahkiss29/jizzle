const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    name: "emoji",
    description: "Convert a movie to emojies.",
    execute(msg, args, discord) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        })
        const openai = new OpenAIApi(configuration)
        openai.createCompletion("text-davinci-001", {
            prompt: `Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \n ${msg.content.substr(7)}:`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        }).then((res) => {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzle:")
                .setTitle(msg.content.substr(7))
                .setDescription(res.data.choices[0].text)
                .setImage("https://i.imgflip.com/4/9rnbv.jpg")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        }).catch((err) => console.log(err))
    }
}