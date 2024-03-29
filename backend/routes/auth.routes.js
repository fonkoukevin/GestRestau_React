module.exports = (app, upload) => {
    const userController = require("../controllers/user.controller");
    const router = require("express").Router();

    router.post("/signin", userController.signin);

    app.use("/api/auth", router);
}