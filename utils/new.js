// Import the semver module
const semver = require('semver');

// Define the function
function check(packageName) {
  // Get the latest version from the registry
  const latestVersion = require('child_process')
    .execSync(`npm view ${packageName} version`)
    .toString()
    .trim();
  
  // Get the installed version from the package.json
  const installedVersion = require('../package.json').version;

  // Compare the versions
  if (semver.gt(latestVersion, installedVersion)) {
    // Throw an error if the installed version is lower than the latest version
    console.log(`\x1b[31mA new version of ${packageName} is available. Please update from ${installedVersion} to ${latestVersion}.\x1b[0m`);
  } else {
     console.log(`\x1b[32m${packageName} is up to date!\x1b[0m`);
  }
}

module.exports = { check };