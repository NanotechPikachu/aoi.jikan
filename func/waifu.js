const token = require("../index.js").getData().token;
const error = require("../utils/error.js");

async function api(d, query) {
  const url = `https://waifu.it/api/v4/${query}`;
  try {
     res  = await fetch(url, { method: 'GET', headers: {
      "Authorization": token,
    } }).then((res) => res.json());
    if (res.statusCode === 401 || token === "None") {
      return error.newError(d, "Invalid/No Token");
    } else {
      return res;
    }
  } catch (er) { 
    error.newError(d, er.message);
  }
}

module.exports = { api };