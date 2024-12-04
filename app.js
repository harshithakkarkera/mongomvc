const express = require('express')
const app = express();
const errorHandler = require('./controllers/errorController')
//use different names
const globalErrorHandler =require('./utils/ApiError')
//setting view engine
app.set("view engine","ejs")

//app.set("views",path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const empRouter = require('./routes/employeeRoutes')
const webRouter =require('./routes/empRoutes');
const ApiError = require('./utils/ApiError');
app.use('/api/v1/employees',empRouter)
app.use('/web/employees',webRouter)
app.use(errorHandler.errorMiddleware)

app.all("*",(req,res,next)=>{
    // res.status(404).json({
    //     status :"Failed",
    //     msg :`${req.originalUrl} is not found.Please check again`
    // })
    // const error = new Error(`${req.originalUrl} is not found`)
    // error.statusCode= 404
    // error.status ="Bad Request"
     //next(new ApiError(404,`${req.originalUrl} is not found`))
})


module.exports =app
