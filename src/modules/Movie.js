// const { Axios } = require("axios")

// const actions = {
//     fetchMovies({ commit }) {
//         commit('setLoading', true)
//         Axios.get('https://api.themoviedb.org/3/movie/11?api_key=08048f421b677ab3b373cd10c1f36b16')
//             .then(response => {
//                 commit('setMovies', response.data)
//                 commit('setLoading', false)
//             })
//             .catch(error => {
//                 commit('setLoading', false)
//                 console.log(error)
//             })
//     }
// }

// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { 'Content-Type': 'application/json', 'Authorization': process.env.VUE_APP_API_KEY }
});

export default instance;
