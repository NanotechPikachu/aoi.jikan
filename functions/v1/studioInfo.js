const error = require('../../utils/error.js');
const requireText = require('../../utils/require-text.js');
const query = requireText('../../func/studio.graphql', require);

module.exports = {
  name: "$studioInfo",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [studio, resu = "name"] = data.inside.splits;

    try {

    let result;
    let type = ["media", "isanime", "name", "url"];
    
    if (!studio) return error.newError(d, "Studio not provided.");
    if (!resu) return error.newError(d, "Result type not specified.");
    studio = studio.trim().toLowerCase();
    resu = resu.trim().toLowerCase();
    if (!type.includes(resu)) return error.newError(d, "Invalid result type provided.");
    let search = studio;

    const variables = { search };
    console.log(variables)

    const res = await fetch('https://graphql.anilist.co/', { method: 'POST', headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ query, variables }) }).then(res => res.json()).catch(err => err);
    console.log(res)

    let anime = [];
    const ob = res.data.Studio;

    if (ob === null) return error.newError(d, "Studio not found!");

    const obs = ob.media.nodes;
      
    for (const obj of obs) {
        anime.push(`${obj.title.romaji}`);
    };

      switch(resu) {
        case 'name':
          result = ob.name;
          break;
        case 'isanime':
          result = ob.isAnimationStudio;
          break;
        case 'url':
          result = ob.siteUrl;
          break;
        case 'media':
          result = anime.map(item => item).join(', ');
          break;
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