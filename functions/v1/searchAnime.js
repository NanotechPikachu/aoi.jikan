const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$searchAnime",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);
  
    let [anime, count = "10", filter = "none", sfw = "true"] = data.inside.splits;
    
    try {
      
    anime = anime.trim().toLowerCase();
    count = count.trim().toLowerCase();
    filter = filter.trim().toLowerCase();
    sfw = sfw.trim().toLowerCase();
    count = parseInt(count);
    fil = ["tv", "movie", "ova", "special", "ona", "airing", "complete", "upcoming", "none"];

    if (!anime) return error.newError(d, "Anime not provided to search.");
    if (!filter) return error.newError(d, "Filter not provided to search.");
    if (!count == true) return error.newError(d, "Invalid number provided")
    if (count > 20 || count < 1) return error.newError(d, "Count must be between \'1\' and \'20\'");
    if (!fil.includes(filter)) return error.newError(d, "Invalid filter.");
    if (!sfw) return error.newError(d, "Invalid sfw option.");
    if (sfw != "true" && sfw != "false") return error.newError(d, "Invalid boolean in \'sfw\' parameter.");

    let result;
    let i = 1;
    let anr = [];
    let an;
    sfw = (sfw === "true");

    switch(filter) {
      case "tv":
        an = await JIKAN_CLIENT.anime.search(anime, {type: "tv", sfw: sfw});
        break;
      case "movie":
        an = await JIKAN_CLIENT.anime.search(anime, {type: "movie", sfw: sfw});
        break;
      case "ova":
        an = await JIKAN_CLIENT.anime.search(anime, {type: 'ova', sfw: sfw});
        break;
      case 'ona':
        an = await JIKAN_CLIENT.anime.search(anime, {type: 'ona', sfw: sfw});
        break;
      case 'special':
        an = await JIKAN_CLIENT.anime.search(anime, {type: 'special', sfw: sfw});
        break;
      case 'none':
        an = await JIKAN_CLIENT.anime.search(anime, {sfw: sfw});
        break;
      case 'airing':
        an = await JIKAN_CLIENT.anime.search(anime, {status: 'airing', sfw: sfw});
        break;
      case "complete":
        an = await JIKAN_CLIENT.anime.search(anime, {status: 'complete', sfw: sfw});
        break;
      case 'upcoming':
        an = await JIKAN_CLIENT.anime.search(anime, {status: 'upcoming', sfw: sfw});
        break;
    };

    if (!an) return error.newError(d, "Anime not found");

    for (const obj of an) {
      if (i > count) break;
      anr.push(`${obj.title.default} | ${obj.id}`);
      i ++;
    };
      
    result = anr.map(item => item).join("\n");

    data.result = result;
    return {
      code: d.util.setCode(data)
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}