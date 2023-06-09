const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a33e0ffd1886962f62d13af64ceeb238&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=a33e0ffd1886962f62d13af64ceeb238&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

showMovies(apiUrl);

function showMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      data.results.forEach((element) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const image = document.createElement("img");
        image.src = IMGPATH + element.poster_path;

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        const title = document.createElement("h2");
        title.innerHTML = element.title;

        const rating = document.createElement("div");
        rating.classList.add("rating");

        const genre = document.createElement("p");
        genre.classList.add("genre");

        movieInfo.appendChild(title);
        movieInfo.appendChild(rating);
        movieInfo.appendChild(genre);

        movieCard.appendChild(image);
        movieCard.appendChild(movieInfo);

        main.appendChild(movieCard);

        fetchMovieDetails(element.id, rating, genre);
      });
    });
}

function createStarRating(rating) {
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating");
  
    const filledStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
  
    for (let i = 0; i < filledStars; i++) {
      const star = document.createElement("span");
      star.classList.add("star", "filled");
      star.innerHTML = "&#9733;"; // Filled star symbol
      ratingContainer.appendChild(star);
    }
  
    if (hasHalfStar) {
      const halfStar = document.createElement("span");
      halfStar.classList.add("star", "half-filled");
      halfStar.innerHTML = "&#9733;"; // Half-filled star symbol
      ratingContainer.appendChild(halfStar);
    }
  
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  
    for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.innerHTML = "&#9734;"; // Empty star symbol
      ratingContainer.appendChild(star);
    }
  
    return ratingContainer;
}
  

function fetchMovieDetails(movieId, ratingElement, genreElement) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a33e0ffd1886962f62d13af64ceeb238`;

  fetch(movieDetailsUrl)
    .then((res) => res.json())
    .then(function (data) {
      const rating = data.vote_average;
      const genres = data.genres.map((genre) => genre.name).join(", ");

      ratingElement.innerHTML = '';
      ratingElement.appendChild(createStarRating(rating));
      genreElement.innerHTML = genres;
    })
    .catch((error) => {
      console.log("Error fetching movie details:", error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchTerm = search.value;

  if (searchTerm) {
    showMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
