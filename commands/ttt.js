const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ttt",
    async execute(message, args){
        const playerOneTile = ":blue_circle:"
        const playerTwoTile = ":x:"
        var tiles = [
            [":white_square_button:",":white_square_button:",":white_square_button:"],
            [":white_square_button:",":white_square_button:",":white_square_button:"],
            [":white_square_button:",":white_square_button:",":white_square_button:"]
        ]

        async function showBoard(){
            const embed = new MessageEmbed()
            .setTitle("Tic Tac Toe Game")
            .setColor("0xff0000")
            .setDescription(`${player} turn 
            \n${tiles[0]}
            \n${tiles[1]}
            \n${tiles[2]}
            `)
            const nextMsg = await message.channel.send(embed)
        }
        function movement(currentPlayer){
            switch (move.substring(0)){
                case "a":
                    tiles[0][move.substring(1)] = currentPlayer;
                    break;
                case "b":
                    tiles[1][move.substring(1)] = currentPlayer;
                    break;
                case "c":
                    tiles[2][move.substring(1)] = currentPlayer;
                    break;
            }
        }


        if (!args.length){
            message.reply("Usage: []tictactoe {a-c, 1-3} ex: []tictactoe a2")
        }
        else if (args[0] == "start"){
            message.reply("You are player one!")
            var playerOne = message.author
            var player = playerOne
            playState = true
        }
        else if (args[0] == "join"){
            message.reply("You are player two!")
            var playerTwo = message.author
            showBoard()
        }
        else{
            let move = args[0]
            try{
                console.log(playerOne, playerTwo)
                if (player == playerOne){
                    movement(playerOneTile)
                    player = playerTwo
                }
                else{
                    movement(playerTwoTile)
                    player = playerOne
                }
            }
            catch{
                message.reply("Move was invalid")
            }

            
    }
}
}