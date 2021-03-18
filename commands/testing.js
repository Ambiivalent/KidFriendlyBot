module.exports = {
    name: "testing",
    async execute(message, args){
        //message.reply(message.attachments.array())
        //console.log(message.attachments.array())
        arrayFrom = message.attachments.array()
        for (var i = 0; i < arrayFrom.length; i++){
            //console.log(arrayFrom[0])
        }
        console.log(arrayFrom[0]["attachment"])
    }
}