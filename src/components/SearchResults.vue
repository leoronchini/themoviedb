<template>
  <div>
    <div v-if="movies.length" class="bg-gray-900 text-white py-8">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-4">Search Results for "{{ query }}"</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">
            <img v-lazy="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster"
              class="w-full h-auto rounded-lg" />
            <h3 class="text-lg font-semibold mt-2">{{ movie.title }}</h3>
            <p class="text-sm text-gray-400">{{ movie.release_date }}</p>
          </div>
        </div>
      </div>
      <div>
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage">Next</button>
      </div>
    </div>
    <p v-else>No results found for "{{ query }}".</p>
  </div>
</template>

<script>
import actions from '@/modules/Movie';
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default {
  name: 'SearchResults',
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
    };
  },
  async created() {
    await this.searchMovies();
  },
  watch: {
    query() {
      this.currentPage = 1;
      this.searchMovies();
    },
  },
  methods: {
    async searchMovies() {
      try {
        const response = await actions.get('/search/movie', {
          params: {
            api_key: apiKey,
            query: this.query,
            page: this.currentPage,
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },
    goToMovieDetails(id) {
      this.$router.push({ name: 'MovieDetails', params: { id } });
    },
    nextPage() {
      this.currentPage++;
      this.searchMovies();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.searchMovies();
      }
    },
  },
};
</script>
