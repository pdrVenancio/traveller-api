// const { verifyToken } = require("./verify");

// function isUser(req, res, next) {
//   console.log(req)
//   const token = req.headers.authorization.split(' ')[1];

//   if (!token) {
//       return res.status(403).json({ message: 'É necessário um token' });
//   }

//   const decoded = verifyToken(token);
//   if (decoded) {
//     req.user = decoded;
//     next();
//   } else {
//       return res.status(403).json({ message: 'Acesso inválido!' });
//   }
// }

// module.exports = { isUser }
const { verifyToken } = require("./verify");

function isUser(req, res, next) {
  // Verificar se o cabeçalho authorization existe
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Cabeçalho Authorization ausente' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // Verificar se o token foi fornecido
  if (!token) {
      return res.status(403).json({ message: 'É necessário um token' });
  }

  // Decodificar e verificar o token
  try {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;  // Popula req.user com os dados decodificados do token
      next();  // Continua para a próxima função (rota)
    } else {
      return res.status(403).json({ message: 'Token inválido' });
    }
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(500).json({ message: 'Erro ao verificar token' });
  }
}

module.exports = { isUser };
