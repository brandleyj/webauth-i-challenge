const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const UserRouter = require("./users/users-router");
const RestrictedRouter = require("./restricted/restricted-router");
const knexConnection = require("./data/db-config");

const server = express();

const sessionConfiguration = {
  name: "booger",
  secret: process.env.COOKIE_SECRET || "is it secret? is it safe?",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: "user_sessions",
    sidfieldname: "id",
    createtable: true
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.get("/", (req, res) => {
  res.json({ api: "Webauth-i-challenge", session: req.session });
});

server.use("/api", UserRouter);
server.use("/api/restricted", RestrictedRouter);

module.exports = server;
