import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '../components/MovieList.vue';
import MovieDetails from '../components/MovieDetails.vue';
import SearchResults from '../components/SearchResults.vue';

const routes = [
    {
        path: '/',
        name: 'MovieList',
        component: MovieList,
    },
    {
        path: '/movie/:id',
        name: 'MovieDetails',
        component: MovieDetails,
        props: true,
    },
    {
        path: '/search/:query',
        name: 'SearchResults',
        component: SearchResults,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
