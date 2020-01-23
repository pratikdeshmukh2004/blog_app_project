module.exports = (app, knex, jwt) => {
  var fileupload = require("express-fileupload");
  (aws = require("aws-sdk")),
    app.use(fileupload({ safeFileNames: true, preserveExtension: true }));
  aws.config = {
    region: "ap-south-1",
    accessKeyId: "AKIA4OEZSPYREXHMG35U",
    secretAccessKey: "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"
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
  app.get("/blogs",(req,res)=>{
    knex.select('*').from("blogs")
    .then((data)=>{
      res.send(data)
  })
})
}
