// ========== [///// DEPENDANCIES /////] ==========
// ----- locals -----
const Time = require('../models/Time');


/*
I don't want workouts or times to be able to be accessed unless "user" is specified and that "userId" matches the id stored in the JWT token. This is for security and also doubles as good organization. the public-facing routes will therefore look like:
users/{userId}/workouts/{workoutId}
users/{userId}/times?{query-params}

NOTE: future security implimentation: allow access if token.userId == "admin"
*/
// ========== [///// ROUTES /////] ==========
const userTimes = [
    // ----- POST -----
    {
        method: 'POST',
        path: '/users/{userId}/times',
        handler: (req, h) => {
            try {
                const { userId } = req.params;
                const newTimeData = req.payload;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // check userId matches userId in newTimeData
                if (userId != newTimeData.userId) throw Boom.unauthorized("userId does not match newTimeData");

                // create time
                return Time.create(newTimeData);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- GET -----
    {
        method: 'GET',
        path: '/users/{userId}/times/{timeId?}',
        handler: (req, h) => {
            try {
                const { userId, timeId } = req.params;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // get time(s)
                if (!timeId) return Time.getAll(userId);
                return Time.get(timeId, userId);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- PATCH -----
    {
        method: 'PATCH',
        path: '/users/{userId}/times/{timeId?}',
        handler: (req, h) => {
            try {
                const { userId, timeId } = req.params;
                const timeData = req.payload;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // check userId matches userId in timeData
                if (userId != timeData.userId) throw Boom.unauthorized("userId does not match timeData");

                // update time
                return Time.update(timeId, timeData);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- DELETE -----
    {
        method: 'DELETE',
        path: '/users/{userId}/times/{timeId?}',
        handler: (req, h) => {
            const { userId, timeId } = req.params;

            // check is userId matches token
            const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
            if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

            return Workout.remove(timeId);
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    userTimes
}