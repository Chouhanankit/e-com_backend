const session = require("express-session");

const googlescope =()=>{
    session({
        secret: "123456789akshay",
        resave: false,
        saveUninitialized: true,
      })
}
module.exports = googlescope;