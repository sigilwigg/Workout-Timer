// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');
const _ = require('lodash');

// ----- locals -----
const workouts = require('../fake_db/workouts.json');
let curId = _.size(workouts);


// ========== [///// CLASS /////] ==========
class Workout {
    // ----- CREATE -----
    static async create(newWorkoutData) {
        newWorkoutData.workoutId = curId++;
        workouts[newWorkoutData.workoutId] = newWorkoutData;
        return newWorkoutData;
    }

    // ----- GET all -----
    static async getAll(userId) {
        let workoutsArr = _.toArray(workouts);
        return workoutsArr.filter((workout) => {
            return workout.userId == userId;
        })
    }

    // ----- GET by id -----
    static async get(workoutId, userId) {
        let workout = workouts[workoutId];
        if (!workout) throw Boom.notFound("workout not found");

        // check userId matches userId in workout
        if (userId != workout.userId) throw Boom.unauthorized("userId does not match workout");

        return workout;
    }

    // ----- UPDATE by id -----
    static async update(workoutId, workoutData) {
        // check for id mismatches
        if (workoutId != workoutData.workoutId) throw Boom.badRequest('workoutId does not match data');
        if (!workouts[workoutId]) return Boom.notFound("workout not found");

        // make the update:
        for (let item in workoutData) {
            workouts[workoutId][item] = workoutData[item];
        }

        return workouts[workoutId];
    }

    // ----- DELETE by id -----
    static async remove(id) {
        if (!workouts[id]) throw Boom.notFound("workout not found");
        delete workouts[id];
        return "workout deleted";
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = Workout;