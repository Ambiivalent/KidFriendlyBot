module.exports = {
    name: 'search',
    async execute(message, args, ytsr) {
        let songName = args.join(" ");
        if (!args.length) {
            message.reply("Incorrect usage of command. Please provide arguements");
        }
        else {
            result = await ytsr(songName, { limit: 1 });
            message.reply(`Found video: ${result.items[0].link}`);
        }
    },
};
