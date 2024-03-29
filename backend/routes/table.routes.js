module.exports = (app) => {
    const tableController = require("../controllers/table.controller");
    const router = require("express").Router();

    router.post("/", tableController.create);
    router.get("/", tableController.findAll);
    router.get("/:id", tableController.findOne);
    router.put("/:id", tableController.update);
    router.delete("/:id", tableController.delete);

    app.use("/api/tables", router);
}