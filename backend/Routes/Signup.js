module.exports = (superadmin, knex, jwt) => {
  superadmin.post("/register", (req, res) => {
      console.log(req.body);
      
    knex("users")
      .select("*").where("email",req.body.email)
      .then(data => {
        if (data.length === 0) {
          knex("users")
            .insert({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            })
            .then(id => {
              res.send({ result: true });
            })
            .catch(err => {
               console.log(err);
               
            });
        } else {
            res.send({result:false})
        }
      })
      .catch(err => {
        res.send(err);
      });
  });
};
