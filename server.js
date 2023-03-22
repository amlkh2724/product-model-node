import colors from 'colors'
import express from 'express'
import morgan from 'morgan'
import dotenv from "dotenv"
import buildProduct from './routes/buildyourproduct.js'
import connectDB from './config/db.js'


dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()
app.use(express.json())


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}


app.get('/', (req, res) => {
    res.send("you need to build your product!")
})



app.use("/api/v1/createproduct", buildProduct)


const PORT = process.env.PORT || 5000
console.log("the port is:", PORT);



const server = app.listen(PORT, console.log(`the server is running on port ${PORT}`.yellow.bold))





// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});













// mongo db-username=admin1 password=HSrmuqDjADiJ6EN8
// mongouel=mongodb+srv://admin1:HSrmuqDjADiJ6EN8@cluster0.qsbcbug.mongodb.net/?retryWrites=true&w=majority