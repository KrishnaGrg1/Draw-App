import Joi from "joi";

const authValidation = {
  register: {
    body: Joi.object().keys({
      username: Joi.string().email().required().messages({
        "string.empty": "Username is requried",
        "any.required": "Username is requried",
        "string.email": "Username must be valid email"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must contain atleast 8 characters long",
        "string.max": "Password mustnot exceed 50 characters long"
      })
    })
  },
  login: {
    body: Joi.object().keys({
      username: Joi.string().email().required().messages({
        "string.empty": "Username is requried",
        "any.required": "Username is requried",
        "string.email": "Username must be valid email"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must contain atleast 8 characters long",
        "string.max": "Password mustnot exceed 50 characters long"
      })
    })
  }
};

export default authValidation