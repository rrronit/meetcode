const mongoose=require("mongoose")

const db=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("database connected")
})}

module.exports = db