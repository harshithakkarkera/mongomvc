const app= require('./app')
const dotenv = require('dotenv')
const mongoose= require('mongoose')

dotenv.config({path :"./config.env"})



const port = process.env.PORT || 3000

//connect
mongoose.connect(
    process.env.db_local_url
).then(con=>{
    console.log('Connection is successful')
    // console.log(con.connection)
}).catch((err)=>{
    console.log('Connection not done',err);
})
app.listen(port,'0.0.0.0',()=>{
    console.log(`Express app is running in ${port}`)
})
