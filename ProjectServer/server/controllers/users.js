const { Users } = require("../models/users");
const CustomError = require("../errors/custom-error");

const updatePassword = async (req, res) => {
  const { id: userID } = req.params;
  //   console.log(id);
  const formData = req.body;
  console.log(formData);
  console.log(userID);
  // try {
  const findUser = await Users.findOneAndUpdate(
    {
      _id: userID,
      password: formData.oldpassword,
    },
    { password: formData.password },
    {
      runValidators: true,
      new: true,
    }
  );

  // if (findUser.length === 0) {
  //   throw new CustomError("Wrong old password", 401);
  // } else {
  //   const updatePassword = await Users.findOneAndUpdate(
  //     { _id: userID },
  //     { password: formData.password },
  //     {
  //       runValidators: true,
  //       new: true,
  //     }
  //   );
  // }

  if (!findUser) {
    throw new CustomError("Wrong old password", 401);
  }
  console.log("User found is");
  console.log(findUser);
  // } catch (error) {
  //   throw new CustomError("Wrong old password", 401);
  // }

  res.status(200).json("Update users");
};

const forgetPassword = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // try {
  const updatePassword = await Users.findOneAndUpdate(
    { name: name },
    { password: "123" },
    { new: true, runValidators: true }
  );
  console.log(updatePassword);

  if (!updatePassword) {
    throw new CustomError("Username not found", 401);
  }
  // } catch (e) {
  //   throw new CustomError("Username not found");
  // }

  res.status(200).json("Forget password");
};

module.exports = { updatePassword, forgetPassword };
