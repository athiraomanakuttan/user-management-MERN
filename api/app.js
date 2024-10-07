import express from 'express';
import userRouter from './routes/userRouter.js'
import connectDB from './Configuration/dbConnection.js';
const app = express()
app.use(express.json())
app.use('/api/user',userRouter)


//error handling middleware

app.use((err,req,res,next)=>{
  const errorCode = err.status || 500
  const message = err.message || "internal server error";
  return res.status(errorCode).json({
    success: false,
    error: errorCode,
    message
  })
})


// port configuration
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB()
  });