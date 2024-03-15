const customError = require("../errors/custom-error");
const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(username, password);

  if (!username || !password) {
    throw new customError("Please provide credentials", 401);
  } else {
    try {
      const userCred = await Users.find({ name: username, password: password });
      // console.log(`User cred before ${userCred}`);
      if (userCred) {
        //   console.log("After");
        //   console.log(userCred);
        const token = jwt.sign(
          { id: userCred[0]._id, name: userCred[0].name },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return res.status(200).json({ msg: userCred, token });
      }
    } catch (error) {
      throw new customError("Wrong username or password", 401);
    }
  }

  //   const users=await

  //   res.status(200).json({ msg: "This is a test login" });
};

const Dashboard = async (req, res) => {
  //   const token = req.headers.authorization;

  //   if (!token || !token.startsWith("Bearer")) {
  //     throw new customError("No token found", 401);
  //   }

  //   const splitedToken = token.split(" ");
  //   const myToken = splitedToken[1];
  //   //   console.log(myToken);

  //   try {
  //     const decoded = jwt.verify(myToken, process.env.JWT_SECRET);
  //     console.log(decoded); //{
  //     //     id: '64c2c75a30044b4207526f28',
  //     //     name: 'admin',
  //     //     iat: 1690490146,
  //     //     exp: 1693082146
  //     //   }
  //   } catch (error) {
  //     throw new customError("Wrong token", 401);
  //   }

  //   res.status(200).json({ msg: token });
  res.status(200).json({ msg: req.user });
};

module.exports = { Login, Dashboard };
