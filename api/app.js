import express from 'express';
import userRouter from './routes/userRouter.js'
const app = express()
app.use(express.json())
app.use('/api/user',userRouter)
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });