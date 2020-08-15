
module.exports = {
	name: 'volume',
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

        let volume = args[0];
        if (checkVoice() === false) {
            message.reply("Please be in a voice channel to use this command to use this command")
        }
        if (!args.length || volume > 1) {
            message.reply("Please specify a volume. Usage: []volume {args: float (0-1)}");
        }
        else {
            dispatcher.setVolume(volume);
            console.log(dispatcher.volume + "is now the volume.");
            message.reply("Volume is set to " + dispatcher.volume);
        }
	},
};