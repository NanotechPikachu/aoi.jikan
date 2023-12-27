const fs = require("fs");
const  path = require("path");
const error = require("./utils/error.js");
const warn = require("./utils/warn.js");

module.exports = {
    setup: (Obj) => {
        const warn = require("./utils/warn.js");

        const bot = Obj.bot || Obj.client;
        const et = Obj.errorsType || "message";
        const vers = Obj.version || "v1";

        this.data = {
            "client": bot,
            "dirname": process.cwd(),
            "errorsType": et,
            "version": vers
        };

        if (vers && vers.toLowerCase() === "v1") {
            for (const file of fs.readdirSync(path.join(__dirname, "./functions/v1")).filter(file => file.endsWith(".js"))) {
                var funcs = require("./functions/v1/"+file);
                bot.functionManager.createFunction(
                    funcs
                );
            };
          console.log(`\x1b[34m|-----------------|\n\x1b[34m|----\x1b[34maoi.jikan\x1b[34m----|\n\x1b[34m|-----\x1b[34mLoaded.\x1b[34m-----|\n\x1b[34m|---\x1b[34mVersion: ${vers}\x1b[34m---|\n\x1b[34m|-----------------|\x1b[0m`);

          console.log(" ");
          console.log("\x1b[33m|\x1b[0m \x1b[33merrorsType: " + et + " |\x1b[0m")
            console.log(" ");
        } else {
            warn.newWarn("Version '"+vers+"' not found, please set version to \"v1\". If you dont change it to supported version, aoi.jikan will not work.")
        };

        if (et !== "console" && et !== "msg" && et !== "message" && et !== "none") {
            warn.newWarn(`Unknown 'ErrorsType' option type. aoi.jikan Errors would not be shown.`);
        };
    },

    getData: () => {
        return this.data;
    },

    utils: {
        error: require("./utils/error.js"),
        warn: require("./utils/warn.js")
    },
};