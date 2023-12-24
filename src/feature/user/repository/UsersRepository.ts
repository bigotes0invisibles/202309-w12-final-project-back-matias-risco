import bcrypt from "bcrypt";
import Users from "../model/Users.js";
import {
  type UserWithOutIdStructure,
  type UserWithOutPasswordStructure,
} from "../types";
import { type UsersRepositoryStructure } from "./types";

class UsersRepository implements UsersRepositoryStructure {
  userCreate = async (
    userBase: UserWithOutIdStructure,
  ): Promise<UserWithOutPasswordStructure> => {
    const { _id, name } = (await Users.create(userBase)).toJSON();

    return { name, id: _id };
  };

  userLogin = async ({
    name: credentialName,
    password: credentialPassword,
  }: UserWithOutIdStructure): Promise<UserWithOutPasswordStructure> => {
    const user = await Users.findOne({ name: credentialName }).lean();

    if (!user) {
      throw new Error("User Not Found");
    }

    if (
      !(await bcrypt.compare(
        credentialName + process.env.SALT + credentialPassword,
        user.password,
      ))
    ) {
      throw new Error("Incorrect Password!");
    }

    return { id: user._id, name: user.name };
  };
}

export default UsersRepository;
