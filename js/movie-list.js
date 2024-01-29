"use strict";

import { API_KEY, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";

//collect genre name & url parameter from local storage

const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;

fetchDataFromServer(
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
  function ({ results: movielist, total_pages }) {
    totalPages = total_pages;

    document.title = `${genreName} Movies - Tvflix`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">All ${genreName} Movies</h1>
      </div>

      <!------slider list ----->
      <div class="grid-list"></div>
    

      <!------load more btn ----->
      <button class="btn load-more" load-more>Load More</button>
    `;

    /**
     * add movie card based on fetched item
     */
    for (const movie of movielist) {
      const movieCard = createMovieCard(movie);

      movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);

    /**
     * load more button functionality
     */

    document
      .querySelector("[load-more]")
      .addEventListener("click", function () {
        if (currentPage >= totalPages) {
          this.style.display = "none"; //this == loading-btn
          return;
        }
        currentPage++;
        this.classList.add("loading"); //this == loading-btn

        fetchDataFromServer(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
          ({ results: movielist }) => {
            this.classList.remove("loading"); //this == loading-btn

            for (const movie of movielist) {
              const movieCard = createMovieCard(movie);

              movieListElem.querySelector(".grid-list").appendChild(movieCard);
            }
          }
        );
      });
  }
);
