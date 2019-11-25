let router = require("express").Router()
router.get("/", (req, res)=>
    res.json({
        status: "ok",
        code: 200,
        message: "Let´s Go"
    })
)

var empleadoController = require("./controllers/employeesController")

router.route("/employees")
    .get(empleadoController.index)
    .post(empleadoController.new)

router.route("/employee/:id")
      .get(empleadoController.view)
      .put(empleadoController.newTarea)
      .delete(empleadoController.delete)

router.route("/task/:id")
      .delete(empleadoController.deleteTarea)

module.exports = router