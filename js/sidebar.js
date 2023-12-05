"use strict";

import { API_KEY, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};
  fetchDataFromServer(`
  https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`),
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    };

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");
  sidebarInner.innerHTML = `
    <!---------Genre ------->
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>

    <!---------Language------->
    <div class="sidebar-list">
      <p class="title">Language</p>
      <a href="./movie-list.html" class="sidebar-link" menu-close
        >English</a
      >
      <a href="./movie-list.html" class="sidebar-link" menu-close>Hindi</a>
      <a href="./movie-list.html" class="sidebar-link" menu-close
        >Bengali</a
      >
    </div>

    <!---------Footer------->
    <div class="sidebar-footer">
      <p class="copyright">
        Copyright 2023
        <a href="https://github.com/zhale-el">Codewith : zhale-el</a>
      </p>
      <img
        src="./images/tmdb-logo.svg"
        width="130"
        height="17"
        alt="the movie database logo"
      />
    </div>
    `;
}
