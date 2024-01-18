const { api } = require('../../func/waifu.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$quote",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [res = "quote"] = data.inside.splits;
    
    try {
    res.trim().toLowerCase();
    let result;

    if (res != "quote" && res != "obj") return error.newError(d, "Invalid result type specified.");
      
    const resu = await api(d, "quote");

    if (res === "quote") {
      result = resu.quote;
    } else {
      result = `{ "quote": "${resu.quote}", "author": "${resu.author}", "anime": "${resu.anime}" }`;
    };

    data.result = result;
    return {
      code: d.util.setCode(data)
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}