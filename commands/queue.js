module.exports = {
	name: 'queue',
    execute(message, args) {
        let reset = args[0];
        if (!args.length) {
            console.log(playlist);
            message.channel.send("Next Song:")
            for (c = 0; c < playlist.length; c++) {
                message.channel.send(playlist[c]);
                if (c < 2) {
                    break;
                }
            }
        }
        else {
            if (reset) {
                playlist.length = 0;
            }
        }

	},
};