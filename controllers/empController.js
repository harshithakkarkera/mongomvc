const empModel =require("../model/empModel")
const ApiError = require("../utils/ApiError")
const empLogger =require('./../utils/logger')
const jwt = require('jsonwebtoken')
exports.addEmployee = async(req,res)=>{
   try {
    const newEmployee = await empModel.create(req.body)
    res.status(201)
    .json(
        {
            status :"Success",
            msg :"Employee added succesfully",
            employees: newEmployee
            
        }
    ) 
}  
    catch(err){
        //console.log("Employee failed to save",err)
        res.status(404)
    .json(
        {
            status :"Fail",
            msg :"Employee not added "
        })
    }
}
//token generation
exports.login = async (req, res) => {
    try {
        const empId = req.body._id;  // Get employee ID from the request body

        // Check if the employee exists
        const employee = await empModel.findById(empId); // Find employee by ID in your database
        if (!employee) {
            return res.status(404).json({
                status: "Fail",
                message: `Employee with ID ${empId} not found`
            });
        }

        // Generate JWT token
        const employeeData = { id: employee._id }; // Use employee's unique ID (usually _id in MongoDB)
        const accessToken = jwt.sign(employeeData, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Return the access token
        res.status(200).json({
            status: "Success",
            accessToken: accessToken
        });

    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: "Error generating access token",
            error: err.message
        });
    }
};
exports.getAllEmployees=async (req,res)=>{
    try{
    const employees= await empModel.find()
    res.status(200)
    .json(
        {
            status :"Success",
            results:employees.length,
            data:{employeesDetails: employees}
        }
    ) 
    }
    catch(err){
        res.status(404)
    .json(
        {
            status :"Fail",
            msg :"Employee not found "
        })
        //empLogger.employeeLogger.log
    }
}

exports.getEmployeeDetails = async (req, res) => {
    try {
        const empId = req.employee.id; 
        const employee = await empModel.findById(empId); 
        if (!employee) {
            return res.status(404).json({
                status: "Fail",
                message: `Employee with ID ${empId} not found`
            });
        }

        res.status(200).json({
            status: "Success",
            data: {
                employeeDetails: employee
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: "Error fetching employee details",
            error: err.message
        });
    }
};
exports.getEmployee=async (req,res,next)=>{
    try{
    const emp= await empModel.findById(req.params.id)
    if (!emp) {
        empLogger.log("error", `Employee with ID ${req.params.id} not found`);
        return res.status(404).json({
            status: "Fail",
            msg: `Employee with ID ${req.params.id} not found`
        });
    }
    empLogger.log("info",`Successfully fetched employee detail {req.params.id}`)
    res.status(200)
    .json(
        {
            status :"Success", 
            data:{employeesDetails: emp}
        }
    ) 
    }
    catch(err){
        empLogger.log("error",`Failed to fetch employee details ${req.params.id}`)
        next(new ApiError(500,`${req.params.id} is not found`))
    }

    
}
exports.updateEmployee=async (req,res)=>{
    try{
    const emp= await empModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators :true,
        includeResultMetadata: true
    })
    res.status(200)
    .json(
        {
            status :"Success",
            
            data:{newemployeeDetails: emp}
            
            
        }
    ) 
}
catch(err){
    res.status(404)
.json(
    {
        status :"Fail",
        msg :err.message,
        details: "Please check employee id"
    })
}
}

exports.deleteEmployee=async (req,res)=>{
    try{
    await empModel.findByIdAndDelete(req.params.id)
    res.status(200)
    .json(
        {
            status :"Success",
            
            data:null
            
            
        }
    ) 
}
catch(err){
    res.status(404)
.json(
    {
        status :"Failed to remove",
        msg :err.message,
        details: "Please check employee id"
    })
}
}
//view engines: eg ejs,handlebar etc
//used for server side rendering
exports.getAllEmployeeDetails=async (req,res)=>{
    const allemployees = await empModel.find()
    return res.render("employees", {
        allemployeesDetails: allemployees
    })
}

exports.addNewUser = async(req,res) =>{
    try{
        const newEmployee = await empModel.create({
            eid :req.body.eid *1,
            first_name:req.body.efn,
            last_name:req.body.eln,
            email :req.body.email
        })
        if(newEmployee != null)
            return res.render("login")
    }
    catch(err){
        console.log(err)
        return res.render("signup")
    }
}
exports.showSignup = (req,res) =>{
    
        return res.render("signup")
    
}
exports.showUpdate = async(req,res) =>{
    const empId = req.query.eid;
    const employee = await empModel.findById(empId);
    if (employee) {
        return res.render('update', { emp: employee }); 
      } else {
        return res.status(404).send('Employee not found');
      }
    

}
exports.removeUser=async(req,res,next)=>{
    try{
     
    const remove = await empModel.findByIdAndDelete(req.query.eid)
    const allEmployees = await empModel.find()
    return res.render("employees",{
       allemployeesDetails:allEmployees
     })
    }
    catch(err)
      {
        
        next(new ApiError(404,`${err} is not found. Failed to delete`))
      }
  
  }

  exports.updateUser=async(req,res,next)=>{
    try{
    const updatedUser = await empModel.findByIdAndUpdate(req.query.id,
        {
            first_name:req.body.efn,
            last_name:req.body.eln,
            email :req.body.email  
        },
        {
            new: true
        }
    )
    console.log(updatedUser)
    const allEmployees = await empModel.find()
    return res.render("employees",{
       allemployeesDetails:allEmployees
     })
}
    catch(err)
      {
        
        next(new ApiError(404,`${err} is not found. Failed to update`))
      }
  
  }