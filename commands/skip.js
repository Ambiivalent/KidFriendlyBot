module.exports = {
	name: 'skip',
    execute(message, args, ytdl, ytsr) {
        function playSong(playlist) {
            const stream = ytdl(playlist[0], { quality: "lowestaudio", filter: "audioonly" });
            global.dispatcher = message.guild.voice.connection.play(stream);
            dispatcher.on('start', () => {
                console.log("Song has started playing");
                message.channel.send("Now playing: " + playlist[0]);
                console.log("Succesfully played: " + playlist[0]);
            });
            dispatcher.on('finish', () => {
                console.log("Song has finished playing");
                playlist.shift();
                if (playlist === undefined) {
                    return;
                }
                else {
                    playSong(playlist);
                }
            });
        }
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
        if (checkVoice() === false ){
            message.reply("Please be in a voice channel to use this command to use this command");
        }
        else if (playlist === undefined) {
            message.reply("There is nothing in the queue");
        }
        else {
            playlist.shift();
            if (playlist != undefined) {
                playSong(playlist);
            }
        }
	},
};