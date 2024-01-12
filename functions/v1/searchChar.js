const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$searchChar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
  
    let [char, count = "10"] = data.inside.splits;

    try {
    char = char.trim().toLowerCase();
    count = count.trim().toLowerCase();
    count = parseInt(count);

    if (!char) return error.newError(d, "Character not provided.");
    if (!count == true) return error.newError(d, "Invalid number provided")
    if (count > 30 || count < 1) return error.newError(d, "Count must be between \'1\' and \'30\'");

    let result;
    let i = 1;
    let chr = [];

    const ch = await JIKAN_CLIENT.characters.search(char);

    if (!ch) return error.newError(d, "Character not found");

    for (const obj of ch) {
      if (i > count) break;
      chr.push(`${obj.name} | ${obj.id}`);
      i ++;
    };
      
    result = chr.map(item => item).join("\n");

    data.result = result;
    return {
      code: d.util.setCode(data)
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}