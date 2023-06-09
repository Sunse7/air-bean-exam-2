const nedb = require("nedb-promise");
usersDb = new nedb({ filename: "./databases/users.db", autoload: true });

async function getAllUsers() {
    return await usersDb.find({});
}

async function createUser(user) {
    return await usersDb.insert(user);
}

async function findUserById(userId) {
    return await usersDb.findOne({ userId });
}

async function findUserByUsername(username) {
    return await usersDb.findOne({ username: username });
}

module.exports = { getAllUsers, createUser, findUserById, findUserByUsername };
