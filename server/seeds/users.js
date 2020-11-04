const faker = require("faker");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function seedUsers(count) {
	return new Promise((res, rej) => {
		(async () => {
			await User.deleteMany();

			let done = 0;
			for (let i = 0; i < count; i++) {
				const user = await new User({
					username: faker.internet.userName(),
					email: faker.internet.email(),
					password: bcrypt.hashSync("password", 10),
					role: Math.random() < 0.2 ? 2 : Math.random() < 0.3 ? 1 : 0,
				}).save();
				done += Number(!!user);
			}
			done === count ? res(done) : rej(done);
		})();
	});
};
