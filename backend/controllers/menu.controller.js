const db = require("../models");
const slugify = require("slugify");
const Menu = db.menus;
const Op = db.Sequelize.Op;

exports.create = (req, res)=> {
    console.log(req.body, req.file);
    const menu = {
        code : slugify(req.body.name + " " + req.body.type),
        name : req.body.name,
        price : req.body.price,
        type : req.body.type,
        duration : req.body.duration,
        photo : req.file?"menu/photo/" + req.file.filename: null,
        description : req.body.description,
        isAvailable : req.body.isAvailable,
    };

    Menu.create(menu).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.findAll = (req, res)=> {
    Menu.findAll().then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    }); 
}
exports.findOne = (req, res)=> {
    const id = req.params.id;
    Menu.findByPk(id).then(data=>{
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

    Menu.update(req.body, {
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
    Menu.destroy({
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