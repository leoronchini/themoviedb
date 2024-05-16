<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Movie List</h1>
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';

export default {
  name: 'App',
  components: {
    MovieList,
  },
  data() {
    return {
      movies: [
        { id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
        { id: 2, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
        { id: 3, title: 'The Dark Knight', description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.' },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
