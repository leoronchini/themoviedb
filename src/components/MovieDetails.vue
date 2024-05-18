<template>
  <div v-if="movie">
    <h1>TELA DE DETALHES DO FILME</h1>
    <div class="banner">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="Backdrop" class="backdrop" />
      <div class="movie-info">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster" class="movie-poster" />
        <div class="info">
          <h2>{{ movie.title }}</h2>
          <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
          <p><strong>Overview:</strong> {{ movie.overview }}</p>
          <p><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
          <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
        </div>
      </div>
    </div>
    <div class="cast">
      <h3>Cast</h3>
      <div v-if="cast.length">
        <div v-for="actor in cast" :key="actor.cast_id" class="actor-card">
          <img v-lazy="`https://image.tmdb.org/t/p/w500${actor.profile_path}`" alt="Actor Photo" class="actor-photo" />
          <p>{{ actor.name }}</p>
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

<style scoped>
.banner {
  position: relative;
  text-align: center;
  color: white;
}

.backdrop {
  width: 100%;
  height: auto;
}

.movie-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  bottom: 0;
  width: 100%;
}

.movie-poster {
  width: 150px;
  height: auto;
  margin-right: 20px;
}

.info {
  text-align: left;
}

.cast {
  padding: 20px;
}

.actor-card {
  display: inline-block;
  width: 120px;
  text-align: center;
  margin: 10px;
}

.actor-photo {
  width: 100%;
  height: auto;
}
</style>
