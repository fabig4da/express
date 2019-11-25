let bodyParser = require("body-parser")
let mongosee = require("mongoose")
let express = require("express")
let cors = require("cors")

let app = express()

var port = process.env.PORT || 3000

let routes = require("./routes")
app.use(bodyParser.urlencoded({
    extended: true 
}))
app.use(bodyParser.json())
app.use(cors());
app.use("/api", routes)


mongosee.connect("mongodb://localhost/company", {
     useNewUrlParser: true,
     useUnifiedTopology: true

})

var db = mongosee.connection

if(!db)
console.log("warning error")
else
console.log("Conection stablished")

app.get("/", (req, res)=>
    res.send("Welcome Customers!")
)

app.listen(port, function() {
    console.log("Server Initialized throught Port: "+port)
} )