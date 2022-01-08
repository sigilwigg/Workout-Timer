// ========== [///// DEPENDANCIES /////] ==========
// ----- locals -----
const Auth = require("../models/Auth");
const User = require("../models/User");


// ========== [///// ROUTES /////] ==========
const auth = [
    // ----- POST register -----
    {
        method: 'POST',
        path: '/auth/register',
        handler: async (req, h) => {
            try {
                // create a new user
                let newUserData = req.payload;
                let { username, password } = newUserData;
                let newUser = await User.create(newUserData);
                await Auth.login(username, password);

                // create & sign token ("login")
                let id = newUser.id;
                let payload = { id: newUser.id }
                let token = req.server.methods.jwtSign(payload);

                return { token, id };
            } catch (err) {
                console.log(err)
                return err;
            }
        },
        options: {
            auth: false
        }
    },

    // ----- POST login -----
    {
        method: 'POST',
        path: '/auth/login',
        handler: async (req, h) => {
            try {
                // login the user
                let { username, password } = req.payload;
                let user = await Auth.login(username, password);

                // create & sign token
                let id = user.id;
                let payload = { id: user.id }
                let token = req.server.methods.jwtSign(payload);

                return { token, id };
            } catch (err) {
                console.log(err)
                return err;
            }
        },
        options: {
            auth: false
        }
    },

    // ----- POST logout -----
    {
        method: 'POST',
        path: '/auth/logout',
        handler: async (req, h) => {
            try {
                // logout the user(make inactive)
                await Auth.logout(req.payload.id);

                return "logout successful";
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- GET test -----
    {
        method: 'GET',
        path: '/auth/verify-login',
        handler: (req, h) => {
            return "logged in!"
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    auth
}