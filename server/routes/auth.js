const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Simplified login: comparing plain text password directly (Not recommended for production)
    if (req.body.password !== user.password) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    if (!user.verified) {
      // Skip token generation and verification for simplicity
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    // Login successful
    res.status(200).send({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
