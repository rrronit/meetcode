const express=require("express")
const { submitCode, addprob,  getProblem } = require("../Controller/EditorController")
const router=express.Router()

router.post("/submit",submitCode)
router.post("/add",addprob)

router.post("/getId",getProblem)

module.exports=router