const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$mangaInfo",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    const [mangaID, res] = data.inside.splits;
    
    if (!mangaID) return error.newError(d, "Anime ID not provided!")
    if (!res) return error.newError(d, "No result type specified.")
    
    const mID = mangaID.trim()
    const resu = res.trim().toLowerCase()
    const type = ['title', 'synopsis', 'background', 'image', 'ratings', 'genre', 'url', 'volumes', 'serializations', 'year', 'author', 'popularity'];
    
    if (!type.includes(resu)) return error.newError(d, "Invalid result type.");
    
    const manga = await JIKAN_CLIENT.manga.get(mID);
    
    if (!manga) return error.newError(d, "Invalid manga ID.");
    
    const stats = await JIKAN_CLIENT.manga.getStatistics(mID);
    let genres = manga.genres.map(genre => genre.name).join(', ');

    if (!genres || genres.trim() === '') {
        genres = 'No genre information.';
    }
    let ratings = '';

    if (stats.scores) {
        let totalScore = 0;
        let totalVotes = 0;

        for (const obj of stats.scores) {
            totalScore += obj.score * obj.votes;
            totalVotes += obj.votes;
        }

        const averageScore = totalScore / totalVotes;

        ratings = `Average score based off ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + ' / 10'}`;
        } else {
            ratings = 'Rating information not found.';
        }
    
    //SYNOPSIS, URL, EPISODES, GENRES, RATINGS, ETC.
    const SYNOPSIS = manga.synopsis ?? "Synopsis not found!";
    const BACKGROUND = manga.background ?? "Background not found!";
    const URL = manga.url ?? 'URL not found.';
    const GENRES = genres;
    const RATINGS = ratings;
    const TITLE = manga.title.default;
    const IMAGE = manga.image.webp.default;
    const YEAR = manga.publishInfo?.publishedFrom?.getFullYear() ??  'Year information not found.';
    const AUTHOR = manga.authors[0].name ?? "Author information unavailable!";
    const VOLUMES = manga.volumes?.toLocaleString() ?? "Volume information not found!";
    const POPULARITY = manga.popularity?.toLocaleString() ?? "Popularity information not found!";
    const SERIALIZATIONS = manga.serializations[0]?.name ?? "Serialization info not found!";
    
    let result = '';
    
    switch(resu) {
        case 'title':
            result = TITLE;
            break;
        case 'synopsis':
            result = SYNOPSIS;
            break;
        case 'background':
            result = BACKGROUND;
            break;
        case 'url':
            result = URL;
            break;
        case 'genre': 
            result = GENRES;
            break;
        case 'image':
            result = IMAGE;
            break;
        case 'ratings':
            result = RATINGS;
            break;
        case 'author':
            result = AUTHOR;
            break;
        case 'year':
            result = YEAR;
            break;
        case 'volumes':
            result = VOLUMES;
            break;
        case 'popularity':
            result = POPULARITY;
            break;
        case 'serializations':
            result = SERIALIZATIONS;
            break;
    }
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };   
    }
}