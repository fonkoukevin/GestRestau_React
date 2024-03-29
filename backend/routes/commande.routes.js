module.exports = (app, upload) => {
    const commandeController = require("../controllers/commande.controller");
    const router = require("express").Router();

    router.post("/", commandeController.create);
    router.get("/", commandeController.findAll);
    router.get("/:id", commandeController.findOne);
    router.put("/:id", commandeController.update);
    router.delete("/:id", commandeController.delete);

    app.use("/api/commandes", router);
}