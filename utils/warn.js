//just to warn 
module.exports = {
    newWarn: (msg) => {
        try {
            console.log(`\x1b[33maoi.jikan Warning:\x1b[91m ${msg}\x1b[0m`);
        } catch (err) {
            // none
        }
    }
}