<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <div class="relative">
      <img :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`" alt="Backdrop"
        class="w-full h-96 object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-8">
        <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" alt="Poster" class="w-48 h-auto rounded-lg" />
      </div>
    </div>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold mb-4">{{ movie.title }}</h1>
      <p class="text-gray-400 mb-6">{{ movie.release_date }}</p>
      <div class="flex items-center mb-4">
        <span class="text-yellow-500 text-xl mr-2">{{ movie.vote_average }}</span>
        <span class="text-gray-400">({{ movie.vote_count }} votes)</span>
      </div>
      <p class="mb-6">{{ movie.overview }}</p>
      <div>
        <h2 class="text-2xl font-bold mb-4">Cast</h2>
        <div class="flex overflow-x-auto space-x-4 py-4">
          <div v-for="member in cast" :key="member.cast_id" class="cast-member flex-none w-32">
            <img v-lazy="`https://image.tmdb.org/t/p/w300${member.profile_path}`" alt="Cast Member"
              class="w-full h-auto rounded-lg" />
            <h3 class="text-lg font-semibold mt-2">{{ member.name }}</h3>
            <p class="text-sm text-gray-400">{{ member.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import actions from '@/modules/Movie';
//TODO: configurar o .env
const apiKey = '08048f421b677ab3b373cd10c1f36b16';

export default {
  name: 'MovieDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movie: null,
      cast: [],
    };
  },
  async created() {
    await this.fetchMovieDetails();
    await this.fetchMovieCredits();
  },
  methods: {
    async fetchMovieDetails() {
      try {
        const response = await actions.get(`/movie/${this.id}`, {
          params: {
            api_key: apiKey,
          },
        });
        this.movie = response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    async fetchMovieCredits() {
      try {
        const response = await actions.get(`/movie/${this.id}/credits`, {
          params: {
            api_key: apiKey,
          },
        });
        this.cast = response.data.cast;
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    },
  },
};
</script>