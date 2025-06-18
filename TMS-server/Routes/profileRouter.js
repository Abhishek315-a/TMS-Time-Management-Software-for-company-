const {updateProfile,getProfile} = require("../Controllers/ProfileController");
const {VerifyToken} = require("../Middlewares/VerifyToken");

const router = require("express").Router();

router.get("/",VerifyToken,getProfile)
router.patch("/",VerifyToken,updateProfile)


module.exports = router;