const express = require('express');
const bodyParser = require('body-parser');
const readFile = require('./readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOK_STATUS = 404;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const talkers = await readFile(); 
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readFile();
  const { id } = req.params;
  const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
  if (!findTalker) {
    return res.status(HTTP_NOK_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
