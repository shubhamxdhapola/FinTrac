import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import uploadRoute from './routes/upload.route.js'
import authRoutes from './routes/auth.routes.js'
import incomeRoutes from './routes/income.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))

app.use('/api/upload', uploadRoute)
app.use('/api/auth', authRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/expense', expenseRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port : ${PORT}`)
})

