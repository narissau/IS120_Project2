fetch("https://qva0myalaa.execute-api.us-east-1.amazonaws.com/moviesData")
    .then((response) => response.json())
    .then((data) => handleData(data));

const movies = [];
let filteredMovies = [];

function handleData(movieData) {
    Object.values(movieData).forEach(decade => {
        Object.values(decade).forEach(movie => {
        });
    });

    Object.entries(movieData).forEach((decadeEntry) => {
        const [key, value] = decadeEntry;
        Object.values(value).forEach(movie => {
            movie.decade = key;
            movies.push(movie);
        });
    });
}

function movieSearch(movieData) {
    let decadeInput = document.getElementById("inputGroupSelect01").value;
    let genreInput = document.getElementById("inputGroupSelect02").value;

    var filteredMovies = [];
    
    if (decadeInput) {
        filteredMovies = movies.filter(x => x.decade === decadeInput);
    }
    if (genreInput) {
        if (decadeInput) {
            filteredMovies = searchGenres(filteredMovies, genreInput);
        } else {
            filteredMovies = searchGenres(movies, genreInput);        
        }
    }
    console.log(filteredMovies);    
    displayMovie(filteredMovies);
}

let currentMovieIndex = 0;


function displayMovie(filteredMovies) {
    if (filteredMovies.length > 0) {
        const movie = filteredMovies[currentMovieIndex];
        document.getElementById("movieResponse").innerText = movie.title;
        document.getElementById("yearResponse").innerText = movie.release_date.substring(0, 4);
        document.getElementById("plotResponse").innerText = movie.plot;

        document.getElementById("prevButton").disabled = currentMovieIndex === 0;
        document.getElementById("nextButton").disabled = currentMovieIndex === filteredMovies.length - 1;
    } else {
        document.getElementById("movieResponse").innerText = "No movie found";
        document.getElementById("yearResponse").innerText = "";
        document.getElementById("plotResponse").innerText = "";
        document.getElementById("prevButton").disabled = true;
        document.getElementById("nextButton").disabled = true;
    }
}

function searchGenres (movies, genreInput) {
    var genremovies = [];
    var i = 0;
    while (i < movies.length) {
        var movie = movies[i];
        var g = 0;
        while (g < movie.genres.length) {
            console.log(movie.genres[g] + " " + genreInput);
            if (movie.genres[g] === genreInput) genremovies.push(movie);
            g++;
        }
        i++;
    }
    return genremovies;
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

document.getElementById("toggleModeButton").addEventListener("click", toggleMode);

// This was meant to be the JS that handled the buttons

// document.getElementById("prevButton").addEventListener("click", () => {
//     if (currentMovieIndex > 0) {
//         currentMovieIndex--;
//         displayMovie(filteredMovies);
//     }
// });

// document.getElementById("nextButton").addEventListener("click", () => {
//     if (currentMovieIndex < filteredMovies.length - 1) {
//         currentMovieIndex++;
//         displayMovie(filteredMovies);
//     }
// });

