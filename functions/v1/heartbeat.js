const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$heartbeat",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    try {
    const heartbeat = JIKAN_CLIENT.heartbeat.check();

    let result;

    if (heartbeat.down) {
      result = "MAL is down!"
    } else {
      result = "MAL API is up and healthy!"
    };

    data.result = result;
    return {
      code: d.util.setCode(data)
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}