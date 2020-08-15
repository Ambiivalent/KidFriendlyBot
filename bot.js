const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = "[]"
const pup = require("puppeteer");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { OpusEncoder } = require("@discordjs/opus");
const FFmpeg = require("ffmpeg-static");

global.react = "-------------------";

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.login(config.token);
global.playlist = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(react + "Successful Launch" + react);
});

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const encoder = new OpusEncoder(48000, 2);

    if (!message.guild) return;

    switch (command) {
        case "ping":
            client.commands.get('ping').execute(message, args);
            break;
        case "send":
            client.commands.get('send').execute(message, args);
            break;
        case "join":
            client.commands.get('join').execute(message, args);
            break;
        case "leave":
            client.commands.get('leave').execute(message, args);
            break;
        case "skip":
            client.commands.get('skip').execute(message, args, ytdl, ytsr);
            break;
        case "stop":
            client.commands.get('stop').execute(message, args);
            break;
        case "volume":
            client.commands.get('volume').execute(message, args);
            break;
        case "queue":
            client.commands.get('queue').execute(message, args);
            break;
        case "playlist":
            client.commands.get('playlist').execute(message, args, ytdl, ytsr, pup);
            break;
        case "play":
            client.commands.get('play').execute(message, args, ytdl, ytsr);
            break;
        case "search":
            client.commands.get("search").execute(message, args, ytsr);
            break;

    }


});