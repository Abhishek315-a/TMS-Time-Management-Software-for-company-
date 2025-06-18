const { createNotes, getNotes,deleteNote ,updateNote} = require("../Controllers/NotesController");
const {VerifyToken}  = require("../Middlewares/VerifyToken")
const router = require("express").Router();

router.post("/notes",VerifyToken,createNotes);
router.get("/notes",VerifyToken,getNotes);
router.delete("/notes/:id", VerifyToken, deleteNote);
router.put("/notes/:id", VerifyToken, updateNote);


module.exports =router;