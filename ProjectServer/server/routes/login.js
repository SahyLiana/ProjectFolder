const express = require("express");
const { Login, Dashboard } = require("../controllers/login");
const authentications = require("../middleware/auth");

const routes = express.Router();

routes.route("/").post(Login);
routes.route("/dashboard").get(authentications, Dashboard);

module.exports = routes;
