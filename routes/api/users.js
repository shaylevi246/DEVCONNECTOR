// everything that returns a promise must have "await" in front of them

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//for checking connection

// //@route    GET api/users
// //@description  Test route
// //@access   Public

// router.get("/", (req, res) => res.send("User route"));

// @route Post api/users
// @description Register user
// @public

router.post(
  "/",
  [
    body("name", "Name is Required").not().isEmpty(),
    body("email", "Please enter a valid Email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //See if user exists

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get user gravatar from email

      const avatar = gravatar.url(email, {
        s: "200", //size of the new avatar
        r: "pg", //rating over 18
        d: "mm", //default
      });

      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
      });

      //Encrypt password

      var salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken so the user can pass to login page

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
