const db = require("../models");
const slugify = require("slugify");
const Employe = db.employes;
const Op = db.Sequelize.Op;

exports.create = (req, res)=> {
    console.log(req.body, req.file);
    const employe = {
        code: slugify(req.body.name + " " + req.body.type),
        nom: req.body.nom,
        surnom: req.body.surnom,
        poste: req.body.poste,
        telephone: req.body.telephone,
        isAvailable: req.body.isAvailable,
    
    };

    Employe.create(employe).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.findAll = (req, res)=> {
    Employe.findAll().then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    }); 
}
exports.findOne = (req, res)=> {
    const id = req.params.id;
    Employe.findByPk(id).then(data=>{
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

    Employe.update(req.body, {
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
    Employe.destroy({
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