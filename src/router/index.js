import Vue from "vue";
import VueRouter from "vue-router";
import * as MoviesStore from "@/store/modules/movies";
import * as CharactersStore from "@/store/modules/characters";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    component: () =>
      import(/* webpackChunkName: "Default" */ "@/Layout/Default.vue"),
    redirect: {
      name: "Home",
    },
    children: [
      {
        path: "Home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
      },
      {
        path: "movie/:id/",
        name: "Movie",
        props: (route) => ({ id: route.params.id }),
        beforeEnter: async (to, from, next) => {
					//eslint-disable-line
          await MoviesStore.actions.getMovieById(to.params.id);
          CharactersStore.state.characters = [];
          MoviesStore.getters.movie.value.characters.map((char) => {
            const id = char.trim().split("/")[5];
            CharactersStore.actions.getCharactersByMovie(id);
          });
          next();
        },
        component: () =>
          import(/* webpackChunkName: "Movie" */ "@/views/Movie.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
