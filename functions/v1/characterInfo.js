const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$charInfo",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [characterID, res] = data.inside.splits;
    
    if (!characterID) return error.newError(d, "Character ID not provided.");
    if (!res) return error.newError(d, "Enter the result type.")
    try {
    let cid = characterID.trim();
    res = res.trim().toLowerCase();
    
    const type = ["name", "url", "image", "nicknames", "favorites", "about", "manga", "anime"];
    
    if (!type.includes(res)) return error.newError(d, "Invalid result type entered.")
        
    const ch = await JIKAN_CLIENT.characters.get(cid);    
    let result;
    let an = [];
    let mn = [];

    if (!ch) return error.newError(d, "Character not found.");

    let nick = ch.nicknames.map(item => item).join(", ");

    const anime = await JIKAN_CLIENT.characters.getAnime(cid);
    if (!anime) {
      an.push("N/A");
    } else {
      for (const obj of anime) {
        an.push(obj.anime.title);
      }
    };

    const manga = await JIKAN_CLIENT.characters.getManga(cid);
    if (!manga) {
      mn.push("N/A");
    } else {
      for (const obj of manga) {
        mn.push(obj.manga.title);
      }
    };

    switch(res) {
      case 'name':
        result = ch.name;
        break;
      case 'about':
        result = ch.about || "No about info found.";
        break;
      case 'url':
        result = ch.url?.href || "URL not found.";
        break;
      case 'image':
        result = ch.image?.jpg?.default?.href || "Image not found.";
        break;
      case 'favorites':
        result = ch.favorites || "Favorites info not found.";
        break;
      case 'nicknames':
        result = nick || "Nicknames not found.";
        break;
      case 'anime':
        result = an.map(item => item).join(", ");
        break;
      case 'manga':
        result = mn.map(item => item).join(", ");
        break;
    }

    data.result = result;
    return {
      code: d.util.setCode(data),
    };
    } catch (e) {
      error.newError(d, e);
    }
  }
}