$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
    });
});

// fatch api 
function getMovies(searchText) {
    axios.get(`http://www.omdbapi.com/?apikey=2041ec54&s=${searchText}`)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3 my-3">
                    <div class="card-header well text-center">
                        <img src="${movie.Poster}" alt="${movie.Title} poster">
                        <h5>${movie.Title}</h5>
                        <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>`;
            });
            $('#movies').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

// movie selected
function movieSelected(id) {
    sessionStorage.setItem('movieid', id);
    window.location = 'movie.html';
    return false;
}

// get movie
function getMovie() {
    let movieID = sessionStorage.getItem('movieid');

    axios.get(`http://www.omdbapi.com/?apikey=2041ec54&i=${movieID}`)
    .then((response) => {
       let movie = response.data;
       let output = `
       <div class="row">
            <div class="col-md-4 p-4">
                <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img-fluid img-thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
       </div>
       <div class="row  my-4 container mx-auto">
            <div class="well p-3">
                <h3>Plot</h3>
                <p>${movie.Plot}</p>
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
            </div>
       </div>`;
       $('#movie').html(output);
    })
    .catch((error) => {
        console.log(error);
    });
}