const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$getID",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err);
  
    const [name, type = 'Anime'] = data.inside.splits;
    if (!name) {
        return error.newError(d, "Anime/Manga name not specified");
    }
    if (!type) return error.newError(d, "Type not specified.")
    let searchResults;
    let foundID = null;
    const ty = type.toLowerCase().trim();
    const n = name.trim();

    if (ty != 'anime' && ty != 'manga') {
        return error.newError(d, "Invalid type specified. Either Manga / Anime only");
    }

    switch (ty) {
        case 'anime':
            searchResults = await JIKAN_CLIENT.anime.search(n);
            break;
        case 'manga':
            searchResults = await JIKAN_CLIENT.manga.search(n);
            break;
    }
    const quarterLength = Math.ceil(searchResults.length / 4);

    for (let i = 0; i < quarterLength; i++) {
        const result = searchResults[i].title.default.toLowerCase();

        if (n === result) {
                foundID = searchResults[i].id;
        } else {
            foundID = searchResults[0].id;
        }
    }

    if (!foundID) {
        foundID = "NFError";
    }

    data.result = foundID;
    return {
        code: d.util.setCode(data),
    };
}
}