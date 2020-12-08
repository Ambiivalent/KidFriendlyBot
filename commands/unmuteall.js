module.exports = {
    name: "unmuteall",
    execute(message) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (message.member.voice.channel) {
                const connection = message.member.voice.channel.join();
                console.log(react + "Joined voice channel in " + message.guild.name + react);
                channel = message.member.voice.channel;
                for (const [memberID, member] of channel.members) {
                    member.voice.setMute(false);
                    console.log("UNMUTED " + member.displayName);
                }
            }
            else {
                message.reply("Please join a voice channel.")
            }
        }
        else {
            message.reply("You do not have permission to use this command.");
        }
    }
}