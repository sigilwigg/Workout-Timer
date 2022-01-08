// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const boom = require('@hapi/boom');


// ========== [///// ROUTES /////] ==========
const root = [
    // ----- root -----
    {
        method: 'GET',
        path: '/{any*}',
        handler: (req, h) => {
            throw boom.badRequest();
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    root
}