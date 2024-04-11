import { Joi } from "express-validation";
import {
  type UserWithOnlyNameAndToken,
  type UserWithOutIdStructure,
} from "../types";

export const userValidator = {
  body: Joi.object<{ user: UserWithOutIdStructure }>().keys({
    user: Joi.object<UserWithOutIdStructure>().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
};

export const userCheckValidator = {
  body: Joi.object<{ user: UserWithOnlyNameAndToken }>().keys({
    user: Joi.object<UserWithOnlyNameAndToken>().keys({
      name: Joi.string().required(),
      token: Joi.string().required(),
    }),
  }),
};
