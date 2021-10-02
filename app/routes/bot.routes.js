const { authJwt } = require("../middlewares");
const controller = require("../controllers/bot.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/bot/text", [authJwt.verifyToken], controller.botText);

  app.post("/api/bot/image", [authJwt.verifyToken], controller.botImage);

};