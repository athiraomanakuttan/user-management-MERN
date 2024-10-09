import jwt from 'jsonwebtoken';

export const adminVerification = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json("Access denied. No token provided.");
  }

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid token."); 
    }
    req.user = user; 
    next(); 
  });
};
