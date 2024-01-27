"use strict";

import { imageBaseUrl, API_KEY, fetchDataFromServer } from "./api.js";

import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

sidebar();

fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`,
  function (movie) {}
);
