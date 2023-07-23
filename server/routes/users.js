const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
	  const { error } = validate(req.body);
	  if (error)
		return res.status(400).send({ message: error.details[0].message });
  
	  let user = await User.findOne({ email: req.body.email });
	  if (user)
		return res
		  .status(409)
		  .send({ message: "User with given email already exists!" });
  
	  user = await new User(req.body).save();
  
	  const token = await new Token({
		userId: user._id,
		token: crypto.randomBytes(32).toString("hex"),
	  }).save();
	  
	  const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
	  
	  // Sending an email with the verification link and password (in this example)
	  const emailBody = `Click the following link to verify your email: ${url}\n\nYour randomly generated password is: ${req.body.password}`;
	  await sendEmail(user.email, "Verify Email and Password", emailBody);
  
	  res
		.status(201)
		.send({ message: "" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
