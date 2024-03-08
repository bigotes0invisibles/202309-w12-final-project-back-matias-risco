import cors from "cors";
import morgan from "morgan";
import pingRouter from "../feature/ping/router/pingRouter.js";
import app from "./app.js";
import { corsOptions } from "./utils/corsOptions.js";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errorMiddleware.js";
import gamesRouter from "../feature/games/router/gamesRouter.js";
import userRouter from "../feature/user/router/userRouter.js";
import commentsRouter from "../feature/comments/router/commentsRouter.js";

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.get("/", pingRouter);
app.use("/games", gamesRouter);
app.use("/users", userRouter);
app.use("/comments", commentsRouter);

app.use(endpointNotFound);
app.use(generalError);
