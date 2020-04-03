const router = require("express").Router();
const tableController = require("../../controller/TableControllers");

router.route("/")
    .get(tableController.findAllEmployee)



router.route("/:id")
.delete(tableController.removeEmployeeById)



module.exports = router;