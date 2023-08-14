const router = require("express").Router();
const { addWinner, getWinner } = require("../controller/controller");

router.post("/addwinner", addWinner);
router.get("/getwinners", getWinner);

module.exports = router;
