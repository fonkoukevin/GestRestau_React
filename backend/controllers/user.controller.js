const db = require("../models");
const slugify = require("slugify");
const bcrypt = require("bcryptjs")
const User = db.users;
const Op = db.Sequelize.Op;
const {TOKEN_KEY} = require("../config")
const jwt = require("jsonwebtoken")

exports.signin = async (req, res)=> {
    const {username:login,password}=req.body

if(!(username && password))
res.status(422).json({success:false,message:"Veuillez renseigner le login et le mot de passe"})

const user= await User.findOne({username});
if(user && (await bcrypt.compare(password,user.password))){
    const token = jwt.sign({user_id:user.id,username},TOKEN_KEY)
    res.status(200).json({user,token})
}

    User.create(user).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.create = async (req, res)=> {
    console.log(req.body, req.file);
    const user = {
        code : slugify(req.body.username),
        name : req.body.name,
        username : req.body.username,
        post : req.body.post,
        password : await bcrypt.hash(req.body.password, 10),
        photo : req.file?"user/photo/" + req.file.filename: null,
    };

    User.create(user).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}
exports.findAll = (req, res)=> {
    User.findAll().then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    }); 
}
exports.findOne = (req, res)=> {
    const id = req.params.id;
    User.findByPk(id).then(data=>{
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message:`Le user d'id ${id} n'existe pas!`
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

    User.update(req.body, {
        where:{id}
    }).then(num=>{
        if(num == 1){
            res.status(203).send({
                success : true
            });
        }else{
            req.status(404).send({
                message:`Le user d'id ${id} n'existe pas!`
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
    User.destroy({
        where:{id}
    }).then(num=>{
        if(num == 1){
            res.status(203).send({
                success : true
            });
        }else{
            req.status(404).send({
                message:`Le user d'id ${id} n'existe pas!`
            });
        }
    }).catch((err)=>{
        res.status(422).send({
            error:err.message
        })

    });
}