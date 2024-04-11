import { type UserStructure, type UserWithOutIdStructure } from "../types";

export const newUser: UserWithOutIdStructure = {
  name: "Pepito",
  password: "whassap",
};

export const mockUsers: UserStructure[] = [
  {
    name: "alfredo",
    password: "whassap",
    id: "6618208d2bf16a105be00089",
  },
  {
    name: "sopapilla",
    password: "copenco",
    id: "123456782bf16a105be9c989",
  },
];
