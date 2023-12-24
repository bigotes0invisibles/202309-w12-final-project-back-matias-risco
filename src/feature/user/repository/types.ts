import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
} from "../types";

export interface UsersRepositoryStructure {
  userCreate: (
    userBase: UserWithOutIdStructure,
  ) => Promise<UserWithOutPasswordStructure>;

  userLogin: (
    userBase: UserWithOutIdStructure,
  ) => Promise<UserWithOutPasswordStructure>;
}
