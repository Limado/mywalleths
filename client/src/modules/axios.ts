import axios from "axios";
export const myAxios = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

