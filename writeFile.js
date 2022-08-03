const fs = require('fs').promises;

const writeFile = (newTalker) => fs.writeFile('./talker.json', JSON.stringify(newTalker));

module.exports = writeFile;