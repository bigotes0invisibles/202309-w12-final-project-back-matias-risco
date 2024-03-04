import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
  type UserWithOnlyName,
} from "../types";

export interface UsersRepositoryStructure {
  userCreate: (
    userBase: UserWithOutIdStructure,
  ) => Promise<UserWithOutPasswordStructure>;

  userLogin: (
    userBase: UserWithOutIdStructure,
  ) => Promise<UserWithOutPasswordStructure>;

  userCheck: (userName: UserWithOnlyName) => Promise<boolean>;
}
