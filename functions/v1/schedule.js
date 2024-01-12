const { JIKAN_CLIENT } = require('../../func/jikan.js');
const error = require('../../utils/error.js');

module.exports = {
  name: "$schedule",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    
    let [day, kid = "false", SFW = "true"] = data.inside.splits;

    try {

    day = day.trim().toLowerCase();
    kid = kid.trim().toLowerCase();
    SFW = SFW.trim().toLowerCase();
    
    if (!day) return error.newError(d, "Day not provided.");
    if (!kid) return error.newError(d, "Kid filter empty.");
    if (!SFW) return error.newError(d, "Sfw filter empty.")
    if (SFW != "true" && SFW != "false") return error.newError(d, "The sfw parameter must be boolean.")
    if (kid != "true" && kid != "false") return error.newError(d, "The kid parameter must be boolean.")
    
    SFW = (SFW === "true");
    kid = (kid === "true");
    
    let type = ["monday", "tuesday",  "wednesday", "thursday", "friday", "saturday", "sunday", "week"];
    
    if (!type.includes(day)) return error.newError(d, "Invalid day entered.")

    day = (day === "week") ? null : day;
    
    const schedule = await JIKAN_CLIENT.schedules.list(day, {kids: kid, sfw: SFW});
    if (!schedule) return error.newError(d, "Schedule not found.");

    let result;
    let sch = [];

    for (const obj of schedule) {
      sch.push(obj.title.default)
    }

    result = sch.map(item => item).join(", ")
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
    } catch (e) {
      error.newError(d, e)
    }
  }
}