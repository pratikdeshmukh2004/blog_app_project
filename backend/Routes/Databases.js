module.exports = (knex)=>{
    const mysql = require("mysql")
    var con = mysql.createConnection({  
        host: "localhost" ,  
        user: "root",  
        password : "pratik"
    })    


    // to create database if not exists
    con.connect((err)=>{
        if (err){console.log(err)}
        else{ 
            con.query(`create database if not exists ${"Blogapp"}`,(err)=>{
                if (!err){console.log("database created")}
                else{console.log(err)}
            })
        }
    })
    knex.schema.hasTable('users').then((exist)=>{
        if (exist){
            console.log("table already exists")
        }else{
            knex.schema.createTable("users",(u)=>{
                u.increments("id").primary();
                u.string("name").notNullable();
                u.string("email").notNullable();
                u.string("password").notNullable();
            })
            .then(()=>{console.log("table created")})
            .catch((err)=>{
                console.log(err)
            })
        }
    })

    knex.schema.hasTable('blogs').then((exist)=>{
        if (exist){
            console.log("table already exists")
        }else{
            knex.schema.createTable("blogs",(u)=>{
                u.increments("id").primary();
                u.integer("user_id").notNullable();
                u.string("image");
                u.string("blog",10000).notNullable();
                u.datetime("date").notNullable();
                u.string("title").notNullable();
            })
            .then(()=>{console.log("table created")})
            .catch((err)=>{
                console.log(err)
            })
        }
    })    
    // knex.schema.hasTable('Company').then((exist)=>{
    //     if (exist){
    //         console.log("table already exists")
    //     }else{
    //         knex.schema.createTable("Company",(u)=>{
    //             u.increments("id").primary();
    //             u.string("company_name").notNullable();
    //         })
    //         .then(()=>{console.log("table created")})
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     }
    // })    
}