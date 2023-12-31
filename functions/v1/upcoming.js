const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$upcoming",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    let [season, res = "title", sep = "\n"] = data.inside.splits;

    try {

    season = season.trim().toLowerCase();
    res = res.trim().toLowerCase();
    
    if (!season) return error.newError(d, "Season not provided.");
    if (!res) return error.newError(d, "Result not provided.");
    if (season != "current" && season != "next") return error.newError(d, "The season parameter must be either \`current\` or \`next\`.");
    if (res != "status" && res != "title" && res != "dynamic") return error.newError(d, "The result parameter must be either \'status\' or \'dynamic\' or \'title\'.")

    let schedule = (season === "current") ? await JIKAN_CLIENT.seasons.getNow() : await JIKAN_CLIENT.seasons.getUpcoming();
      
    if (!schedule) return error.newError(d, "Season schedule not found.");

    let result;
    let sch = [];

    for (const obj of schedule) {
      if (res === "title") {
        sch.push(obj.title.default);
      } else if (res === "dynamic") {
        sch.push(`${obj.title.default} | ${obj.airInfo.status}`);
      } else {
        sch.push(obj.airInfo.status);
      }
    };

    result = sch.map(item => item).join(sep);
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}