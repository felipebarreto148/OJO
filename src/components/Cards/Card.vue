<template>
  <span class="mdi mdi-loading mdi-spin" v-if="loading"></span>
  <section
    v-else
    class="card"
    :hasImage="hasImage"
    @click="() => $emit('clicked')"
  >
    <section class="card__image" v-if="hasImage">
      <img
        :src="require(`../../../static/episode_${episodeId}.jpg`)"
        :alt="title"
        width="100%"
        height="350px"
      />
    </section>
    <section class="card__title" :style="cssTitle">
      <h3>{{ title }}</h3>
    </section>
    <section class="card__content">
      <section class="mb-1">
        <h3 class="card__content__subtitle">{{ subtitle1 }}</h3>
        <p class="card__content__text">{{ text1 }}</p>
      </section>
      <section>
        <h3 class="card__content__subtitle">{{ subtitle2 }}</h3>
        <p class="card__content__text">{{ text2 }}</p>
      </section>
    </section>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    hasImage: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    episode_id: {
      type: Number,
      required: false,
      default: () => 0,
    },
    alt: {
      type: String,
      required: false,
      default: () => "",
    },
    title: {
      type: String,
      required: false,
      default: () => "",
    },
    subtitle1: {
      type: String,
      required: false,
      default: () => "",
    },
    text1: {
      type: String,
      required: false,
      default: () => "",
    },
    subtitle2: {
      type: String,
      required: false,
      default: () => "",
    },
    text2: {
      type: String,
      required: false,
      default: () => "",
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(props) {
    const cssTitle = {
      "border-radius": props.hasImage ? 0 : "10px 10px 0 0",
    };

    let episodeId = props.episode_id;

    return {
      cssTitle,
      episodeId,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.mdi-loading {
  font-size: 35px;
  color: $main-yellow;
}

.card {
  min-width: 270px;
  max-height: 500px;
  border: 1px solid $secondary-gray;
  border-radius: 10px;
  margin-bottom: 50px;

  &[hasImage] {
    cursor: pointer;
  }

  font-family: $main-font;

  &__image {
    max-height: 350px;
    img {
      background-size: contain;
      border-radius: 10px 10px 0 0;
    }
  }

  &__title {
    padding: 10px;
    background: $main-yellow;

    h3 {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
  }

  &__content {
    padding: 10px;
    border-radius: 0 0 10px 10px;

    &__subtitle {
      font-weight: 300;
      font-size: 12px;
      line-height: 16px;
      color: #505050;
    }

    &__text {
      font-weight: 300;
      font-size: 10px;
      line-height: 13px;

      color: #505050;
    }
  }
}
</style>
