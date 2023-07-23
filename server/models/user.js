const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	district: { type: String, },
	email: { type: String, required: true },
	phone:{ type: String, required: true },
	password: { type: String, },
	verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		district: Joi.string().required().label("District"),
		phone: Joi.string().required().label("Phone"),
		email: Joi.string().email().required().label("Email"),
		password: Joi.string(),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
