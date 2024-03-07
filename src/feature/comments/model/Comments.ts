import mongoose from "mongoose";
import { type CommentDatabaseStructure } from "../types";

const CommentShema = new mongoose.Schema<CommentDatabaseStructure>(
  {
    _idGame: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Comments = mongoose.model("Comments", CommentShema, "Comments");

export default Comments;
