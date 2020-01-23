const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")
app.use(bodyparser())
app.use(cors())
const knex = require("knex")({
    client : "mysql",
    connection:{
        host : "localhost",
        user : "root",
        password : "pratik",
        database : "Blogapp"
    }
})


require("./Routes/Databases")(knex)

app.use(superadmin = express.Router())
require('./Routes/Signup')(superadmin,knex,jwt)

app.use(login = express.Router())
require('./Routes/Login')(login,knex,jwt)

app.post("/verify",(req,res)=>{
    jwt.verify(req.body.token,"lala",(err,data)=>{
        res.send(data)
    })
})

app.use(blog = express.Router())
require('./Routes/Blog')(blog,knex,jwt)

app.listen(8090,()=>{
    console.log(`server is listning on port 8090`)
})