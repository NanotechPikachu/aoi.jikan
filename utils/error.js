// just code to handle function errors
module.exports = {
    newError: (d, msg) => {
        try {
            let et = require('../index.js').getData().errorsType;
            let warn = require('./warn.js');
            let data = d.util.aoiFunc(d);

            if (et === "console") {
                console.log(`\x1b[94maoi.jikan Error:\x1b[95m ${msg}  |  \x1b[94mIn\x1b[95m ${data.function}.  |  \x1b[94mCode: \x1b[95m\`${data.code}\`\x1b[0m`);
            } else if (et === "msg" || et === "message") {
                d.channel.send(`
${"```js"}\n
aoi.jikan ERROR\n
Error: ${msg}
In: "${data.function}"
Where in code: \`${data.code}\`
\n${"```"}`);
            }
        } catch (err) {
            console.log(err)
        }
    }
}