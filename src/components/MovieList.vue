<template>
    <div class="movie-list">
        <!-- <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" /> -->
        <ul v-if="movies.length">
            <li v-for="movie in movies" :key="movie.id">
                {{ movie.title }}
            </li>
        </ul>
        <p v-else>No movies found.</p>
    </div>
</template>

<script>
import axios, { Axios } from 'axios';

export default {
    name: 'MovieList',
    data() {
        return {
            movies: [],
        };
    },
    mounted() {
        this.fetchMovies();
    },
    methods: {
        async fetchMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/11?api_key=08048f421b677ab3b373cd10c1f36b16');
                this.movies = response.data;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
    },
    
};

</script>

<style scoped>
.movie-list {
    display: flex;
    flex-wrap: wrap;
}
</style>