function getFirstName(characterName, databaseNames) {
    let res = false;
    const nameParts = databaseNames.split(',').map(part => part.trim().toLowerCase());
    if (nameParts.includes(characterName.toLowerCase())) {
        res = true;
    };
    return res;
};

module.exports = { getFirstName };