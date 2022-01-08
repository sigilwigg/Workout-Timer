// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import axios from "axios";


// ========== [///// CLASS /////] ==========
class API {
    static token;
    static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:1234";

    static async login(username, password) {
        try {
            let res = await axios.post(`${API.BASE_URL}/auth/login`, { username, password });
            return res.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async register(registerData) {
        try {
            let res = await axios.post(`${API.BASE_URL}/auth/register`, registerData);
            return res.data;
        } catch (err) {
            return err;
        }
    }

    // ----- POST REQUEST -----
    static async postRequest(endpoint, data) {
        console.debug("API Call:", endpoint, "post request");

        const url = `${API.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${API.token}` };

        try {
            return (await axios.post(url, data, { headers }));
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // ----- GET REQUEST -----
    static async getRequest(endpoint, params) {
        console.debug("API Call:", endpoint, "get request");

        const url = `${API.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${API.token}` };

        try {
            return (await axios.get(url, { headers, params }));
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // ----- PATCH REQUEST -----
    static async patchRequest(endpoint, data) {
        console.debug("API Call:", endpoint, "patch request");

        const url = `${API.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${API.token}` };

        try {
            return (await axios.patch(url, data, { headers }));
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // ----- DELETE REQUEST -----
    static async deleteRequest(endpoint) {
        console.debug("API Call:", endpoint, "delete request");

        const url = `${API.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${API.token}` };

        try {
            return (await axios.delete(url, { headers }));
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // ----- users -----
    static async getUser(id) {
        let { data } = await this.getRequest(`users/${id}`);
        return data;
    }

    // ----- workouts -----
    static async getWorkouts(id) {
        let { data } = await this.getRequest(`users/${id}/workouts`);
        return data;
    }

    static async updateWorkout(userId, workoutId, workoutData) {
        let { data } = await this.patchRequest(`users/${userId}/workouts/${workoutId}`, workoutData);
        return data;
    }

    static async createWorkout(id, workoutData) {
        let { data } = await this.postRequest(`users/${id}/workouts`, workoutData);
        return data;
    }

    static async deleteWorkout(userId, workoutId) {
        let { data } = await this.deleteRequest(`users/${userId}/workouts/${workoutId}`);
        return data;
    }

    // ----- exercises -----
    static async getExercises(query) {
        let params = { name: query };
        let { data } = await this.getRequest(`exercises`, params);
        return data;
    }

    // ----- times -----
    static async getTimes(id) {
        let { data } = await this.getRequest(`users/${id}/times`);
        return data;
    }

    static async postTime(id, timeData) {
        let { data } = await this.postRequest(`users/${id}/times`, timeData);
        return data;
    }
}


// ========== [///// EXPORTS /////] ==========
export default API;