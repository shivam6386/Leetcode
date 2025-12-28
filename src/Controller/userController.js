
const bcrypt=require('bcrypt');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

const User=require('../model/user.js')

const registerValidation = require("../utils/validate.js")

const register= async (req,res)=>{

 
 // User Validation
try {
  registerValidation(req.body);

  const {firstName,email,password}=req.body
 
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("Email already registered");

  req.body.password = await bcrypt.hash(password, 10);

 
/*** 
req.body.password=bcrypt.hash(password,10);
Mistake :--
If we will not use await than Mongoose will store a Promise instead of a string, which will break our code.
Explanation :--
bcrypt.hash(password, 10) is asynchronous and returns a Promise, not the hashed string directly. So we do:
  req.body.password=bcrypt.hash(password,10);
  req.body.password becomes a Promise object, not the actual hashed password.
Then, when we try to User.create(req.body), Mongoose will store a Promise instead of a string, which will break your code.
 
 ****/

// Check if user already exists


  const user = await User.create(req.body);

  const token = jwt.sign({_id:user._id,email:email }, process.env.JWT_KEY, {expiresIn:60 * 60});
  res.cookie('token',token,{maxAge:60*60*1000});
  res.status(201).send("user Registered");

    
} catch (error) {
    res.status(400).send("Error : "+error.message);
    
}
  

}



module.exports={register}