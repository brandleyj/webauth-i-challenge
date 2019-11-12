const express = require("express");

const protected = require("../auth/protected-middleware");

router = express();

router.get("/something", protected, (req, res) => {
  res.send("Hello World from /api/restricted/something!");
});

router.get("/other", protected, (req, res) => {
  res.send("Hello World from /api/restricted/other!");
});

router.get("/a", protected, (req, res) => {
  res.send("Hello World from /api/restricted/a!");
});

module.exports = router;
