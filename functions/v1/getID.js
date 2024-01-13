const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$getID",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
  
    const [name, type = 'Anime'] = data.inside.splits;
    
    if (!name) {
        return error.newError(d, "Anime/Manga/Character name not specified");
    }
    
    if (!type) return error.newError(d, "Type not specified.")
    
    let searchResults;
    let foundID = null;
    const ty = type.toLowerCase().trim();
    const n = name.trim();

    if (ty != 'anime' && ty != 'manga' && ty != 'char') {
        return error.newError(d, "Invalid type specified. Either \'Manga / Anime / Char\' only");
    }

    switch (ty) {
        case 'anime':
            searchResults = await JIKAN_CLIENT.anime.search(n);
            break;
        case 'manga':
            searchResults = await JIKAN_CLIENT.manga.search(n);
            break;
        case 'char':
            searchResults = await JIKAN_CLIENT.characters.search(n);
    }

    let i = 0;

    foundID = searchResults[i]?.id;

    if (!foundID) {
        foundID = "NFError";
    }

    data.result = foundID;
    return {
        code: d.util.setCode(data),
    };
}
}