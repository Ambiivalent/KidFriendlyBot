
module.exports = {
	name: 'play',
    async execute(message, args, ytdl, ytsr) {
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

        let playurl = args[0];
        if (!args.length) {
            if (playlist.length > 0) {
                await playSong(playlist);
            }
            else {
                message.reply("Please specify a youtube url. Usage: []play {args: youtube-url}");
            }
        }
        else {
            playlist.push(playurl);
            if (await checkVoice() === false) {
                message.reply("Please be in a voice channel to use this command to use this command");
            }
            else {
                console.log(playlist);
                message.reply("Added the song to the playlist");
                playSong(playlist);
            }
        }
	},
};