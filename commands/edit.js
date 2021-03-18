module.exports = {
    name: "edit",
    async execute(message,args,fs){

        const fetch = require('node-fetch');
        const spawn = require("child_process").spawn;

        async function downloadAndCreate(url,name,mode)
        {
            const response = await fetch(url);
            const buffer = await response.buffer();
            await fs.writeFile(`./commands/external/${name}`, buffer, () =>
                console.log("Downloaded Image"));

                var pythonApplication = spawn("python",["./commands/external/create.py",name,mode]);
                pythonApplication.stdout.on('data', function(data) { 
                    fileName = data.toString()
                    return fileName
            });
            
        }
    
        if (!args.length){
            message.channel.send("Error has occured")
        }
        else{
            var fileName = null
            mode = args[0]
            messageInfo = message.attachments.array()
            if (messageInfo.length > 0)
            {
                if (messageInfo[0]["attachment"].search(".jpg") != -1|| messageInfo[0]["attachment"].search(".png")!= -1)
                {
                    image = messageInfo[0]["name"]

                    fileName = await downloadAndCreate(messageInfo[0]["url"], image, mode);
                    setTimeout(function () {
                        message.channel.send({ files: [`Y:/WINDOWS/DiscordBot/KidFriendlyBot/commands/external/${fileName}`] })
                    }, 2000);                    
                }
                else{
                    message.channel.send("Error has occured")
                }
            }
    

        }

    }
}