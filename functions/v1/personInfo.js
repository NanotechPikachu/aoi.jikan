const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$personInfo",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err);

    let [person, res = "name"] = data.inside.splits;

    if (!person) return error.newError(d, "Person not provided!")
    if (!res) return error.newError(d, "No result type specified.")

    person = person.trim().toLowerCase();
    res = res.trim().toLowerCase();
    
    const type = ['id', 'url', 'name', 'image', 'about', 'birth', 'alternate'];

    if (!type.includes(res)) return error.newError(d, "Invalid result type.");

    const per = await JIKAN_CLIENT.people.search(person);

    if (!per) return error.newError(d, "Invalid person specified.");

    const al = per[0].name?.alternate;
    
    let alt = al.map(item => item).join(', ');

    let result = '';

    switch(res) {
        case 'name':
            result = per[0].name?.name;
            break;
        case 'id':
            result = per[0].id;
            break;
        case 'url':
            result = per[0].url?.href;
            break;
        case 'image':
            result = per[0].image?.jpg?.default?.href ?? 'Image info not found';
            break;
        case 'alternate':
            result = alt ?? 'No alternative names found';
            break;
        case 'about':
            result = per[0].about ?? 'About info unavailable';
            break;
        case 'birth':
            result = per[0].birth ?? 'Birth info unavailable';
            break;
    }

    data.result = result;
    return {
      code: d.util.setCode(data),
    };
  }
} 