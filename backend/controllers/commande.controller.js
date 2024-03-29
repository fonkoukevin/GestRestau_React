const db = require("../models");
const slugify = require("slugify");
const Commande = db.commandes;
const Op = db.Sequelize.Op;

exports.create = (req, res)=> {
    console.log(req.body, req.file);
    const commande = {
        code : slugify(req.body.name + " " + req.body.type),
        numero : req.body.numero,
        contenu : req.body.contenu,
        boisson : req.body.boisson,
        prix : req.body.prix,
        isAvailable : req.body.isAvailable,
    };

    Commande.create(commande).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.findAll = (req, res)=> {
    Commande.findAll().then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    }); 
}
exports.findOne = (req, res)=> {
    const id = req.params.id;
    Commande.findByPk(id).then(data=>{
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message:`Le menu d'id ${id} n'existe pas!`
            });
        }
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.update = (req, res)=> {
    const id = req.params.id;

    Commande.update(req.body, {
        where:{id}
    }).then(num=>{
        if(num == 1){
            res.status(203).send({
                success : true
            });
        }else{
            req.status(404).send({
                message:`Le menu d'id ${id} n'existe pas!`
            });
        }
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.delete = (req, res)=> {
    const id = req.params.id;
    Commande.destroy({
        where:{id}
    }).then(num=>{
        if(num == 1){
            res.status(203).send({
                success : true
            });
        }else{
            req.status(404).send({
                message:`Le menu d'id ${id} n'existe pas!`
            });
        }
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}