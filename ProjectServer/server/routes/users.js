const express = require("express");
const authentications = require("../middleware/auth");

const { updatePassword, forgetPassword } = require("../controllers/users");

const routes = express.Router();

routes.route("/password/:id").patch(authentications, updatePassword);
routes.route("/forgot_password/:name").patch(forgetPassword);

module.exports = routes;
