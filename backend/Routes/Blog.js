module.exports = (app, knex, jwt) => {
  var fileupload = require("express-fileupload");
  (aws = require("aws-sdk")),
    app.use(fileupload({ safeFileNames: true, preserveExtension: true }));
  aws.config = {
    region: "Your Region",
    accessKeyId: "Your accessId",
    secretAccessKey: "Your secretId"
  };
  var s3 = new aws.S3();

  app.post("/new", (req, res) => {
    if (req.files) {
      var params = {
        Bucket: "acpkaplu",
        Key: "Auroville/" + req.files.image.name,
        Body: req.files.image.data,
        ACL: "public-read"
      };
      console.log("file uploading");

      s3.putObject(params, (err, data) => {
        var image =
          "https://acpkaplu.s3.ap-south-1.amazonaws.com/Auroville/" +
          req.files.image.name;

        knex("blogs")
          .insert({
            user_id: req.body.user,
            image: image,
            blog: req.body.blog,
            date: new Date(),
            title: req.body.title
          })
          .then(id => {
            res.redirect("http://localhost:3000");
          });
      });
    } else {
      knex("blogs")
        .insert({
          user_id: req.body.user,
          image: undefined,
          blog: req.body.blog,
          date: new Date(),
          title: req.body.title
        })
        .then(id => {
          res.redirect("http://localhost:3000");
        });
    }
  });
  app.get("/blogs", (req, res) => {
    knex
      .select("*")
      .from("blogs")
      .then(data => {
        res.send(data);
      });
  });
  app.get("/blogs/:id",(req,res)=>{
    knex.select("*").from("blogs").where("id",req.params.id)
    .then((data)=>{
      if (data.length>0){
        res.send({result:true,data:data})
      }else{
        res.send({result:false})
      }
      
    })
  })
  app.post("/getuser",(req,res)=>{
    knex.select("*").from("users").where("id",req.body.userid)
    .then((data)=>{
      if (data.length>0){
        res.send({result:true,user:data})
      }else{
        res.send({result:false})
      }
      
    })
  })
  app.get("/getblog/:id",(req,res)=>{
    knex.select("*").from("blogs").where("user_id",req.params.id)
    .then((resp)=>{
      res.send(resp)
    })
  })
  app.delete("/delete/:id",(req,res)=>{
    knex.select("*").from("blogs").where("id",req.params.id).del()
    .then(()=>{
      res.send("done")
    })
  })
};
