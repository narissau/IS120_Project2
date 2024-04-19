document.getElementById("loginButton").addEventListener("click", function () {
    let loginForm = document.getElementById("loginForm");
    let overlay = document.getElementById("overlay");
    if (loginForm.style.display === "none" || loginForm.style.display === "") {
        loginForm.style.display = "block";
        overlay.style.display = "block";
    } else {
        loginForm.style.display = "none";
        overlay.style.display = "none";
    }
});


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    alert("Username: " + username + "\nPassword: " + password);

    let loginForm = document.getElementById("loginForm");
    let overlay = document.getElementById("overlay");

    setTimeout(function () {
        loginForm.style.display = "none";
        overlay.style.display = "none";
    }, 1000); 
});


// Function to toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

document.getElementById("toggleModeButton").addEventListener("click", toggleMode);



// window.onload = function () {
//     var width = Math.round(window.screen.availWidth * 0.5);
//     var height = Math.round(window.screen.availHeight * 0.5);

//     window.resizeTo(width, height);
// }


// making a table of top award-winning movies
fetch('https://qva0myalaa.execute-api.us-east-1.amazonaws.com/moviesData')
    .then(response => response.json())
    .then(data => {

        const moviesWithOver30Wins = [];
        Object.keys(data).forEach(decade => {
            Object.keys(data[decade]).forEach(movie => {
                const awardWins = data[decade][movie]["award_wins"];
                if (awardWins > 100) {
                    moviesWithOver30Wins.push({
                        title: data[decade][movie]["title"],
                        releaseDate: data[decade][movie]["release_date"],
                        directors: data[decade][movie]["directors"],
                        awardNominations: data[decade][movie]["award_nominations"],
                        awardWins: awardWins
                    });
                }
            });
        });

        moviesWithOver30Wins.sort((a, b) => b.awardWins - a.awardWins);

        const tableContainer = document.getElementById('best-ratings-container');
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Title', 'Release Date', 'Directors', 'Award Nominations', 'Award Wins']; // Add 'Award Nominations' and 'Award Wins' headers

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement('tbody');

        moviesWithOver30Wins.forEach(movie => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = movie.title;
            row.appendChild(titleCell);

            const releaseDateCell = document.createElement('td');
            releaseDateCell.textContent = movie.releaseDate;
            row.appendChild(releaseDateCell);

            const directorsCell = document.createElement('td');
            directorsCell.textContent = movie.directors;
            row.appendChild(directorsCell);

            const awardNominationsCell = document.createElement('td');
            awardNominationsCell.textContent = movie.awardNominations;
            row.appendChild(awardNominationsCell);

            const awardWinsCell = document.createElement('td');
            awardWinsCell.textContent = movie.awardWins;
            row.appendChild(awardWinsCell);

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        tableContainer.appendChild(table);
    })
    .catch(error => console.error('Error fetching movie data:', error));


// movies released in your birth year table
function getMoviesByYear() {
    console.log("Function getMoviesByYear() called.");
    const yearInput = document.getElementById('yearInput').value;

    fetch('https://qva0myalaa.execute-api.us-east-1.amazonaws.com/moviesData')
        .then(response => response.json())
        .then(data => {
            const movieSpan = document.getElementById('movieName');
            movieSpan.textContent = '';

            if (data) {
                const moviesReleasedInYear = [];
                Object.values(data).forEach(decade => {
                    Object.values(decade).forEach(movie => {
                        if (movie.release_date.startsWith(yearInput)) {
                            moviesReleasedInYear.push(movie.title);
                        }
                    });
                });

                if (moviesReleasedInYear.length > 0) {
                    const movieTitles = moviesReleasedInYear.join(', ');
                    movieSpan.textContent = movieTitles;
                } else {
                    movieSpan.textContent = 'No movies found for the specified year.';
                }
            } else {
                movieSpan.textContent = 'Error fetching movie data.';
            }
        })
        .catch(error => console.error('Error fetching movie data:', error));
}


// animation on buttons
const submitButton = document.getElementById("submitButton");
const birthButton = document.getElementById("birthButton");
const toggleModeButton = document.getElementById("toggleModeButton");
// const openModalButton = document.getElementById("openModalButton");
const loginButton = document.getElementById("loginButton");

submitButton.addEventListener("click", function () {
    this.classList.add("submit-animation");
    setTimeout(() => {
        this.classList.remove("submit-animation");
    }, 1000); 
});

birthButton.addEventListener("click", function () {
    this.classList.add("submit-animation");
    setTimeout(() => {
        this.classList.remove("submit-animation");
    }, 1000); 
});

toggleModeButton.addEventListener("click", function () {
    this.classList.add("submit-animation");
    setTimeout(() => {
        this.classList.remove("submit-animation");
    }, 1000); 
});

// openModalButton.addEventListener("click", function () {
//     this.classList.add("submit-animation");
//     setTimeout(() => {
//         this.classList.remove("submit-animation");
//     }, 1000); 
// });

loginButton.addEventListener("click", function () {
    this.classList.add("submit-animation");
    setTimeout(() => {
        this.classList.remove("submit-animation");
    }, 1000);
});



// Function to fetch a random movie plot and display it in the modal
async function getRandomMoviePlot() {
    try {
        const response = await fetch('https://qva0myalaa.execute-api.us-east-1.amazonaws.com/moviesData');
        const data = await response.json();

        const randomEra = getRandomElement(Object.keys(data));
        const randomMovie = getRandomElement(Object.keys(data[randomEra]));

        const plot = data[randomEra][randomMovie].plot;
        const title = data[randomEra][randomMovie].title;

        document.getElementById('movieTitle').innerText = title;
        document.getElementById('moviePlot').innerText = plot;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const modal = document.getElementById('myModal');

const span = document.getElementsByClassName('close')[0];

document.getElementById('openModalButton').addEventListener('click', getRandomMoviePlot);

span.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


