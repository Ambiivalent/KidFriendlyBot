const { MessageEmbed, Channel } = require("discord.js")

module.exports = {
    name: "holygrail",
    async execute(message, args, fs){

        fileLocation = "Y:/せーはい"
        const animeImages = fs.readdirSync(fileLocation)
        if (!args.length || args[0] > animeImages.length){
            var num = Math.floor(Math.random() * animeImages.length) + 1
        }  
        else{
            var num = args[0]
        }
        image = animeImages[num]
        const embed = new MessageEmbed()
            .setColor('#a83283')
            .setTitle(`Found Image Number ${num}`)
            .attachFiles(`${fileLocation}/${image}`)
            .setImage(`attachment://${image}`)
        message.channel.send(embed)
        
    }
}