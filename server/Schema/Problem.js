const mongoose=require("mongoose")

const problemSchema=mongoose.Schema({
    problemId:{
        type:String,
        unique:true
    },
    problemName:{
        type:String,
        
    },
    difficulty:String,
    description:String,
    examples:[
        {
            input:String,
            output:String,
            explanation:String
        }
    ]
})

module.exports=mongoose.model("problem",problemSchema)