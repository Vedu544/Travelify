const checkToken = (req,res,next)=>{
    const { jwt:token } = req.cookies
    // console.log(token)
    if(!token){
        return res.status(401).json({message:"Token not provided"})
    }
    next()
}

export default checkToken
