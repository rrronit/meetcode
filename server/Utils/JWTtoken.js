

const sendToken=async(user,StatusCode,res,req)=>{
    const token=await user.getJWTtoken();
   
    const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true
    }
   
  
    res.status(StatusCode).cookie("token",token,options,).json({
        success:true,
        user,
        token
    })
}
module.exports=sendToken
