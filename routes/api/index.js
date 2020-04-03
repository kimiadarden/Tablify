const router = require("express").Router();
const tableRoutes = require("./table");
const menuRoutes = require("./menu")
const tablehistoryRoutes = require("./tablehistory")
const employeeRoutes = require("./employee")

router.use("/table", tableRoutes);
router.use("/employee", employeeRoutes);
router.use("/menu", menuRoutes)
router.use("/tablehistory", tablehistoryRoutes)

module.exports = router;
