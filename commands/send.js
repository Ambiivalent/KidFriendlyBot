module.exports = {
	name: 'send',
    execute(message, args) {
        let channelID = args.shift()
        sentmessage = args.join(" ");
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (!channelID || !sentmessage) {
                message.reply("Please specify a message and channel. Usage: []send {args: channel} {args: message}");
            }
            else {
                message.guild.channels.cache.get(channelID).send(sentmessage);
            }
        }
        else {
            message.reply("Not enough permissions to use this command");
        }
	},
};