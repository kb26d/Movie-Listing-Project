const apiKey = "37c42a66c3b8cf86593ec194cbdc7c09";
const baseURL = "https://api.themoviedb.org/3";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${apiKey}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${apiKey}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
};

// Function to fetch movies
async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const movies = data.results;

    return movies;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to fetch movies based on search query
async function fetchMoviesBySearch(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
  console.log(query.toString());
  try {
    const response = await fetch(url);
    const data = await response.json();

    const movies = data.results;

    return movies;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to fetch movie posters
async function fetchMoviePosters(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const posterPath = data.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return { posterUrl, title: data.title };
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to create and display movie poster elements
async function displayMoviePosters(movies) {
  const container = document.getElementById("poster-container");
  container.innerHTML = ""; // Clear previous posters

  for (const movie of movies) {
    const { posterUrl } = await fetchMoviePosters(movie.id);

    // Create a poster container
    const posterContainer = document.createElement("div");
    posterContainer.classList.add("poster-item");

    // Create an image element
    const img = document.createElement("img");
    img.src = posterUrl;
    img.alt = "Movie Poster";

    // Append the image element to the poster container
    posterContainer.appendChild(img);

    // Append the poster container to the main container
    container.appendChild(posterContainer);
  }
}
// Event listener for search button
document.getElementById("search-button").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value;

  if (query.trim() === "") {
    return;
  }

  const movies = await fetchMoviesBySearch(query.toString());

  displayMoviePosters(movies);
});

//Event listener for navbar buttons

var buttons = document.getElementsByClassName("nav-button");

function handleButtonClick(buttonNumber) {
  var url = baseURL;
  switch (buttonNumber) {
    case 1:
      url += requests.fetchTrending;
      break;
    case 2:
      url += requests.fetchTopRated;
      break;
    case 3:
      url += requests.fetchActionMovies;
      break;
    case 4:
      url += requests.fetchHorrorMovies;
      break;
    case 5:
      url += requests.fetchRomanceMovies;
      break;
    case 6:
      url += requests.fetchComedyMovies;
      break;
  }
  helper(url);
}

async function helper(url) {
  const movies = await fetchMovies(url);
  displayMoviePosters(movies);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (event) {
    var buttonNumber = parseInt(event.target.innerText.match(/\d+/)[0]);
    handleButtonClick(buttonNumber);
  });
}

//Default section for the page
async function trendingMovies() {
  const movies = await fetchMovies(baseURL + requests.fetchTrending);
  displayMoviePosters(movies);
}

trendingMovies();
