module.exports = {
    name: 'join',
    async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            console.log(react + "Joined voice channel in " + message.guild.name + react);
        }
        else {
            message.reply("Please be in a voice channel to use this command!")
        }
    },
};
