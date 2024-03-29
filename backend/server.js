const express = require("express");
const cors = require("cors");
const db = require("./models");
const upload = require("./storageConfig");
const path = require("path")

const app = express();
var corsOptions = {
    origin : "*"
    // origin : "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res)=> {
    res.json({
        message:"bienvenue au backend menu"
    });
})

db.sequelize.sync().then(()=>{
    console.log("Base de données synchronisée");
}).catch((err)=>{
    console.log("erreur : " + err.message);
})
app.get("/img/*", function(req, res){
    const filename = req.params[0]
    var file;
    if(filename.split("default").length > 1) {
        file = path.join(__dirname,"assets" , filename)
    }
    else{
        file = path.join(__dirname,"storages" , filename)
    }
    res.sendFile(file)
});
require("./routes/menu.routes")(app, upload);
require("./routes/user.routes")(app, upload);
require("./routes/auth.routes")(app, upload);
require("./routes/employe.routes")(app);
require("./routes/table.routes")(app);
require("./routes/commande.routes")(app);

const PORT = process.env.PORT||8080; 
app.listen(PORT, ()=>{
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
})