const router = require("express").Router();
const {employeeReport,managerReport} = require("../Controllers/EmployeeReportController");


router.get("/employee-report", employeeReport);
router.get("/manager-report", managerReport);


module.exports = router;