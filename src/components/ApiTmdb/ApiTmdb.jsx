import axios from 'axios';

const apiKey = '6bb894494c1a707618648b9164f393c2';
const AXIOS_AUTHORIZATION =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI4OTQ0OTRjMWE3MDc2MTg2NDhiOTE2NGYzOTNjMiIsInN1YiI6IjVlZDdiZmY3ZTRiNTc2MDAyMDM3NjYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kRGs0WRoomKwYXT7Mt8PNU2Zk6kAVasud5CyVVdf2mA';
//Axios header - api key
axios.defaults.headers.common['Authorization'] = AXIOS_AUTHORIZATION;


export async function getMostPopularMoviesTmdbApi(currentPage = 1) {
    const searchParams = new URLSearchParams({
        language: 'en-US',
        page: currentPage,
    });
    const url = `https://api.themoviedb.org/3/trending/movie/day?${searchParams}`;
    const response = await axios.get(url);
    return response.data;
}
export async function getMovieDetailsTmdbApi(id) {
    const searchParams = new URLSearchParams({
        language: 'en-US',
    });
    const url = `https://api.themoviedb.org/3/movie/${id}?${searchParams}`;
    const response = await axios.get(url);
    return response.data;
}
export async function getConfigurationTmdbApi() {

    const url = `https://api.themoviedb.org/3/configuration`;
    const response = await axios.get(url);
    return response.data;
}

export async function getMovieCastTmdbApi(id) {
    const searchParams = new URLSearchParams({
        language: 'en-US',
    });
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?${searchParams}`;
    const response = await axios.get(url);
    console.log("getMovieCastTmdbApi -url", url)
    return response.data;
}

export async function getMovieReviewsTmdbApi(id, currentPage = 1) {
    const searchParams = new URLSearchParams({
        language: 'en-US',
        page: currentPage,
    });
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?${searchParams}`;
    const response = await axios.get(url);
    return response.data;
}
//getConfiguration()
export function getConfiguration() {

    getConfigurationTmdbApi()
        .then(dataMovies => {
            renderMovies(dataMovies);
        })
        .catch(error => {
            console.error(error);
        });
}

export function getMostPopularMovies(pageNumber = 1) {
    if (pageNumber > 500) {
        pageNumber = 500;
    }
    getMostPopularMoviesTmdbApi(pageNumber)
        .then(dataMovies => {
            renderMovies(dataMovies);
        })
        .catch(error => {
            console.error(error);
        });
}


export const getUrlSizePoster = (baseUrl, sizes, path, choiceSize = "w92") => {
    if (sizes.length > 0 && path) {
        const size = sizes.find(size => size === choiceSize) || sizes[0]; // Choosing 'w92' size or the first available size
        return `${baseUrl}${size}${path}`;
    }
    const match = choiceSize.match(/\d+/);
    const number = match ? parseInt(match[0], 10) : null;
    const width = number;
    const height = Math.round(width * 1.5);
    const text = "There is no picture";
    const bgColor = "008c3d";
    const textColor = "000"
    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`; // Fallback URL

};
export function getUrlsSizesPoster(baseUrlToPoster, posterSizes, posterPath) {
    const postersUrlsObject = posterSizes.map(size => {
        return {
            name: size,
            url: baseUrlToPoster + size + posterPath,
        };
    });
    return postersUrlsObject;
}














function renderMovies(dataMovies) {
    gallery.innerHTML = null;
    let totalPages = dataMovies.total_pages;
    if (totalPages > 500) {
        totalPages = 500;
    }
    const currentPage = dataMovies.page;
    const filmsList = dataMovies.results
        .map(
            ({ id, title, poster_path, release_date, genre_ids, vote_average }) => {
                //Img
                const urlSizePoster = getUrlsSizesPoster(poster_path);
                const urlW92 = urlSizePoster.find(obj => obj.name === 'w92');
                const urlW154 = urlSizePoster.find(obj => obj.name === 'w154');
                const urlW185 = urlSizePoster.find(obj => obj.name === 'w185');
                const urlW342 = urlSizePoster.find(obj => obj.name === 'w342');
                const urlW500 = urlSizePoster.find(obj => obj.name === 'w500');
                const urlW780 = urlSizePoster.find(obj => obj.name === 'w780');
                const urlOriginal = urlSizePoster.find(obj => obj.name === 'original');

                const genres = getGenres(genre_ids);
                const year = release_date.split('-')[0];
                const voteAverage = vote_average.toFixed(1);

                return `<li>
            <div class="card" data-id="${id}">
              <div >
                <img class="card-img"
                  alt="${title}"
                  src="${urlW154.url}"
                  srcset="
                    ${urlW185.url} 185w,
                    ${urlW342.url} 342w,
                    ${urlW500.url} 500w,
                    ${urlW780.url} 780w
                     ${urlOriginal.url} 2000w
                  "
                  sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw"
                />
              </div>
              <div class="card-text">
                <p class="card-text-title">${title}</p>
                <p class="card-text-genre">${genres} | ${year}</p>
                <p class="card-text-genre">${voteAverage}</p>
              </div>
            </div>
          </li>`;
            }
        )
        .join('');

    gallery.insertAdjacentHTML('beforeend', filmsList);
    if (createPaginationNew) {
        createPaginationNew(totalPages, currentPage, getMostPopularMovies);
    }
}