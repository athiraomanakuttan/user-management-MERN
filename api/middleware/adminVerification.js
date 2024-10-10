import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv'
dotenv.config()

export const adminVerification = (req, res, next) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json("unautherized access")
        jwt.verify(token,process.env.ADIMI_JWT_SECRET,(err,user)=>{
    if(err) return res.status(403).json("Token is not valid")
    else
        next();
    })
};
