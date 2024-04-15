fetch("https://qva0myalaa.execute-api.us-east-1.amazonaws.com/moviesData")
    .then((response) => response.json())
    .then((data) => handleData(movieData));

function handleData(movieData) {
    let randomMovieData = randomizer(movieData);
}

function MovieSearch(movieData) {

}

function randomizer(radomMovieData) {
    let decade = Math.floor(Math.random() * 10) + 1980;
    console.log(decade);
    let decadeData = movieData[decade];
}