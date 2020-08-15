module.exports = {
    name: 'leave',
    async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.leave();
            console.log(react + "Left voice channel in " + message.guild.name + react);
        }
        else {
            message.reply("Please be in a voice channel to use this command!");
        }
    },
};
