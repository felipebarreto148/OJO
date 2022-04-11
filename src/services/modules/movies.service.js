import { api } from "../api";

export const getMovies = async () => {
  const res = await api.get("films/");
  return res;
};

export const getMovieById = async (id) => {
  const res = await api.get(`films/${id}/`);
  return res;
};
