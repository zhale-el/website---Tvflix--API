"use strict";

import { API_KEY, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

  const callback = function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    genreLink();
  };

  fetchDataFromServer(url, callback);

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

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
      // link.setAttribute("onclick",`getMovieList("with-genre=${genreId}","${genreName}")`)
      link.textContent = genreName;

      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    /**
     * Toggle sidebar in mobile screen
     */

    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addOnEventElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });
    addOnEventElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}
