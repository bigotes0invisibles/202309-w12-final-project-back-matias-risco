export interface UserDatabaseStructure {
  _id: string;
  name: string;
  password: string;
}

export type UserWithOutIdStructure = Omit<UserDatabaseStructure, "_id">;

export interface UserStructure extends UserWithOutIdStructure {
  id: string;
}

export type UserWithOutPasswordStructure = Omit<UserStructure, "password">;

export type UserWithOnlyName = Pick<UserDatabaseStructure, "name">;
