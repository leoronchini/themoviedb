<template>
  <div id="app">
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';

export default {
  name: 'App',
  components: {
    MovieList,
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
