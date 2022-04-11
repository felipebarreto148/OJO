<template>
  <main class="page">
    <section class="w-100 d-flex align-center flex-column movies">
      <Divider title="Movies" />
      <section class="cards">
        <Card
          hasImage
          v-for="(movie, index) in state.movies"
          :episode_id="movie.episode_id"
          :key="index"
          :title="movie.title"
          subtitle1="Data de Lançamento"
          :text1="formatData(movie.release_date)"
          subtitle2="Diretor"
          :text2="movie.director"
          @clicked="
            () =>
              $router.push({
                name: 'Movie',
                params: { id: getMovieIndex(movie) },
              })
          "
        />
      </section>
    </section>

    <section class="w-100 d-flex align-center flex-column characters">
      <Divider title="Characters" />
      <section class="cards">
        <Card
          v-for="(char, index) in state.characters.results"
          :key="index"
          :title="char.name"
          subtitle1="Data de Nascimento"
          :text1="char.birth_year"
          subtitle2="Altura"
          :text2="char.height"
        />
      </section>
    </section>
  </main>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";
import * as Movies from "../store/modules/movies";
import * as Characters from "../store/modules/characters";
import * as Loading from "../store/modules/loading";
import DataManager from "@/utils/DateManager";

export default defineComponent({
  components: {
    Card: () => import("../components/Cards/Card.vue"),
    Divider: () => import("../components/Divider/Divider.vue"),
  },
  setup() {
    (async function () {
      Loading.actions.setLoading(true);
      await Movies.actions.getMovies();
      await Characters.actions.getCharacters();
      Loading.actions.setLoading(false);
    })();
    const state = reactive({
      movies: Movies.getters.movies,
      characters: Characters.getters.characters,
    });

    const formatData = (date) => new DataManager().toLocale(date).split(" ")[0];

    const getMovieIndex = ({ url }) => {
      const index = url.split("/")[5];
      return index;
    };

    return {
      state,
      formatData,
      getMovieIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0 20px 50px 20px;
  }

  .cards {
    display: flex;
    column-gap: 70px;
    padding-left: 10px;
    width: 100%;
    max-width: 1000px;
    overflow-x: auto;
  }
}
</style>
