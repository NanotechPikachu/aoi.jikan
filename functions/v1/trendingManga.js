const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');
const requireText = require('../../utils/require-text.js');
const query = requireText('../../func/trendingM.graphql', require);

module.exports = {
  name: "$trendingManga",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    let [api] = data.inside.splits;

    try {

    api = api.trim().toLowerCase();
    let result;
    
    if (!api) return error.newError(d, "API not provided.");
    if (api != "mal" && api != "anilist") return error.newError(d, "Invalid API provided.");

    if (api === "anilist") {
      const res = await fetch('https://graphql.anilist.co/', { method: 'POST', headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ query }) }).then(res => res.json()).catch(err => err);

      let anime = [];
      let i = 1;
      const ob = res.data.Page.media;

      for (const obj of ob) {
        anime.push(`${i} | ${obj.title.romaji}`);
        i += 1;
      };

      result = anime.map(item => item).join('\n');
    } else {
      const res = await JIKAN_CLIENT.top.listManga({filter: "bypopularity", type: "manga"})

      let anime = [];
      let i = 1;

      for (const obj of res) {
        if (i > 10) break;
        anime.push(`${i} | ${obj.title?.english}`);
        i += 1;
      };

      result = anime.map(item => item).join('\n');
    };
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}