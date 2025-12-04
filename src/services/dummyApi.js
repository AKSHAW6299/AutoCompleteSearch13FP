import { axiosInstance } from "./axiosInstance";

let BASE_URL = 'https://dummyjson.com/recipes/search'

export async function getApiData(query = "") {
    return await axiosInstance.get(`${BASE_URL}?q=${query}`)
}