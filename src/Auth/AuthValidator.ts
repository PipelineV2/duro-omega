import * as Joi from "joi"
import {validationMiddlewareFactory} from "../common/util"

const registerAuthSchema = Joi.object().keys({
  password: Joi.string().min(6).required().alphanum(),
  email: Joi.string().email().required()
})

export const registerValidation = validationMiddlewareFactory(registerAuthSchema)
