import { getMovieReviewData } from "./data.js";
// console.log(getMovieReviewData());
let sortDesc = false;

function init() {
    const movieReviewData = getMovieReviewData();
    registerHandlers(movieReviewData);
    printStatistics(movieReviewData);
    printMoviesData(movieReviewData);
    
};



function printStatistics(movieReviewData) {
   
    const flatReviewData = movieReviewData.flat();

    const totalMovies = movieReviewData.length;
    const totalReviews = flatReviewData.length;

    const totalRating = flatReviewData.reduce((acc, item) => {
        return acc + item.rating;
    }, 0);

    const avgRating = (totalRating / totalReviews).toFixed(2);

    const totalMoviesEl = document.getElementById("tMoviesId");
    addstat(totalMoviesEl, totalMovies);

    const avgRatingEl = document.getElementById("tAvgRating");
    addstat(avgRatingEl, avgRating);

    const totalReviewEl = document.getElementById("tReviewsId");
    addstat(totalReviewEl, totalReviews);
    

};

function addstat(elem, value) {
    const spanEl = document.createElement("span");
    spanEl.classList.add("text-6xl");
    spanEl.innerText = value;
    elem.appendChild(spanEl);
    
};

function printMoviesData(movieReviewData) {
    const flatReviewData = movieReviewData.flat();
    const movieListEl = document.querySelector("#movieListId UL");
    let sortReview = flatReviewData.toSorted((movieA, movieB) => movieB.on - movieA.on);
    
    addMovies(movieListEl, sortReview);
};

function registerHandlers(movieReviewData) {
    const sortBtn = document.getElementById('sortBtn');
    sortBtn.addEventListener("click", ()=> sortByRating(movieReviewData));
};

function sortByRating(movieReviewData) {

    sortDesc = !sortDesc;

    const flatReviewData = movieReviewData.flat();
    const movieListEl = document.querySelector("#movieListId UL");
    removeAllChildNodes(movieListEl);

    const sortRating = sortDesc ? flatReviewData.toSorted((movieA, movieB) => movieB.rating - movieA.rating)
        
                                 : flatReviewData.toSorted((movieA, movieB) => movieA.rating - movieB.rating);
    
                console.log(sortRating);
                addMovies(movieListEl, sortRating);
};

function addMovies(movieListEl,movieReview) {
    movieReview.map((movie) => {
       
        const liElem = document.createElement("li");
        liElem.classList.add("card", "my-2", "p-2");

        const titleElem = document.createElement("p");
        titleElem.classList.add("text-xl", "mb-2");
        

        titleElem.innerText = `${movie.title} - ${movie.rating}`;

        liElem.appendChild(titleElem);
        const reviewElem = document.createElement("p");
        reviewElem.classList.add("mx-2", "mb-2");

        reviewElem.innerText = movie.content;

        liElem.appendChild(reviewElem);

        const byElem = document.createElement("p");
        byElem.classList.add("mx-2", "mb-2");

        byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat('en-in').format(movie.on)}`;

        liElem.appendChild(byElem);
        movieListEl.appendChild(liElem);
    })
    
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

init();

// const movies = [
//     {
//         title: 'The Shawshank Redemption',
//         rating: 9.3,
//         review: 'Test Review',
//         reviewer: 'Test Reviewer'
//     },
//     {
//         title: 'The Shawshank Redemption',
//         rating: 9.3,
//         review: 'Test Review',
//         reviewer: 'Test Reviewer'
//     },
//     {
//         title: 'The Shawshank Redemption',
//         rating: 9.3,
//         review: 'Test Review',
//         reviewer: 'Test Reviewer'
//     }
// ];

// const movieList = document.getElementById('movieListId');

// movies.forEach(movie => {
//     const movieItem = document.createElement('li');
//     movieItem.classList.add('card');
//     movieItem.innerHTML = ` 
//         <p class="text-xl mb-2">${movie.title} - ${movie.rating}</p>
//         <p class="mb-2 mx-2">${movie.review}</p>
//         <p class="mb-2 mx-2">${movie.reviewer}</p>
//     `;
//     movieList.appendChild(movieItem);
// }); 



