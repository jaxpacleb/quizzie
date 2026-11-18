import { axiosClient } from "../axiosClient";

export const registerUser = (credential) => {
    return axiosClient.post('/register', {
        username: credential.username,
        password: credential.password
    })
}