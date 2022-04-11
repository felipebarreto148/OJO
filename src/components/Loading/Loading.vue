<template>
  <main id="loading" v-if="state.loading">
    <span class="mdi mdi-loading mdi-spin"></span>
  </main>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";
import * as Loading from "@/store/modules/loading";

export default defineComponent({
  setup() {
    const state = reactive({
      loading: Loading.getters.loading,
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

main#loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 200px;
    color: $main-yellow;
  }
}
</style>
