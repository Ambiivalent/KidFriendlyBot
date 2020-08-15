module.exports = {
    name: 'playlist',
    async execute(message, args, ytdl, ytsr, pup) {
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


        async function searchPlaylist(url) {
            try {
                console.log("Puppeteer Launched");
                const browser = await pup.launch();
                const page = await browser.newPage();
                console.log("Creating Webpage");
                await page.goto(url, { waitUntil: 'networkidle2' });
                console.log("Going to " + url);
                var songTitles = await page.evaluate(() => {
                    var songTitles = Array.from(document.getElementsByClassName("tracklist-name ellipsis-one-line")).map(x => x.innerHTML);
                    return songTitles;
                });
                var songArtist = await page.evaluate(() => {
                    var songArtist = Array.from(document.getElementsByClassName("second-line")).map(x => x.textContent);
                    return songArtist;
                });
                console.log("Retrieved song titles and artists");
                browser.close();
                console.log("Puppeteer Closed");
                console.log("searching ");
                for (c = 0; c < songTitles.length; c++) {
                    result = await ytsr(songTitles[c] + " " + songArtist[c], { limit: 1});
                    try {
                        if (result.items[0].link.includes("playlist") || result.items[0].link.includes("channel")) {
                            throw "video not found";
                        }
                        else if (result.items[0].link === undefined) {
                            throw "link not found"
                        }
                        else {
                            await playlist.push(result.items[0].link);
                        }
                    }
                    catch (e) {
                        console.log(songTitles[c] + " could not be logged, error: " + e);
                        continue;
                    }
                }
                message.reply(songTitles.length + " songs have been added to queue");
                console.log("complete");
                console.log(playlist);
                return await playlist;
            }
            catch (err) {
                console.log("fetch failled", err);
            }

        }

        let url = args[0];
        if (!args.length) {
            message.reply("Input a spotify url to utilize this command. Usage: []playlist {args: -spotify url} {args:playtype: -order -random}");
        }
        else {
            if (checkVoice() === true) {
                message.reply("Adding playlist to the queue. Please wait a moment");
                playlist.concat(await searchPlaylist(url));
            }
            else {
                message.reply("Please be in a voice channel to use this command!")
            }
        }
    },
};
