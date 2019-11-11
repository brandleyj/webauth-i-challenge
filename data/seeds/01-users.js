const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{ username: "Justin", password: bcrypt.hashSync("pass", 1) },
				{ username: "John", password: bcrypt.hashSync("pass", 1) },
				{ username: "Janell", password: bcrypt.hashSync("pass", 1) },
				{ username: "Melanie", password: bcrypt.hashSync("pass", 1) }
			]);
		});
};
