const express = require('express');
const bodyParser = require('body-parser');
const writeFile = require('./writeFile');
const readFile = require('./readFile');
const generateToken = require('./generateToken');
const { validateEmail, validatePassword } = require('./middlewares/loginMiddleware');
const authToken = require('./middlewares/authToken');
const {
  talkerName,
  talkerAge,
  talkerTalk,
  talkerWatchedAt,
  talkerRate } = require('./middlewares/talkerMiddleware');

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

app.post('/login', validateEmail, validatePassword, generateToken, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: req.token });
});

app.post(
  '/talker',
  authToken,
  talkerName,
  talkerAge,
  talkerTalk,
  talkerWatchedAt,
  talkerRate,
  async (req, res) => {
    const talkers = await readFile();
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    talkers.push(newTalker);
    await writeFile(talkers);
    res.status(201).json(newTalker);
  },
  );

app.put(
  '/talker/:id',
  authToken,
  talkerName,
  talkerAge,
  talkerTalk,
  talkerWatchedAt,
  talkerRate,
  async (req, res) => {
    const talkers = await readFile();
    const { id } = req.params;
    const editTalker = req.body;
    const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
    const talkersFilter = talkers.filter((talker) => talker.id !== findTalker.id);
    editTalker.id = Number(id);
    talkersFilter.push(editTalker);
    await writeFile(talkersFilter);
    res.status(HTTP_OK_STATUS).json(editTalker);
  },
  );

app.delete('/talker/:id', authToken, async (req, res) => {
  const talkers = await readFile();
  const { id } = req.params;
  const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
  const talkersFilter = talkers.filter((talker) => talker.id !== findTalker.id);
  await writeFile(talkersFilter);
  res.status(204).json('');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
