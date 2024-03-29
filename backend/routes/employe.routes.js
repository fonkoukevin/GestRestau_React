module.exports = (app, upload) => {
    const employeController = require("../controllers/employe.controller");
    const router = require("express").Router();

    router.post("/", employeController.create);
    router.get("/", employeController.findAll);
    router.get("/:id", employeController.findOne);
    router.put("/:id", employeController.update);
    router.delete("/:id", employeController.delete);

    app.use("/api/employes", router);
}