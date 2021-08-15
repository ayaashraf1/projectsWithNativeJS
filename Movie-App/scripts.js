/**
 * list of movies
 * movie info
 * search
 * details with hover
 */

const dbURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imageURL = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

async function getMovies(dbURL) {
    const resp = await fetch(dbURL);
    const respData = await resp.json();
    loadMovies(respData);
}
async function loadMovies(movies) {
    const containerEle = document.getElementById('movies-container');
    if (movies && movies.results.length > 0) {
        containerEle.innerHTML = '';
        movies.results.forEach(async movie => {
            const divEle = document.createElement('div');
            divEle.className = 'movie-box';
            divEle.innerHTML = `<img src="${imageURL + movie.poster_path}" alt="Movie Image" />
            <div class="movie-info">
                <span>${movie.title}</span>
                <span class="rate ${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                </div>
                <div class="overView">
                <h3>overview</h3>
                ${movie.overview}
                </div>
            `;
            if(movie.poster_path != null){
                containerEle.append(divEle);
            }
        });

    }
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
//initially load movies
window.onload = function () {
    getMovies(dbURL);

    //search
    document.getElementById('form').addEventListener('submit', async e => {
        e.preventDefault();
        const searchtxt = document.getElementById('search').value;
        if (searchtxt) {
            getMovies(SEARCHAPI + searchtxt);
            document.getElementById('search').value = '';
        }
    });
};
