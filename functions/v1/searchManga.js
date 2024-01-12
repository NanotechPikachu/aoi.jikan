const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$searchManga",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
  
    let [manga, count = "10", filter = "none", sfw = "true"] = data.inside.splits;
    
    try {
      
    manga = manga.trim().toLowerCase();
    count = count.trim().toLowerCase();
    filter = filter.trim().toLowerCase();
    sfw = sfw.trim().toLowerCase();
    count = parseInt(count);
    fil = ["manga", "novel", "doujin", "manhwa", "manhua", "lightnovel", "oneshot", "publishing", "complete", "discontinued", "upcoming", "hiatus", "none"];

    if (!manga) return error.newError(d, "Manga not provided to search.");
    if (!filter) return error.newError(d, "Filter not provided to search.");
    if (!count == true) return error.newError(d, "Invalid number provided")
    if (count > 20 || count < 1) return error.newError(d, "Count must be between \'1\' and \'20\'");
    if (!fil.includes(filter)) return error.newError(d, "Invalid filter.");
    if (!sfw) return error.newError(d, "Invalid sfw option.");
    if (sfw != "true" && sfw != false) return error.newError(d, "Invalid boolean in \'sfw\' parameter.");

    let result;
    let i = 1;
    let mnr = [];
    let mn;
    sfw = (sfw === "true");

    switch(filter) {
      case "manga":
        mn = await JIKAN_CLIENT.manga.search(manga, {type: "manga", sfw: sfw});
        break;
      case "doujin":
        mn = await JIKAN_CLIENT.manga.search(manga, {type: "doujin", sfw: sfw});
        break;
      case "oneshot":
        mn = await JIKAN_CLIENT.manga.search(manga, {type: "oneshot", sfw: sfw});
        break;
      case "manhua":
        mn = await JIKAN_CLIENT.manga.search(manga, {type: "manhua", sfw: sfw});
        break;
      case "manhwa":
        mn = await JIKAN_CLIENT.manga.search(manga, {type: 'manhwa', sfw: sfw});
        break;
      case 'novel':
        mn = await JIKAN_CLIENT.manga.search(manga, {type: 'novel', sfw: sfw});
        break;
      case 'lightnovel':
        mn = await JIKAN_CLIENT.manga.search(manga, {type: 'lightnovel', sfw: sfw});
        break;
      case 'none':
        mn = await JIKAN_CLIENT.manga.search(manga, {sfw: sfw});
        break;
      case 'hiatus':
        mn = await JIKAN_CLIENT.manga.search(manga, {status: 'hiatus', sfw: sfw});
        break;
      case 'discontinued':
        mn = await JIKAN_CLIENT.manga.search(manga, {status: 'discontinued', sfw: sfw});
        break;
      case 'publishing':
        mn = await JIKAN_CLIENT.manga.search(manga, {status: 'publishing', sfw: sfw});
        break;
      case "complete":
        mn = await JIKAN_CLIENT.manga.search(manga, {status: 'complete', sfw: sfw});
        break;
      case 'upcoming':
        mn = await JIKAN_CLIENT.manga.search(manga, {status: 'upcoming', sfw: sfw});
        break;
    };
      
    for (const obj of mn) {
      if (i > count) break;
      mnr.push(`${obj.title?.default} | ${obj.id}`);
      i ++;
    };
      
    result = mnr.map(item => item).join("\n");

    if (!result) return error.newError(d, "Manga not found");

    data.result = result;
    return {
      code: d.util.setCode(data)
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}