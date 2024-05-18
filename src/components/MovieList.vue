<template>
    <div class="relative bg-gray-800 text-white p-8  shadow-lg overflow-hidden">
        <!-- <img src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-65f8d6fcdcccbfc236d8b775d67ff55794ff9aaeb63b0f1712e9e304f860f2ea.svg" alt="TMDB Logo" class="absolute top-0 right-0 w-24 h-24 opacity-10"> -->
        <div class="relative z-10">
            <h1 class="text-3xl font-bold mb-4">Welcome.</h1>
            <p class="text-lg mb-6">Millions of movies, TV shows and people to discover. Explore now.</p>
            <div class="relative w-full max-w-md mx-auto">
                <input v-model="searchQuery" @keyup.enter="searchMovies" type="text"
                    class="w-full px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:border-blue-500"
                    placeholder="Search for a movie, tv show, person......" />
                <button @click="searchMovies" class="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3.5a7.5 7.5 0 016.36 10.65z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div v-if="movies.length" class="bg-gray-900 text-white py-8">
        <div class="container mx-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-3xl font-bold">{{ title }}</h2>
                <div class="space-x-4">
                    <button @click="toggleMovieType('popular')" :class="{ 'text-yellow-500': movieType === 'popular' }"
                        class="hover:text-yellow-500">
                        Popular Movies
                    </button>
                    <button @click="toggleMovieType('trending')"
                        :class="{ 'text-yellow-500': movieType === 'trending' }" class="hover:text-yellow-500">
                        Trending Movies
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto whitespace-nowrap space-x-4 flex">
                <div v-for="movie in movies" :key="movie.id" class="inline-block movie-card"
                    @click="goToMovieDetails(movie.id)">
                    <img v-lazy="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster"
                        class="w-48 h-auto rounded-lg movie-poster" />
                    <h3 class="text-lg font-semibold mt-2">{{ movie.title }}</h3>
                    <p class="text-sm text-gray-400">{{ movie.release_date }}</p>
                </div>
            </div>
        </div>
    </div>
    <p v-else>No movies found.</p>
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
                console.log('teste')
                this.$router.push({ name: 'SearchResults', params: { query: encodeURIComponent(this.searchQuery) } });
            }
        },
    },

};

</script>