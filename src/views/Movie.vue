<template>
  <main class="movie">
    <Divider :title="state.movie.title" />
    <section class="movie__infos">
      <section class="movie__infos__texts">
        <section class="movie__infos__texts__description">
          <h2>Descrição</h2>
          <p>{{ state.movie.opening_crawl }}</p>
        </section>
        <section>
          <section class="movie__infos__texts__release_date">
            <h2>Data de Lançamento</h2>
            <p>{{ formatDate(state.movie.release_date) }}</p>
          </section>
          <section class="movie__infos__texts__persons">
            <section class="movie__infos__texts__persons__director">
              <h2>Diretor</h2>
              <p>{{ state.movie.director }}</p>
            </section>
            <section class="movie__infos__texts__persons__producer">
              <h2>Produtor</h2>
              <p>{{ state.movie.producer }}</p>
            </section>
          </section>
        </section>
      </section>

      <section class="movie__infos__banner">
        <img
          v-if="state.movie.episode_id"
          :src="require(`../../static/episode_${state.movie.episode_id}.jpg`)"
          :alt="state.movie.title"
        />
      </section>
    </section>
    <Divider title="Characters of the movie" />
    <section class="movie__characters">
      <Card
        v-for="(char, index) in state.characters"
        :key="index"
        :title="char.name"
        subtitle1="Data de Nascimento"
        :text1="char.birth_year"
        subtitle2="Altura"
        :text2="char.height"
      />
    </section>
    <Divider title="Write a Review" />
    <section class="movie__review">
      <section class="movie__review__person">
        <div class="input-group">
          <span>Your Name</span>
          <input type="text" v-model="state.form.name" />
        </div>
        <div class="input-group">
          <span>Your E-mail</span>
          <input type="text" v-model="state.form.email" />
        </div>
      </section>
      <section class="movie__review__content">
        <div class="input-group">
          <span>Review</span>
          <textarea rows="10" v-model="state.form.review"></textarea>
        </div>
      </section>
      <section class="movie__review__button">
        <button>
          <span v-if="state.form.loading" class="mdi mdi-loading mdi-spin" />
          <span v-else @click="() => addReview()">Publish</span>
        </button>
      </section>
      <section class="movie__review__reviews"></section>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, reactive } from "@vue/composition-api";
import * as Movies from "../store/modules/movies";
import * as Characters from "../store/modules/characters";
import DataManager from "@/utils/DateManager";

export default defineComponent({
  components: {
    Card: () => import("../components/Cards/Card.vue"),
    Divider: () => import("../components/Divider/Divider.vue"),
  },
  props: {
    id: {
      type: Number | String,
      default: () => 0,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      movie: Movies.getters.movie,
      characters: Characters.getters.characters,
      form: {
        name: "",
        email: "",
        review: "",
        loading: false,
      },
      reviews: Movies.getters.reviews,
    });

    const resetFields = () => {
      setTimeout(() => {
        state.form.name = "";
        state.form.email = "";
        state.form.review = "";
        state.form.loading = false;
      }, 1000);
    };

    const episodeId = computed(() => props.id);

    const addReview = () => {
      state.form.loading = true;
      const { name, review, email } = state.form;
      Movies.actions
        .setReview(props.id, { name, review, email })
        .finally(() => {
          resetFields();
        });
    };

    const formatDate = (date) => new DataManager().toLocale(date).split(" ")[0];

    return {
      state,
      formatDate,
      addReview,
      episodeId,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.movie {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: $main-font;
  padding-bottom: 5%;
  overflow-y: auto;

  &__infos {
    display: grid;
    grid-template-columns: 2fr 1fr;

    column-gap: 100px;
    max-width: 950px;
    margin: 20px 0 40px 0;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__texts {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      row-gap: 100px;

      h2 {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        margin-bottom: 15px;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
      }

      &__release_date {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      &__persons {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__producer {
          text-align: end;
        }
      }
    }

    &__banner {
      width: 350px;
      height: 480px;
      border: 1px solid $secondary-gray;
      border-radius: 15px;

      img {
        border-radius: 15px;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }

  &__characters {
    display: flex;
    column-gap: 70px;
    padding-left: 10px;
    width: 100%;
    max-width: 1000px;
    overflow-x: scroll;
    min-height: 250px;
  }

  &__review {
    width: 100%;
    max-width: 950px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    &__person {
      display: flex;
      justify-content: space-between;
      column-gap: 20px;
    }

    &__content {
    }

    &__button {
      text-align: end;
      button {
        width: 130px;
        height: 40px;
        background: #00ff66;
        border-radius: 10px;
        border: none;
        outline: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        cursor: pointer;
        transition-duration: 0.2s;

        span.mdi {
          font-size: 30px;
        }

        &:hover {
          transform: scale3d(0.8, 0.8, 0.8);
        }
      }
    }

    .input-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      input {
        line-height: 25px;
        font-size: 22px;
        padding: 5px 10px;
        background: #ffffff;
        border: 1px solid #c5c5c5;
        box-sizing: border-box;
        border-radius: 10px;
      }

      textarea {
        line-height: 25px;
        font-size: 22px;
        padding: 5px 10px;
        background: #ffffff;
        border: 1px solid #c5c5c5;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
  }
}
</style>
