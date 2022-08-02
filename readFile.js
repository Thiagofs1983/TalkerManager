const fs = require('fs').promises;

const readFile = async () => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(content);
};

module.exports = readFile;