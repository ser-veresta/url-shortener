import mongoose from "mongoose";
import crypto from "crypto";
import { format } from "date-fns";

const urlSchema = mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  createdBy: {
    type: String,
    unique: false,
  },
  date: {
    type: String,
    default: format(new Date(), "dd MM Y"),
  },
  count: {
    type: Number,
    default: 0,
  },
});

urlSchema.pre("save", async function (next) {
  if (this.isModified("count")) return next();

  const code = crypto.randomBytes(5).toString("hex");
  this.urlCode = code;
  this.shortUrl = `https://url-shortener-02.herokuapp.com/${code}`;

  next();
});

export const Urls = mongoose.model("url", urlSchema);
