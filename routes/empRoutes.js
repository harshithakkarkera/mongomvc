const express = require('express')
const employeeCont = require("../controllers/empController")
const router = express.Router()

router.route("/").get(employeeCont.getAllEmployeeDetails)
router.route("/signup")
.get(employeeCont.showSignup)
.post(employeeCont.addNewUser)



router.route("/delete")
.get(employeeCont.removeUser)

router.route("/update")
.get(employeeCont.showUpdate).post(employeeCont.updateUser)

module.exports= router