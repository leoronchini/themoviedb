<template>
    <div class="relative bg-gray-800 text-white p-8  shadow-lg overflow-hidden">
        <div class="relative z-10">
            <h1 class="text-3xl font-bold mb-4">Welcome.</h1>
            <p class="text-lg mb-6">Millions of movies, TV shows and people to discover. Explore now.</p>
            <div class="w-full max-w-lg flex mt-6">
                <input type="text" @keyup.enter="searchMovies" v-model="searchQuery"
                    placeholder="Search for a movie, tv show, person..."
                    class="w-full px-4 py-2 text-black rounded-l-lg focus:outline-none" />
                <button @click="searchMovies"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
                    Search
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
                <div v-for="movie in movies" :key="movie.id" class="cursor-pointer inline-block movie-card"
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
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default {
    name: 'MovieList',
    data() {
        return {
            movies: [],
            movieType: 'popular'
        };
    },
    mounted() {
        this.fetchMovies();
    },
    methods: {
        async fetchMovies() {
            try {
                const endpoint = this.movieType === 'popular' ? '/movie/popular' : '/trending/movie/day';
                const response = await actions.get(endpoint, {
                    params: {
                        api_key: apiKey,
                    },
                });
                this.movies = response.data.results;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        toggleMovieType(type) {
            this.movieType = type;
            this.fetchMovies();
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
::-webkit-scrollbar {
    background-color: transparent;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #4f4f4f;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #333;
}
</style>