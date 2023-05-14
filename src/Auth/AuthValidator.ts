import * as Joi from "joi"
import {validationMiddlewareFactory} from "../common/util"

const registerAuthSchema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required()
})

export const registerValidation = validationMiddlewareFactory(registerAuthSchema)
