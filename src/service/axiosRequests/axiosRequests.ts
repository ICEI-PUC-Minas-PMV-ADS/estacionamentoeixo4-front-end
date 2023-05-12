import axios from "../../../node_modules/axios/index";
import axiosRequestInterface from "./axiosRequestsInterface";

export const axiosRequest = {
    get: async (axiosConfig: axiosRequestInterface) => {
        return await axios.get(axiosConfig.url, axiosConfig.options)
        .then(res => {
            console.log(`Método: GET / Response: ${JSON.stringify(res)}`)
            return res.data
        })
        .catch(error => {
            console.log(`ERROR: Método: GET / Error: ${JSON.stringify(error)}`)
            throw error
        })
    },
    post: async (axiosConfig: axiosRequestInterface) => {
        return await axios.post(axiosConfig.url, axiosConfig.data!, axiosConfig.options)
        .then(res => {
            console.log(`Método: POST / Response: ${JSON.stringify(res)}`)
            return res.data
        })
        .catch(error => {
            console.log(`ERROR: Método: POST / Error: ${JSON.stringify(error)}`)
            throw error
        })
    },
    put: async (axiosConfig: axiosRequestInterface) => {
        return await axios.put(axiosConfig.url, axiosConfig.data!, axiosConfig.options)
        .then(res => {
            console.log(`Método: PUT / Response: ${JSON.stringify(res)}`)
            return res.data
        })
        .catch(error => {
            console.log(`ERROR: Método: PUT / Error: ${JSON.stringify(error)}`)
            throw error
        })
    },
    patch: async (axiosConfig: axiosRequestInterface) => {
        return await axios.patch(axiosConfig.url, axiosConfig.data!, axiosConfig.options)
        .then(res => {
            console.log(`Método: PATCH / Response: ${JSON.stringify(res)}`)
            return res.data
        })
        .catch(error => {
            console.log(`ERROR: Método: PATCH / Error: ${JSON.stringify(error)}`)
            throw error
        })
    },
    delete: async (axiosConfig: axiosRequestInterface) => {
        return await axios.delete(axiosConfig.url, axiosConfig.options)
        .then(res => {
            console.log(`Método: DELETE / Response: ${JSON.stringify(res)}`)
            return res.data
        })
        .catch(error => {
            console.log(`ERROR: Método: DELETE / Error: ${JSON.stringify(error)}`)
            throw error
        })
    },

}