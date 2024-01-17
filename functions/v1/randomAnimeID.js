const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomAnimeID",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [sfw = "true"] = data.inside.splits;

    sfw = sfw.trim().toLowerCase();
    
    if (sfw != "true" && sfw != "false") return error.newError(d, "Invalid Boolean in sfw option");

    sfw = (sfw === "true")

    try {
      const random = await JIKAN_CLIENT.anime.random(sfw)
      data.result = random.id;
      return {
        code: d.util.setCode(data)
      };     
    } catch (e) {
      error.newError(d, e);      
    }
  }
}