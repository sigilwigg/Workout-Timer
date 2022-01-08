// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');
const _ = require('lodash');

// ----- locals -----
const exercises = require('../fake_db/exercises.json');
let curId = _.size(exercises);


// ========== [///// CLASS /////] ==========
class Exercise {
    // ----- CREATE -----
    static async create(exercise) {
        exercise.id = curId++;

        exercises[exercise.id] = exercise;
        return exercise;
    }

    // ----- GET all -----
    static async getAll(searchName = null) {
        let exercisesArr = _.toArray(exercises);

        if (!searchName) {
            return exercisesArr;
        }

        return exercisesArr.filter((exercise) => {
            let regex = new RegExp(`(${searchName})\\w+`, 'g');
            return exercise.name.match(regex);
        })
    }

    // ----- GET by id -----
    static async get(id) {
        let exercise = exercises[id];
        if (!exercise) return Boom.notFound("exercise not found");
        return exercises[id];
    }

    // ----- UPDATE by id -----
    static async update(id) {
        if (exercise.id != id) return Boom.badRequest('exercise ID does not match body');
        if (!exercises[exercise.id]) return Boom.notFound("exercise not found");

        for (let item in exercise) {
            exercises[exercise.id][item] = exercise[item];
        }
        return exercises[exercise.id];
    }

    // ----- DELETE by id -----
    static async remove(id) {
        if (!exercises[id]) Boom.notFound("exercise not found");
        delete exercises[id];
        return "exercise deleted";
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = Exercise;