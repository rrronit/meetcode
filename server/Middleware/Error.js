

const Error=async(err,req,res,next)=>{
    err.message=err.message || "Something wrong";

    err.StatusCode=err.StatusCode || 500;
    
    
    res.status(err.StatusCode).json({
        success:false,
        message:err.message
    })
}
module.exports=Error