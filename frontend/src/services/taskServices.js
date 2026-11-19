import { axiosClient } from "../axiosClient";

export const registerUser = (credential) => {
    return axiosClient.post('/register', {
        username: credential.username,
        password: credential.password
    })
}

export const loginUser = (credential) => {
    return axiosClient.post('/login', {
        username: credential.username,
        password: credential.password
    })
}