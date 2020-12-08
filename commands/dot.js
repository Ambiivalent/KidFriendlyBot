module.exports = {
    name: "dot",
    async execute(message, args) {
        function cleanString(x) {
            dot = [];
            num = [];
            check = false;
            lastComma = 0
            comma = 0
            for (i = 0; i <= x.length; i++) {
                if (x.indexOf(",")) {
                    comma = x.indexOf(",", comma + 1);
                    if (check === false) {
                        num[i] = x.substring(0, comma);
                        lastComma = comma;
                        check = true;
                    }
                    else {
                        if (comma > 0) {
                            num[i] = x.substring(lastComma+1, comma);
                            lastComma = comma;
                        }
                        else {
                            num[i] = x.substring(lastComma+1, x.length);
                            break;
                        }
                    }
                }

            }
            return num;
        }

        if (!args.length) {
            message.channel.send("Input arguemnts please. Usage: []dot (x1, x2, x3), (y1,y2,y3)");
        }
        else if (args.length < 2) {
            message.channel.send("Please input another vector");
        }

        else {
            vectorOne = args[0].substring(1, (args[0].length - 1));
            vectorTwo = args[1].substring(1, (args[1].length - 1));

            vectorOne = cleanString(vectorOne);
            vectorTwo = cleanString(vectorTwo);

            for (x in vectorOne) {
                dot[x] = vectorOne[x] * vectorTwo[x];
            }
            message.channel.send("dot product is: " + dot);

        }
    }
}