const express = require("express");

router = express();

router.get("/something", (req, res) => {
	res.send("Hello World from /api/restricted/something!");
});

router.get("/other", (req, res) => {
	res.send("Hello World from /api/restricted/other!");
});

router.get("/a", (req, res) => {
	res.send("Hello World from /api/restricted/a!");
});

module.exports = router;
