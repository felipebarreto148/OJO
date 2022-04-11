import { api } from "../api";

export const getCharacters = async () => {
  const res = await api.get("people/");
  return res;
};

export const getCharactersByMovie = async (id) => {
  const res = await api.get(`people/${id}/`);
  return res;
};
