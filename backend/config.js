// ========== [///// DEPENDECIES /////] ==========
// ----- libraries -----
const HapiJWT = require('hapi-jsonwebtoken');


// ========== [///// CONFIG /////] ==========
// ----- server -----
const serverConfig = {
    host: "localhost",
    port: "1234",
    routes: {
        cors: {
            origin: ['*'],
            headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
            additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
            credentials: true
        }
    }
};

// ----- hapi plugins -----
const plugins = [
    HapiJWT.plugin,
]

// ----- security -----
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev-key";
const BCRYPT_WORK_FACTOR = 12;


// ========== [///// EXPORTS /////] ==========
module.exports = {
    serverConfig,
    plugins,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}