const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET ='Harryisagoodb$oy';

//create a user Using :"POST" "/api/auth/createuser" doesnt require auth no login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must >5 characters').isLength({ min: 5 })
], async (req, res) => {
  //if there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether user with this email exists already
  try {

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password,salt);

    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    

    //res.json(user);
    res.json({authtoken});
    //catch errors
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error occured");
  }
})

module.exports = router