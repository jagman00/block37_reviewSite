const { verifyToken } = require("./auth");

const router = require("express").Router();


router.use("/auth", require("./auth").router);
router.use("/comments", require("./comments"));
router.use("/users",  require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
module.exports = router;