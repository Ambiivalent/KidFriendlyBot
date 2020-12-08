module.exports = {
    name: "define",
    async execute(message, args, pup){
        if (!args.length){
            message.reply("Input a word to translate! []define {word}")
        }
        else{
            let wordSearch = args[0]
            try{
                console.log("Pupeteer Launched");
                const browser = await pup.launch();
                const page = await browser.newPage();
                console.log("Creating Webpage")
                
                // await page.goto("https://duckduckgo.com/", {waitUntil: "networkidle2"})
                // await page.type('#search_form_input_homepage', `define ${wordSearch}`, {waitUntil: "networkidle2"})
                // await page.click('#search_button_homepage', {waitUntil: "networkidle2"})

                await page.goto("https://kids.britannica.com/scholars/browse/dictionary", {waitUntil: "networkidle2"})
                await page.type("#dictionary-search-input", `${wordSearch}`, {waitUntil: "networkidle2"})
                await page.click('button.btn.btn-primary', {waitUntil: "networkidle2"})
                await page.waitFor(5000)

                var searchedValue = await page.evaluate(() => {
                    // var searchedValue = Array.from(document.getElementsByClassName("zci__def__definition")).map(x => x.innerHTML);
                    var searchedValue = Array.from(document.querySelectorAll("dd")).map(x => x.innerText);
                    return searchedValue
                })
                if (searchedValue.length == 0){
                    message.channel.send("Definition not found.")
                }
                else{
                    message.channel.send(`The definition of ${wordSearch} is: `)
                    var counter = 1;
                    for (items of searchedValue){
                        message.channel.send(`${counter}. ${wordSearch} is: ${items}`)
                        counter = counter + 1
                    }
                }
                browser.close()
            }
            catch (err){
                console.log("fetch failed", err)
            }
    
        }

    }
}