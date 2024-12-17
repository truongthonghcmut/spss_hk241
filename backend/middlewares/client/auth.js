const md5 = require("md5");
const Account = require("../../model/Account")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret = process.env.JWT_SECRET

module.exports.requireAuth = async (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers['authorization'];
  const userAgent = req.headers['user-agent'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("5", req.headers)
  if (!token) {
    return res.status(401).json({
      "code": "error",
      "msg": "Token không được cung cấp"
    });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        "code": "error",
        "msg": "Token không hợp lệ"
      });
    } else {

      res.locals.account = decoded.accountToken;

      if(decoded.accountToken.role === "student"){
        next()
      }
      else {return res.status(403).json({
        "code": "error",
        "msg": "Token không hợp lệ do không đúng ROLE"
      });}
    }
  });
}
