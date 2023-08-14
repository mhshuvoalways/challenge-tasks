const Winner = require("../model/Winner");
const serverError = require("../utils/serverError");

const addWinner = (req, res) => {
  const { winnerName } = req.body;
  new Winner({ winnerName })
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getWinner = (req, res) => {
  Winner.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addWinner,
  getWinner,
};
