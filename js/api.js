"use strict";

const API_KEY = "4669f02d31fdb24bcced0e0fe36ea8fc";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

/**
 * fetch data from a server using the `url` and passes
 * the result in JSON data a `callback` function,
 * along with an optional parameter if has `optionalParam` .
 */
const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseUrl, API_KEY, fetchDataFromServer };
