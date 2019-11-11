const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
	return knex("users")
		.truncate()
		.then(function() {
			return knex("users").insert([
				{ username: "Justin", password: bcrypt.hashSync("pass", 1) },
				{ username: "John", password: bcrypt.hashSync("pass", 1) },
				{ username: "Janell", password: bcrypt.hashSync("pass", 1) },
				{ username: "Melanie", password: bcrypt.hashSync("pass", 1) }
			]);
		});
};
