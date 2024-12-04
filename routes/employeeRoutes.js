const express = require('express')
const employeeCont = require("../controllers/empController")
const authMiddleware =require("../middleware/authentication")
const router = express.Router()


router.route("/").post(employeeCont.addEmployee).get(employeeCont.getAllEmployees)
router.route("/getemp").get(authMiddleware.authenticateToken,employeeCont.getEmployeeDetails)
router.route("/login").post(employeeCont.login)
router.route("/:id").get(employeeCont.getEmployee).put(employeeCont.updateEmployee).delete(employeeCont.deleteEmployee)
module.exports= router