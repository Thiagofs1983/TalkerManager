const HTTP_NOK_STATUS = 400;
const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

const talkerName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(HTTP_NOK_STATUS).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const talkerAge = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const talkerTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(HTTP_NOK_STATUS).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

const talkerWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!regexDate.test(watchedAt)) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const talkerRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  talkerName,
  talkerAge,
  talkerTalk,
  talkerWatchedAt,
  talkerRate,
};