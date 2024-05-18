<template>
  <div>
    <h1>Search Results for "{{ query }}"</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">
        <h2>{{ movie.title }}</h2>
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster" class="movie-poster" />
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
//TODO: configurar .env
const apiKey = '08048f421b677ab3b373cd10c1f36b16';

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

<style scoped>
.movie-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.movie-card img {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
</style>