const HTTP_NOK_STATUS = 401;

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(HTTP_NOK_STATUS).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) {
    return res.status(HTTP_NOK_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = authToken;