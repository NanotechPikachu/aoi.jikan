const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomImage",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    let [type, id] = data.inside.splits;

    type = type.trim().toLowerCase();
    id = id.trim().toLowerCase();

    if (type != "anime" && type != "manga") return error.newError(d, "Invalid type specified. It must be \'anime\' or \'manga\'");
    if (isNaN(id)) return error.newError(d, "Invalid \'id\' specified")

    let result;
    let res;
    let imgArray;
    let random;
    let set = new Set();

    try {
      if (type === "anime") {
        res = await JIKAN_CLIENT.anime.get(id);
        imgArray = await JIKAN_CLIENT.anime.getPictures(id);      
      } else if (type === "manga") {
        res = await JIKAN_CLIENT.manga.get(id);
        imgArray = await JIKAN_CLIENT.manga.getPictures(id);
      }

      if (!res) return error.newError(d, "Invalid anime/manga ID specified.")
      if (imgArray.length === 0) {
        result = null;
      };
      
      do {
          random = Math.floor(Math.random() * imgArray.length);
      } while (set.has(random));

      if (set.size >= imgArray.length) {
        set.clear();
      } else {
        set.add(random);
      };

      result = imgArray[random].webp.default.href;
      
      data.result = result;
      return {
        code: d.util.setCode(data)
      };    
    } catch (e) {
      error.newError(d, e);
    }
  }
}