import { computed, reactive } from "@vue/composition-api";
import { getMovies, getMovieById } from "@/services/modules/movies.service";

export const state = reactive({
  movies: [],
  movie: {},
  reviews: localStorage.reviews || [],
});

export const actions = {
  getMovies: async () => {
    const res = await getMovies();
    state.movies = res;
  },
  getMovieById: async (id) => {
    await getMovieById(id).then((res) => {
      state.movie = res;
    });
  },
  setReview: async (id, review) => {
    const reviewData = [...state.reviews];
    if (reviewData.some((review) => review.id == id)) {
      const index = reviewData.map((review) => review.id).indexOf(parseInt(id));
      reviewData[index].reviews.push(review);
    } else {
      reviewData.push({
        id,
        reviews: [review],
      });
    }

    localStorage.setItem("reviews", JSON.stringify(reviewData));
  },
};

export const getters = {
  movies: computed(() => state.movies.results),
  movie: computed(() => state.movie),
  reviews: computed(() => state.reviews),
};
