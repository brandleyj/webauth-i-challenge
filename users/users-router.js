const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./users-model");

const protected = require("../auth/protected-middleware");

const router = express();

router.get("/users", (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

router.post("/register", (req, res) => {
	const user = req.body;

	if (user.username && user.password) {
		const hash = bcrypt.hashSync(user.password, 14);

		user.password = hash;

		Users.add(user)
			.then(saved => {
				req.session.username = saved.username;
				const { id, username } = saved;
				res.status(201).json({ id, username });
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res
			.status(400)
			.json({ message: "Please provide registration information" });
	}
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		Users.findBy({ username })
			.first()
			.then(user => {
				const { id, username } = user;
				if (user && bcrypt.compareSync(password, user.password)) {
					req.session.username = user.username;
					res.status(200).json({
						message: `Welcome, ${user.username}! You're logged in!`,
						id,
						username
					});
				} else {
					res.status(401).json({ message: "You shall not pass!" });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res.status(400).json({ message: "Please provide credentials" });
	}
});

module.exports = router;
