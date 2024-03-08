import Users from "../model/Users.js";
import {
  type UserWithOutIdStructure,
  type UserWithOutPasswordStructure,
} from "../types";
import { type UsersRepositoryStructure } from "./types";
import { userCredentialComprovation } from "../utils/usersFunction.js";

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
      !(await userCredentialComprovation(
        credentialName,
        credentialPassword,
        user.password,
      ))
    ) {
      throw new Error("Incorrect Password");
    }

    return { id: user._id, name: user.name };
  };

  userCheck = async (name: string): Promise<boolean> => {
    try {
      const user = await Users.findOne({ name }).lean();
      return !!user;
    } catch (error) {
      throw new Error("Error in checking User");
    }
  };
}

export default UsersRepository;
