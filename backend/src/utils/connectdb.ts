import mongoose, { ConnectOptions } from "mongoose";

const url = process.env.MONGO_DB_CONNECTION_STRING;

const options: ConnectOptions = {
  user: process.env.MONGO_DB_USER,
  pass: process.env.MONGO_DB_PASSWORD,
};

const connect = mongoose.connect(url!, options);

connect
  .then(() => {
    console.log("Connected correctly to DB");
  })
  .catch((err) => {
    console.log(err);
  });
