<template>
  <header class="header">
    <h1 class="header__title">Star Wars Universe</h1>
    <input
      type="text"
      class="header__search"
      placeholder="Pesquisar personagens"
    />
  </header>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.header {
  width: 100%;
  height: 10%;
  max-height: 80px;
  background: $black;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 800px) {
    justify-content: space-around;
  }

  &__title {
    font-family: $main-font;
    font-size: 25px;
    color: $white;

    @media (max-width: 550px) {
      width: 100%;
      text-align: center;
    }

    @media (min-width: 800px) {
      font-size: 42px;
    }
  }

  &__search {
    background: $gray;
    height: 30px;
    width: 250px;
    outline: none;
    padding: 2px 5px;
    font-size: 14px;
    font-family: $main-font;
    border-radius: 4px;
    border: none;

    @media (max-width: 550px) {
      display: none;
    }
  }
}
</style>
