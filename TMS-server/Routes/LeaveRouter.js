const {getLeaves,leaves} = require("../Controllers/LeaveController");
const {VerifyToken}  = require("../Middlewares/VerifyToken")
const router = require("express").Router();

router.post("/leave",VerifyToken,leaves);
router.get("/leave",VerifyToken,getLeaves)

module.exports =router;