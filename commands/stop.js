module.exports = {
	name: 'stop',
    execute(message, args) {
        function checkVoice() {
            if (message.member.voice.channel) {
                message.member.voice.channel.join();
                console.log(react + "Joined voice channel in " + message.guild.name + react);
                return true;
            }
            else {
                return false;
            }
        }
        if (checkVoice() === false) {
            message.reply("Please be in a voice channel to use this command to use this command")
        }
        else {
            dispatcher.destroy();
            message.member.voice.channel.leave();
        }
	},
};