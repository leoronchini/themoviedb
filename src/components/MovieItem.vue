<!-- src/components/MovieItem.vue -->
<template>
    <div class="movie-item">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieItem',
    props: {
      movie: Object,
    },
  };
  </script>
  
  <style scoped>
  .movie-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  </style>
  