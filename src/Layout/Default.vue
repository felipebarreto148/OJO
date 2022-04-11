<template>
  <main>
    <Loading />
    <Header />
    <section class="content">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </section>
  </main>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: {
    Header: () => import("@/components/Header/Header.vue"),
    Loading: () => import("@/components/Loading/Loading.vue"),
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
}

.content {
  width: 100%;
  height: calc(100% - 80px);
  overflow: hidden;
}
</style>
