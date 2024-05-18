<template>
    <div>
        <div>
            <input v-model="searchQuery" placeholder="Search for a movie" />
            <button @click="searchMovies">Search</button>
        </div>
        <div class="toggle-buttons">
            <button @click="toggleMovieType('popular')" :class="{ active: movieType === 'popular' }">Popular
                Movies</button>
            <button @click="toggleMovieType('trending')" :class="{ active: movieType === 'trending' }">Trending
                Movies</button>
        </div>
        <div v-if="movies.length">
            <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">
                <img v-lazy="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster" class="movie-poster" />
                <div class="movie-info">
                    <h2>{{ movie.title }}</h2>
                    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
                    <p>{{ movie.overview }}</p>
                </div>
            </div>
        </div>
        <p v-else>No movies found.</p>
        <div class="pagination">
            <button @click="fetchMovies(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }}</span>
            <button @click="fetchMovies(currentPage + 1)">Next</button>
        </div>
    </div>
</template>

<script>
import actions from '@/modules/Movie';
//TODO: configurar o .env
const apiKey = '08048f421b677ab3b373cd10c1f36b16';

export default {
    name: 'MovieList',
    data() {
        return {
            movies: [],
            currentPage: 1,
            movieType: 'popular'
        };
    },
    mounted() {
        this.fetchMovies(this.currentPage);
    },
    methods: {
        async fetchMovies(page) {
            try {
                if (page < 1) return;
                const endpoint = this.movieType === 'popular' ? '/movie/popular' : '/trending/movie/day';
                const response = await actions.get(endpoint, {
                    params: {
                        api_key: apiKey,
                        page: page,
                    },
                });
                this.movies = response.data.results;
                this.currentPage = page;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        toggleMovieType(type) {
            this.movieType = type;
            this.currentPage = 1;
            this.fetchMovies(this.currentPage);
        },
        goToMovieDetails(id) {
            this.$router.push({ name: 'MovieDetails', params: { id } });
        },
        searchMovies() {
            if (this.searchQuery) {
                this.$router.push({ name: 'SearchResults', params: { query: encodeURIComponent(this.searchQuery) } });
            }
        },
    },

};

</script>

<style scoped>
.movie-card {
    display: flex;
    margin-bottom: 20px;
}

.movie-poster {
    width: 150px;
    height: auto;
    margin-right: 20px;
}

.movie-info {
    flex: 1;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>