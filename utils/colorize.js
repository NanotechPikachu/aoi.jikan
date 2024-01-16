function color(col) {
  switch(col) {
    case 'red':
      return "\x1b[31m";
      break;
    case 'blue':
      return "\x1b[34m";
      break;
    case 'green':
      return "\x1b[32m";
      break;
    case 'yellow':
      return "\x1b[33m";
      break;
    case 'magenta':
      return "\x1b[35m";
      break;
    case 'cyan':
      return "\x1b[36m";
      break;
    case 'white':
      return "\x1b[37m";
      break;
    case 'black':
      return "\x1b[30m";
      break;
  }
}

function err(col, msg) {
  console.log(`${color(col)}${msg}`);
};

module.exports = { err };