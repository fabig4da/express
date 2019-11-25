var mongoose = require("mongoose")

var personSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    position:{
        type: String,
       
    },
    task:{
        type:Array
    }
})

var Person = module.exports = mongoose.model("employee", personSchema)
module.exports.get =function (callback, limit){
    Person.find(callback).limit(limit)
}

