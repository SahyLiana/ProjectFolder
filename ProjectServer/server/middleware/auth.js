const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Token with bearer is");
  console.log(token);

  if (!token || !token.startsWith("Bearer")) {
    throw new customError("No token found", 401);
  }

  const splitedToken = token.split(" ");
  const myToken = splitedToken[1];
  console.log("Token is");
  console.log(myToken);

  try {
    const decoded = jwt.verify(myToken, process.env.JWT_SECRET);
    console.log(decoded); //{
    //     id: '64c2c75a30044b4207526f28',
    //     name: 'admin',
    //     iat: 1690490146,
    //     exp: 1693082146
    //   }
    const { id, name } = decoded;
    req.user = { id, name };
    next();
  } catch (error) {
    throw new customError("Wrong token", 401);
  }
};

module.exports = authentication;
