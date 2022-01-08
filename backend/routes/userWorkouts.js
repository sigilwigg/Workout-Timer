// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');

// ----- locals -----
const Workout = require('../models/Workout');


/*
I don't want workouts or times to be able to be accessed unless "user" is specified and that "userId" matches the id stored in the JWT token. This is for security and also doubles as good organization. the public-facing routes will therefore look like:
users/{userId}/workouts/{workoutId}
users/{userId}/times?{query-params}

NOTE: future security implimentation: allow access if token.userId == "admin"
*/
// ========== [///// ROUTES /////] ==========
const userWorkouts = [
    // ----- POST -----
    {
        method: 'POST',
        path: '/users/{userId}/workouts',
        handler: (req, h) => {
            try {
                const { userId } = req.params;
                const newWorkoutData = req.payload;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // check userId matches userId in newWorkoutData
                if (userId != newWorkoutData.userId) throw Boom.unauthorized("userId does not match newWorkoutData");

                // create workout
                return Workout.create(newWorkoutData);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- GET -----
    {
        method: 'GET',
        path: '/users/{userId}/workouts/{workoutId?}',
        handler: (req, h) => {
            try {
                const { userId, workoutId } = req.params;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // get workout(s)
                if (!workoutId) return Workout.getAll(userId);
                return Workout.get(workoutId, userId);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- PATCH -----
    {
        method: 'PATCH',
        path: '/users/{userId}/workouts/{workoutId?}',
        handler: (req, h) => {
            try {
                const { userId, workoutId } = req.params;
                const workoutData = req.payload;

                // check is userId matches token
                const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
                if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

                // check userId matches userId in workoutData
                if (userId != workoutData.userId) throw Boom.unauthorized("userId does not match workoutData");

                // update workout
                return Workout.update(workoutId, workoutData);
            } catch (err) {
                console.log(err)
                return err;
            }
        }
    },

    // ----- DELETE -----
    {
        method: 'DELETE',
        path: '/users/{userId}/workouts/{workoutId?}',
        handler: (req, h) => {
            const { userId, workoutId } = req.params;

            // check is userId matches token
            const token = req.headers.authorization.replace(/^[Bb]earer /, "").trim();
            if (req.server.methods.jwtDecode(token).id != userId) throw Boom.unauthorized("userId does not match access token");

            return Workout.remove(workoutId);
        }
    },
];


// ========== [///// EXPORTS /////] ==========
module.exports = {
    userWorkouts
}