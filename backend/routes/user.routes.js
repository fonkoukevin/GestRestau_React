module.exports = (app, upload) => {
    const userController = require("../controllers/user.controller");
    const router = require("express").Router();

    router.post("/", upload("user/photo/").single("photo"), userController.create);
    router.get("/", userController.findAll);
    router.get("/:id", userController.findOne);
    router.put("/:id", userController.update);
    router.delete("/:id", userController.delete);

    app.use("/api/users", router);
}