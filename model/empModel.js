const mongoose = require('mongoose')
//create schema
const empSchema =new mongoose.Schema({
    eid:{
        type: String,
        required: [true, "Employee id is needed and it should be unique"],
        unique:true
    },
    first_name :{
        type:String,
        required : [true, "Employee must have first name"],
        default: 'John'
    },
    last_name :{
        type:String,
        required : [true, "Employee must have last name"],
        default: 'Doe'
    },
    email :{
        type:String,
        required : [true, "Employee should have email and it should be unique"],
        unique: true
    },
    car_model:{
        type: String,
        required: [false, "Car model should be specified"]
    }
})

//create the model
const empModel =mongoose.model("empmodels",empSchema)

module.exports= empModel