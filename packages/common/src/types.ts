import Joi from "joi";

const authValidation = {
  register: {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.empty": "email is requried",
        "any.required": "email is requried",
        "string.email": "email must be valid email"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must contain atleast 8 characters long",
        "string.max": "Password mustnot exceed 50 characters long"
      }),
      name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
        "string.min": "Name must contain atleast 3 characters long",
        "string.max": "Name mustnot exceed 50 characters long"
      })
    })
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.empty": "Username is requried",
        "any.required": "Username is requried",
        "string.email": "Username must be valid email"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must contain atleast 8 characters long",
        "string.max": "Password mustnot exceed 50 characters long"
      }),
      photo: Joi.string().uri().optional().messages({
        "string.uri": "Photo must be a valid URL"
      })
    })
  }
};
const roomValidations = {
  createRoom: {
    body: Joi.object().keys({
      slug: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Room name is required",
        "any.required": "Room name is required",
        "string.min": "Room name must contain atleast 3 characters long",
        "string.max": "Room name must not exceed 50 characters long"
      }),
      adminId: Joi.number().required().messages({
        "number.base": "Admin ID must be a number",
        "any.required": "Admin ID is required"
      })
    })
  }
};

export { authValidation, roomValidations };
