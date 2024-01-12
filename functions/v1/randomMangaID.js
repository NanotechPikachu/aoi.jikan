const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomMangaID",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [sfw] = data.inside.splits;

    sfw = sfw.trim().toLowerCase();
    
    if (sfw != "true" && sfw != "false") return error.newError(d, "Invalid Boolean in sfw option");

    sfw = (sfw === "true")

    try {
      const random = await JIKAN_CLIENT.manga.random(sfw)
      data.result = random.id;
      return {
        code: d.util.setCode(data)
      };     
    } catch (e) {
      console.log(e);
      error.newError(d, e);      
    }
  }
}