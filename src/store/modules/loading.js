import { computed, reactive } from "@vue/composition-api";

export const state = reactive({
  loading: false,
});

export const actions = {
  setLoading: (payload) => {
    state.loading = payload;
  },
};

export const getters = {
  loading: computed(() => state.loading),
};
