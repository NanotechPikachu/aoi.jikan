const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$randomCharImg",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [type, id] = data.inside.splits;

    type = type.trim().toLowerCase();
    id = id.trim().toLowerCase();

    if (type != "anime" && type != "manga") return error.newError(d, "Invalid type specified. It must be \'anime\' or \'manga\'");
    if (!id) return error.newError(d, "ID not provided.");
    if (isNaN(id)) return error.newError(d, "Invalid anime/manga ID");
    
    let result;
    let res;
    let chrArray;
    let random;
    let set = new Set();

    try {
      if (type === "anime") {
        res = await JIKAN_CLIENT.anime.get(id);
      if (!res) return error.newError(d, "custom", {}, "Anime not found.")
      chrArray = await JIKAN_CLIENT.anime.getCharacters(res.id);   
      } else if (type === "manga") {
        res = await JIKAN_CLIENT.manga.get(id);
        if (!res) return error.newError(d, "Manga not found.")
        chrArray = await JIKAN_CLIENT.manga.getCharacters(res.id);
      }

      if (chrArray.length === 0) return error.newError(d, "Characters not found.");

      do {
          random = Math.floor(Math.random() * chrArray.length);
      } while (set.has(random));
      

      if (set.size >= chrArray.length) {
        set.clear();
      } else {
        set.add(random);
      }

      result = chrArray[random].character.image.webp.default;
      
      data.result = result;
      return {
        code: d.util.setCode(data)
      };    
    } catch (e) {
      error.newError(d, e)
    }
  }
}