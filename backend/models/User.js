// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const _ = require('lodash');

// ----- locals -----
const users = require('../fake_db/users.json');
const { BCRYPT_WORK_FACTOR } = require('../config');
let curId = _.size(users);


// ========== [///// CLASS /////] ==========
class User {
    // ----- CREATE -----
    static async create(user) {
        user.id = curId++;
        user.isActive = false;

        const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
        user.password = hashedPassword;

        users[user.id] = user;
        return user;
    }

    // ----- GET all -----
    static async getAll() {
        let usersArr = _.toArray(users);
        usersArr.forEach(user => { delete user.password });
        return usersArr;
    }

    // ----- GET by id -----
    static async get(id) {
        let user = users[id];
        if (!user) return Boom.notFound("user not found");
        delete user.password;
        return users[id];
    }

    // ----- UPDATE by id -----
    static async update(user, id) {
        if (user.id != id) return Boom.badRequest('user ID does not match body');
        if (!users[user.id]) return Boom.notFound("user not found");

        for (let item in user) {
            users[user.id][item] = user[item];
        }
        return users[user.id];
    }

    // ----- DELETE by id -----
    static async remove(id) {
        if (!users[id]) Boom.notFound("user not found");
        delete users[id];
        return "user deleted";
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = User;