const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomImage",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [type, id] = data.inside.splits;
    
    try {
    type = type.trim().toLowerCase();
    id = id.trim().toLowerCase();

    if (type != "anime" && type != "manga") return error.newError(d, "Invalid type specified. It must be \'anime\' or \'manga\'");
    if (!id) return error.newError(d, "ID not provided.");
    if (isNaN(id) && id != "random") return error.newError(d, "Invalid \'id\' specified")

    let result;
    let res;
    let imgArray;
    let random;
    let set = new Set();

      if (type === "anime") {
        res = (id !== "random") ? await JIKAN_CLIENT.anime.get(id) : await JIKAN_CLIENT.anime.random();
        if (!res) return error.newError(d, "Invalid anime ID");
        imgArray = (id !== "random") ? await JIKAN_CLIENT.anime.getPictures(id) : await JIKAN_CLIENT.anime.getPictures(res.id);     
      } else if (type === "manga") {
        res = (id !== "random") ? await JIKAN_CLIENT.manga.get(id) : await JIKAN_CLIENT.manga.random();
        if (!res) return error.newError(d, "Invalid manga ID");
        imgArray = (id !== "random") ? await JIKAN_CLIENT.manga.getPictures(id) : await JIKAN_CLIENT.manga.getPictures(res.id);
      };

      if (imgArray.length === 0) return error.newError(d, "No images found.");
      
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