const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$animeEpisodes",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    let [id, res, sep = ".\n"] = data.inside.splits;

    id = id.trim().toLowerCase();
    res = res.trim().toLowerCase();

    type = ['url', 'title', 'id', 'aired']
    
    if (isNaN(id)) return error.newError(d, "Invalid anime ID");
    if (!res) return error.newError(d, "Type not provided.");
    if (!type.includes(res)) return error.newError(d, "Invalid result type specified."); 
    if (!sep) return error.newError(d, "Seperator not provided.")
    
    let result;
    let resu;
    let ep;
    let epArr = [];

    try {
      resu = await JIKAN_CLIENT.anime.get(id);
      if (!resu) return error.newError(d, "Anime not found.")
      ep = await JIKAN_CLIENT.anime.getEpisodes(resu.id);   
      for (const obj of ep) {
        if (res === 'url') {
          epArr.push(obj.URL?.href)
        } else if (res === 'title') {
          epArr.push(obj.title.default)
        } else if (res === 'id') {
          epArr.push(obj.episodeId)
        } else {
          epArr.push(obj.aired)
        };
      };

      if (epArr[0] === undefined) {
        result = "No data";
      } else {
        const m = epArr.map(item => item).join(sep);
        if (m.length >= 2000) {
          const n = m.lastIndexOf(sep, 2000)
          if (n !== -1) {
            const f = m.substring(0, n + 1);
            result = f;
        }
        } else {
            result = m;
        };  
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