<!-- src/components/MovieList.vue -->
<template>
    <div class="movie-list">
        <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
</template>

<script>
import MovieItem from './MovieItem.vue';

export default {
    name: 'MovieList',
    components: {
        MovieItem,
    },
    props: {
        movies: Array,
    },
};
</script>

<style scoped>
.movie-list {
    display: flex;
    flex-wrap: wrap;
}
</style>