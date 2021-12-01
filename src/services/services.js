import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3/";
const api_key = "api_key=caf3722c95f7ef6a3aa4080593af8e0e&language=es"

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

/* Api Get Family Movie */
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${apiUrl}discover/movie?${api_key}`);
    return resp.data.results;
}

// Get Documnetery Movies
export const getDocumentaryMovies = async () => {
    const resp = await axios.get(`${apiUrl}discover/movie?${api_key}&with_genres=99`);
    return resp.data.results;
};

// Get Movie
export const getMovie = async (id) => {
    const resp = await axios.get(`${apiUrl}/movie/${id}?${api_key}`);
    return resp.data;
};
