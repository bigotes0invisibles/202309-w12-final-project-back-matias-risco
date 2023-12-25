import { type UserWithOutIdStructure, type UserStructure } from "../types";
import bcrypt from "bcrypt";

export const userToWithOutId = ({
  id,
  ...userBase
}: UserStructure): UserWithOutIdStructure => ({ ...userBase });

export const usersToWithOutId = (users: UserStructure[]) =>
  users.map((user) => userToWithOutId(user));

export const userHashPassword = async ({
  name,
  password,
  ...userBase
}: UserStructure | UserWithOutIdStructure): Promise<
  UserWithOutIdStructure | UserStructure
> => {
  const hashedPasword = await bcrypt.hash(
    name + process.env.SALT + password,
    11,
  );

  return { name, password: hashedPasword, ...userBase };
};

export const usersHashPassword = async (
  users: UserStructure[] | UserWithOutIdStructure[],
) => Promise.all(users.map(async (user) => userHashPassword(user)));

export const userCredentialComprovation = async (
  credentialName: string,
  credentialPassword: string,
  password: string,
) =>
  bcrypt.compare(
    credentialName + process.env.SALT + credentialPassword,
    password,
  );
