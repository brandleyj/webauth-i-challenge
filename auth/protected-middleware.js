const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

module.exports = function protected(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ you: "cannot pass!" });
  }
  // const { username, password } = req.headers;

  // Users.findBy({ username })
  // 	.first()
  // 	.then(user => {
  // 		if (user && bcrypt.compareSync(password, user.password)) {
  // 			next();
  // 		} else {
  // 			res.status(401).json({ message: "You shall not pass!" });
  // 		}
  // 	})
  // 	.catch(err => {
  // 		res.status(500).json(err);
  // 	});
};
