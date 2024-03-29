module.exports = (app, upload) => {
    const menuController = require("../controllers/menu.controller");
    const router = require("express").Router();

    router.post("/", upload("menu/photo/").single("photo"), menuController.create);
    router.get("/", menuController.findAll);
    router.get("/:id", menuController.findOne);
    router.put("/:id", menuController.update);
    router.delete("/:id", menuController.delete);

    app.use("/api/menus", router);
}