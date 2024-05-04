import gamesMock from "../../games/mock/gamesMock";
import { type CommentDatabaseStructure, type CommentWithOutId } from "../types";

export const { _id: idGameArcherMelo, name: nameGameArcherMelo } = gamesMock[0];
export const { _id: idGameJenga, name: nameGameJenga } = gamesMock[1];

export const newComment: CommentWithOutId = {
  idUser: "adfawfawfawfwaf",
  userName: "afawfwafwafaw",
  idGame: "r243khj3k213rklh",
  comment: "Hola todos soy yo, yo yo mismisimo yo",
  response: [],
};

export const commentsMock: CommentDatabaseStructure[] = [
  {
    _id: "awfij081ufj0892f",
    _idGame: idGameArcherMelo,
    _idUser: "1235131212gw3tqw3tgwfg3",
    comment: "hola me llamo matias",
    response: [],
    userName: "alfarium",
  },
  {
    _id: "f12ouy1ho9if71y9f",
    _idGame: idGameArcherMelo,
    _idUser: "d1qoh2ud19io2fuh1",
    comment: "afajlwfjlajwfiawfj",
    response: [],
    userName: "decarium",
  },
  {
    _id: "1lf1jjf9229dd912d9",
    _idGame: idGameArcherMelo,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando",
    response: [],
    userName: "corpo",
  },
  {
    _id: "1lf1jjf9229dd912d9",
    _idGame: idGameArcherMelo,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando en games 1",
    response: [],
    userName: "mind_void",
  },
  {
    _id: "1lf1jjf9229dd912d9",
    _idGame: idGameJenga,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando en games 1",
    response: [],
    userName: "mind_void",
  },
];
