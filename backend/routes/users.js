// ========== [///// DEPENDANCIES /////] ==========
// ----- locals -----
const User = require('../models/User');


// ========== [///// ROUTES /////] ==========
const users = [
    // ----- POST -----
    {
        method: 'POST',
        path: '/users',
        handler: (req, h) => {
            return User.create(req.body);
        }
    },

    // ----- GET -----
    {
        method: 'GET',
        path: '/users/{id?}',
        handler: (req, h) => {
            if (!req.params.id) return User.getAll();

            return User.get(req.params.id);
        }
    },

    // ----- PATCH -----
    {
        method: 'PATCH',
        path: '/users/{id?}',
        handler: (req, h) => {
            return User.update(req.params.id, data);
        }
    },

    // ----- DELETE -----
    {
        method: 'DELETE',
        path: '/users/{id?}',
        handler: (req, h) => {
            return User.remove(req.params.id);
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    users
}