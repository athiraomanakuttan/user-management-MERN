import jwt from 'jsonwebtoken'

export const userVerification = (req,res,next)=>{
    console.log(req.cookies)
    const token = req.cookies.token
    if(!token) return res.status(401).json("unautherized access")
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return res.status(403).json("Token is not valid")

        req.user = user;
        next();
    })
}