const fs = require("fs");
const  path = require("path");
const error = require("./utils/error.js");
const warn = require("./utils/warn.js");

module.exports = {
    setup: (Obj) => {
        const warn = require("./utils/warn.js");
        const { err } = require('../../errorAoi.js');

        const bot = Obj.bot || Obj.client;
        const et = Obj.errorsType || "message";
        const vers = Obj.version || "v1";
        const token = Obj.token || "None";

        this.data = {
            "client": bot,
            "dirname": process.cwd(),
            "errorsType": et,
            "version": vers,
            "token": token
        };

        if (vers && vers.toLowerCase() === "v1") {
            for (const file of fs.readdirSync(path.join(__dirname, "./functions/v1")).filter(file => file.endsWith(".js"))) {
                var funcs = require("./functions/v1/"+file);
                bot.functionManager.createFunction(
                    funcs
                );
            };

          err('red', '╭————————————————————————╮');
          err('magenta', '|       aoi.jikan        |');
          err('yellow', '|     Initialising...    |');
          err('cyan', '|       Version 1        |');
          err('green', '|        Loaded!         |')
          err('red', '╰————————————————————————╯')

          if (token != "None") {
          err('green', '╭————————————————————————╮');
          err('red', '|  Waifu API integrated! |')
          err('green', '╰————————————————————————╯')
          };

          console.log(" ");

          err('blue', "| Errors Type: " + et + " |\x1b[0m");
          
          console.log(" ");
        } else {
            warn.newWarn("Version '"+vers+"' not found, please set version to \"v1\". If you dont change it to supported version, aoi.jikan will not work.")
        };

        if (et !== "console" && et !== "msg" && et !== "message" && et !== "none") {
            warn.newWarn(`Unknown 'ErrorsType' option type. aoi.jikan Errors would not be shown.`);
        };
      
       const { check } = require('./utils/new.js');
       check('aoi.jikan');
    },

    getData: () => {
        return this.data;
    },

    utils: {
        error: require("./utils/error.js"),
        warn: require("./utils/warn.js")
    },
};