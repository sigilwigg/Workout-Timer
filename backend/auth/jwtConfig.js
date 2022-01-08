// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const bcrypt = require('bcrypt');

// ----- locals -----
const users = require('../fake_db/users.json');
const { SECRET_KEY } = require('../config');


// ========== [///// JWT /////] ==========
const jwtConfig = {
    secretOrPrivateKey: SECRET_KEY,
    sign: {},
    decode: {},
    verify: {},
    // getToken is currently default: looking at "bearer" token
    validate: (request, payload, h) => {
        const user = users[payload.id];
        if (!user) {
            return { credentials: null, isValid: false };
        }

        return {
            isValid: user.isActive,
            credentials: { id: user.id, name: user.name }
        };
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = {
    jwtConfig,
}