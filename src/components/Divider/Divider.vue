<template>
  <section class="divider">
    <span class="divider__line" />
    <h1>{{ title }}</h1>
    <span class="divider__line" />
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
      default: () => "Star Wars Universe",
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.divider {
  display: flex;
  justify-content: center;
  column-gap: 20px;
  align-items: center;
  width: 80%;
  max-width: 1000px;
  margin: 15px 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  h1 {
    font-family: $main-font;
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    width: 100%;
  }

  &__line {
    width: 100%;
    height: 1px;
    background: black;
  }
}
</style>
