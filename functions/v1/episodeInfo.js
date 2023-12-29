const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$episodeInfo",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 

    let [id, epId, res] = data.inside.splits;

    id = id.trim().toLowerCase();
    res = res.trim().toLowerCase();
    epId = epId.trim().toLowerCase();

    type = ['url', 'title', 'id', 'aired', 'synopsis', 'duration']
    
    if (isNaN(id)) return error.newError(d, "Invalid anime ID.");
    if (isNaN(epId)) return error.newError(d, "Invalid episode ID.")
    if (!res) return error.newError(d, "Type not provided.");
    if (!type.includes(res)) return error.newError(d, "Invalid result type specified."); 
    
    let result;
    let resu;
    let ep;

    try {
      resu = await JIKAN_CLIENT.anime.get(id);
      if (!resu) return error.newError(d, "Anime not found.")
      ep = await JIKAN_CLIENT.anime.getEpisode(resu.id, epId);  
      if (!ep) return error.newError(d, "Episode not found.");

      switch(res) {
        case 'url':
          result = ep.URL?.href;
          break;
        case 'title':
          result = ep.title?.default;
          break;
        case 'id':
          result = ep.episodeId;
          break;
        case 'aired':
          result = ep.aired || 'Aired info not found.';
          break;
        case 'synopsis':
          result = ep.synopsis || 'Synopsis not found.';
          break;
        case 'duration':
          result = ep.duration || 'Duration not found.';
          break;
      }
      
      data.result = result;
      return {
        code: d.util.setCode(data)
      };     
    } catch (e) {
      error.newError(d, e)
    }
  }
}