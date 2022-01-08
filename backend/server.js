'use strict';

// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const hapi = require('@hapi/hapi');

// ----- locals -----
const { serverConfig, plugins } = require('./config');
const { jwtConfig } = require('./auth/jwtConfig');
const { root } = require('./routes/_root');
const { auth } = require('./routes/auth');
const { users } = require('./routes/users');
const { exercises } = require('./routes/exercises');
const { userWorkouts } = require('./routes/userWorkouts');
const { userTimes } = require('./routes/userTimes');


const init = async () => {
    // ========== [///// CONFIG /////] ==========
    // ----- server config -----
    const server = hapi.server(serverConfig);
    // ----- plugins -----
    await server.register(plugins);
    // ----- authentications -----
    server.auth.strategy('jwt', 'hapi-jsonwebtoken', jwtConfig);
    server.auth.default('jwt');


    // ========== [///// ROUTES /////] ==========
    server.route([
        ...root,
        ...auth,
        ...users,
        ...exercises,
        ...userWorkouts,
        ...userTimes
    ]);


    // ========== [///// START SERVER /////] ==========
    await server.start();
    console.log(`Server listening on ${server.info.uri}`);
}


// ========== [///// GERNERAL ERROR HANDLING /////] ==========
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


// ========== [///// INITIALIZE! /////] ==========
init();