import * as Joi from "joi"
import {validationMiddlewareFactory} from "../common/util"

//registration validation
const registerAuthSchema = Joi.object().keys({
  name: Joi.string().min(4).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
})

//Login Validation
const loginValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

//Reset Password
const resetPasswordSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

export const registerValidation = validationMiddlewareFactory(registerAuthSchema)
export const loginValidation = validationMiddlewareFactory(loginValidationSchema)
export const resetPasswordValidation = validationMiddlewareFactory(resetPasswordSchema)
