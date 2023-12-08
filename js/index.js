"use strict";

/**
 * import all components and functions
 */
import { sidebar } from "./sidebar.js";
import { API_KEY, imageBaseUrl, fetchDataFromServer } from "./api.js";

sidebar();

/***
 * fetch all genres eg:[{"id":"123","name":"Action"}]
 *then change genre formate eg:{123:}
 */
const genreList = {
  // create genre string from genre_id eg:[23,43] -> "Action, Romance"

  asString(genreIdList) {
    let newGenreList = [];

    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]);
      //this == genreList
    }
    return newGenreList.join(", ");
  },
};
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

const callback = function ({ genres }) {
  for (const { id, name } of genres) {
    genreList[id] = name;
  }

  fetchDataFromServer(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`,
    heroBanner
  );
};

fetchDataFromServer(url, callback);

const pageContent = document.querySelector("[page-content]");

const heroBanner = function ({ results: movielist }) {
  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Popular Movies";
  banner.innerHTML = html`
    <!--  banner-slider start-->
    <div class="banner-slider">
      <!--  slider-control start -->
      <div class="slider-control">
        <div class="control-inner">
          <button class="poster-box slider-item">
            <img
              src="./images/slider-control.jpg"
              alt="Slide to Puss in Boots: The Last Wish"
              loading="lazy"
              draggable="false"
              class="img-cover"
            />
          </button>
        </div>
      </div>
      <!--  slider-control end -->
    </div>
  `;

  let controlItemIndex = 0;

  for (const [index, movie] of movielist.entries()) {
    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id,
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

    sliderItem.innerHTML = `
      <img
        src="${imageBaseUrl}w1280${backdrop_path}"
        alt="${title}"
        class="img-cover"
        loading="${index === 0 ? "eager" : "lazy"}"
      />
      <!-------div content--------->
      <div class="banner-content">
        <h2 class="heading">${title}</h2>
        <!-------div meta list--------->
        <div class="meta-list">
          <div class="meta-item">${release_date.split("-")[0]}</div>
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>
        <p class="genre">${genreList.asString(genre_ids)}</p>

        <p class="banner-text">${overview}</p>

        <!------play btn (red)-->
        <a href="detail.html" class="btn">
          <img
            src="./images/play_circle.png"
            width="24"
            height="24"
            alt="play circle"
            aria-hidden="true"
          />
          <span class="span">Watch Now</span>
        </a>
      </div>
    `;
  }
};
