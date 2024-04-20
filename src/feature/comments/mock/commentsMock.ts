import gamesMock from "../../games/mock/gamesMock";
import { type CommentApiStructure, type CommentWithOutId } from "../types";

const idGameArcherMelo = gamesMock[0]._id;
const idGameJenga = gamesMock[1]._id;

export const newComment: CommentWithOutId = {
  _idUser: "adfawfawfawfwaf",
  userName: "afawfwafwafaw",
  _idGame: "r243khj3k213rklh",
  comment: "Hola todos soy yo, yo yo mismisimo yo",
  response: [],
};

export const commentsMock: CommentApiStructure[] = [
  {
    id: "awfij081ufj0892f",
    _idGame: idGameArcherMelo,
    _idUser: "1235131212gw3tqw3tgwfg3",
    comment: "hola me llamo matias",
    response: [],
    userName: "alfarium",
  },
  {
    id: "f12ouy1ho9if71y9f",
    _idGame: idGameArcherMelo,
    _idUser: "d1qoh2ud19io2fuh1",
    comment: "afajlwfjlajwfiawfj",
    response: [],
    userName: "decarium",
  },
  {
    id: "1lf1jjf9229dd912d9",
    _idGame: idGameArcherMelo,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando",
    response: [],
    userName: "corpo",
  },
  {
    id: "1lf1jjf9229dd912d9",
    _idGame: idGameArcherMelo,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando en games 1",
    response: [],
    userName: "mind_void",
  },
  {
    id: "1lf1jjf9229dd912d9",
    _idGame: idGameJenga,
    _idUser: "d;qkjd1209dj90d2912dj",
    comment: "algo estoy commentando en games 1",
    response: [],
    userName: "mind_void",
  },
];
