import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3/";
const api_key = "api_key=caf3722c95f7ef6a3aa4080593af8e0e&language=en-US&page=1"

/* Api Get Populater Movie */
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}movie/popular?${api_key}`);
    return resp.data.results;
}

/* Api Get Upcoming Movie */
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${apiUrl}movie/upcoming?${api_key}`);
    return resp.data.results;
}

/* Api Get Populater tv */
export const getPopularTv = async () => {
    const resp = await axios.get(`${apiUrl}tv/popular?${api_key}`);
    return resp.data.results;
}