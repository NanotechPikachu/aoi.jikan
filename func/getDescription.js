function getDescription(characterDescription) {
    let description;

    if (!characterDescription) {
        return description = 'Description not found.';
    } else {
        if (characterDescription.length > 1024) {
            const midPoint = characterDescription.lastIndexOf('.', 1024);

            if (midPoint !== -1) {
                const descriptionFirstPart = characterDescription.substring(0, midPoint + 1);
                description = descriptionFirstPart;
            }
        } else {
            description = characterDescription
        }
    }
    return description;
}

module.exports = { getDescription };