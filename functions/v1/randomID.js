const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomID",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [type, sfw = "true"] = data.inside.splits;
    
    try {
    type = type.trim().toLowerCase();
    sfw = sfw.trim().toLowerCase();

    if (sfw != "true" && sfw != "false") return error.newError(d, "Invalid Boolean in sfw option");
    if (type != "anime" && type != "manga") return error.newError(d, "Invalid type specified. It must be \'anime\' or \'manga\'");
    
    sfw = (sfw === "true");
    let random;

      if (type === "anime") {
        random = await JIKAN_CLIENT.anime.random(sfw);
      } else if (type === "manga") {
        random = await JIKAN_CLIENT.manga.random(sfw);
      };
      
      data.result = random.id;
      return {
        code: d.util.setCode(data)
      };     
    } catch (e) {
      error.newError(d, e)
    }
  }
}