import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '../components/MovieList.vue';
import MovieDetails from '../components/MovieDetails.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
