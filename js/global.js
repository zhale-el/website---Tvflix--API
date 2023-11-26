"use strict";

/**
 *  -- Add event on multiple elements
 */

const addOnEventElements = function (elements, eventType, callback) {
  for (const elem of elements) {
    elem.addEventListener(eventType, callback);
  }
};

/**
 *  -- Toggle search box in mobile device || small screen
 */
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addOnEventElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});
