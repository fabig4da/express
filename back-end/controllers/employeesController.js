Empleado = require("../models/employeesModel")

exports.index =function (req, res){
    Empleado.get(function(err, employee){
        if(err) {
            res.json({
              status: "Warning error",
              code: 500,
              message: err  
            })
        }
        res.json({
            status: "get succes",
            code: 200,
            message: "records consulted",
            data: employee 
        })
    })
}

exports.new = function (req, res) {
    let {position, name}= req.body
    var empleado = new Empleado({
        position, name
    })
    
    console.log(empleado)
    empleado.save(function(err){
        if(err)
        res.json({
            status: " Warning error",
            code: 500,
            message: err  
         })
         res.json({
            status: "Save successful",
            code: 200,
            message: "Data saved",
            data: empleado
         })
    })
}

exports.view = function(req, res){
    Empleado.findById(req.params.id, function(err, empleado){
        console.log(req.params.id)
        if(err)
        res.json({
            status: "Warning error",
            code: 500,
            message: err  
         })
         res.json({
            status: "successfully",
            code: 200,
            message: "Data Find",
            data: empleado
         })

    })
}



exports.newTarea= function(req, res){
    Empleado.findById(req.params.id, function(err, empleado){
        if(err)
            res.json({
                status: "Warning error",
                code: 500,
                message: err  
            })
        empleado.task.push(req.body.task)
        empleado.save(function(err){
            if(err)
            res.json({
                status: "Warning error",
                code: 500,
                message: err  
            })
            res.json({
                status: "successful",
                code: 200,
                message: "task saved",
                data: empleado
            })
        })
        
    })
}

exports.delete = function(req, res){
    console.log(req.params.id)
    try{
        Empleado.deleteOne({
            _id: req.params.id
        }, function(err){
            if(err)
            res.json({
                status: "Warning error",
                code: 500,
                message: err  
            })
            res.json({
                status: "succesful",
                code: 200,
                message: "Delete Employee",
                data: Empleado
            })
        })
    }catch(err){
        console.log(err)
    }

}    

exports.deleteTarea= function(req, res){
    Empleado.findById(req.params.id, function(err, empleado){
        if(err)
            res.json({
                status: "Warning error",
                code: 500,
                message: err  
            })
        console.log(empleado)
        let index = empleado.task.indexOf(req.body.task)
        console.log(index)
        empleado.task.splice(index, 1)
        empleado.save(function(err){
            if(err)
            res.json({
                status: "Warning error",
                code: 500,
                message: err  
            })
            res.json({
                status: "successful",
                code: 200,
                message: "Task deleted",
                data: empleado
            })
        })
        
    })
}