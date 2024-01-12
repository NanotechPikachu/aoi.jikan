const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');
const requireText = require('../../utils/require-text.js');
const query = requireText('../../func/air.graphql', require);

module.exports = {
  name: "$nextAir",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [anime, type = "title"] = data.inside.splits;

    try {

    anime = anime.trim().toLowerCase();
    type = type.trim().toLowerCase();
    
    if (!anime) return error.newError(d, "Anime not provided.");
    if (!type) return error.newError(d, "Result type not provided.");

    let ty = ['title', 'url', 'time', 'episode'];
    if (!ty.includes(type)) return error.newError(d, "Invalid result type provided.");

    let result;
    const search = anime;
    const variables = { search, status: 'RELEASING' };
      
    let res = await fetch('https://graphql.anilist.co', { method: 'POST', headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ query, variables }) }).then(res => res.json()).catch(err => err);

    if (res.data.Media === null) return error.newError(d, "Failed to fetch data / Invalid anime.");

    switch(type) {
      case 'title':
        result = res.data.Media.title.english;
        break;
      case 'episode':
        result = res.data.Media.nextAiringEpisode.episode;
        break;
      case 'time':
        result = `${Math.floor(((res.data.Media.nextAiringEpisode.timeUntilAiring*1000) + Date.now())/1000)}`;
        break;
      case 'url':
        result = res.data.Media.siteUrl;
        break;
    }
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}