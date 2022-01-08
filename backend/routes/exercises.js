// ========== [///// DEPENDANCIES /////] ==========
// ----- locals -----
const Exercise = require('../models/Exercise');


// ========== [///// ROUTES /////] ==========
const exercises = [
    // ----- POST -----
    {
        method: 'POST',
        path: '/exercises',
        handler: (req, h) => {
            return Exercise.create(req.body);
        },
        options: {
            auth: false
        }
    },

    // ----- GET -----
    {
        method: 'GET',
        path: '/exercises/{id?}',
        handler: (req, h) => {
            if (!req.params.id) return Exercise.getAll(req.query.name);

            return Exercise.get(req.params.id);
        },
        options: {
            auth: false
        }
    },

    // ----- PATCH -----
    {
        method: 'PATCH',
        path: '/exercises/{id?}',
        handler: (req, h) => {
            return Exercise.update(req.params.id, data);
        },
        options: {
            auth: false
        }
    },

    // ----- DELETE -----
    {
        method: 'DELETE',
        path: '/exercises/{id?}',
        handler: (req, h) => {
            return Exercise.remove(req.params.id);
        },
        options: {
            auth: false
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    exercises
}