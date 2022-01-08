// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// ----- locals -----
const users = require('../fake_db/users.json');


// ========== [///// CLASS /////] ==========
class Auth {
    // ----- login -----
    static async login(username, password) {
        let user
        for (let key in users) {
            if (users[key].username === username) {
                user = users[key];
                break
            }
        }

        if (!user) throw Boom.notFound(`not found: ${username}`);

        if (user.isActive) return user;

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword === true) {
            users[user.id].isActive = true;
            return user;
        }

        throw Boom.unauthorized("invalid password");
    }

    // ----- logout -----
    static async logout(id) {
        if (!users[id]) throw Boom.notFound();

        users[id].isActive = false;
    }
}



// ========== [///// EXPORTS /////] ==========
module.exports = Auth;