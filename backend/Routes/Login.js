module.exports = (login, knex, jwt) => {
  login.post("/login", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where("email", req.body.email)
      .then(data => {
        if (data.length > 0) {
          if (data[0].password == req.body.password) {
            let token = jwt.sign(
              { id: data[0].id},"lala"
            );
            res.send({result:true,token:token})
          } else {
            res.send({result:"pass"})
          }
        } else {
          res.send({result:false})
        }
      })
      .catch(err => {
        console.log(err);

        res.send([{ Database: "Error In database..." }]);
      });
  });

  login.get("/logout", (req, res) => {
    res.clearCookie("accesscontrolar");
    res.redirect("/login");
  });
};
