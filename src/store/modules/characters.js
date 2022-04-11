import { computed, reactive } from "@vue/composition-api";
import {
  getCharacters,
  getCharactersByMovie,
} from "@/services/modules/characters.service";

export const state = reactive({
  characters: [],
  hasNext: null,
});

export const actions = {
  getCharacters: async () => {
    const res = await getCharacters();
    if (res.next) {
      state.hasNext = res.next;
    }
    state.characters = res;
  },
  getCharactersByMovie: async (id) => {
    const res = await getCharactersByMovie(id);
    state.characters.push(res);
  },
};

export const getters = {
  characters: computed(() => state.characters),
  hasNext: computed(() => state.hasNext),
};
