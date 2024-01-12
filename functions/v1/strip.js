const error = require('../../utils/error.js');

module.exports = {
  name: "$strip",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
  
    let [text] = data.inside.splits;

    if (!text) return error.newError(d, "No text to strip.");

    let result;

    try {
      if (text.length > 1000) {
        const mid = text.lastIndexOf('.', 1000);
        result = text.substring(0, mid + 1);
      } else {
        result = text;
      };

      data.result = result;
      return {
        code: d.util.setCode(data),
      };
        
    } catch (e) {
      error.newError(d, e);
    };
  }
}