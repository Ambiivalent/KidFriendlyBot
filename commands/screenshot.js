module.exports = {
    name: "screenshot",
    async execute(message, pup, fs) {
        fs.readFile("./assets/screenshot_list.txt", "utf8", function read(err, data) {
            if (err) {
                throw err;
            }
            screenshots = data.toString().split("\n");
            message.reply(screenshots[Math.floor(Math.random() * (screenshots.length - 0) + 0)].substr(9, 25)); //25 char in link
        });
    }
}