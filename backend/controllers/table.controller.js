const db = require("../models");
const slugify = require("slugify");
const Table = db.tables;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const table = {
    code: slugify(req.body.name + " " + req.body.type),
    numero: req.body.numero,
    nombrePlaces: req.body.nombrePlaces,
    forme: req.body.forme,
    position: req.body.position,
    isAvailable: req.body.isAvailable || true
  };

  Table.create(table)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
};

exports.findAll = (req, res) => {
  Table.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Table.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `La table d'id ${id} n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Table.update(req.body, {
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        res.status(203).send({
          success: true
        });
      } else {
        res.status(404).send({
          message: `La table d'id ${id} n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        res.status(203).send({
          success: true
        });
      } else {
        res.status(404).send({
          message: `La table d'id ${id} n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
};