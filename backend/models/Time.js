// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const Boom = require('@hapi/boom');
const _ = require('lodash');

// ----- locals -----
const times = require('../fake_db/times.json');
let curId = _.size(times);


// ========== [///// CLASS /////] ==========
class Time {
    // ----- CREATE -----
    static async create(newTimeData) {
        newTimeData.timeId = curId++;
        times[newTimeData.timeId] = newTimeData;
        return newTimeData;
    }

    // ----- GET all -----
    static async getAll(userId) {
        let timesArr = _.toArray(times);
        return timesArr.filter((time) => {
            return time.userId == userId;
        })
    }

    // ----- GET by id -----
    static async get(timeId, userId) {
        let time = times[timeId];
        if (!time) throw Boom.notFound("time not found");

        // check userId matches userId in time
        if (userId != time.userId) throw Boom.unauthorized("userId does not match time");

        return time;
    }

    // ----- UPDATE by id -----
    static async update(timeId, timeData) {
        // check for id mismatches
        if (timeId != timeData.timeId) throw Boom.badRequest('timeId does not match data');
        if (!times[timeId]) return Boom.notFound("time not found");

        // make the update:
        for (let item in timeData) {
            times[timeId][item] = timeData[item];
        }

        return times[timeId];
    }

    // ----- DELETE by id -----
    static async remove(id) {
        if (!times[id]) throw Boom.notFound("time not found");
        delete times[id];
        return "time deleted";
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = Time;