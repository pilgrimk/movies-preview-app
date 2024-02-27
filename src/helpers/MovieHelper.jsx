import axios from 'axios';

const api = {
  fetchMovies: async function () {
    const urlString = `${import.meta.env.VITE_APP_API}api/movies/getupcomingmovies`;
    //console.log(urlString);

    // console.log(urlString);
    const response = await axios.get(urlString);
      var data_1 = response.data.map(function (element) {
          return {
              'adult': `${element.adult}`,
              'backdrop_path': `${element.backdrop_path}`,
              'genre_ids': `${element.genre_ids}`,
              'id': `${element.id}`,
              'original_language': `${element.original_language}`,
              'original_title': `${element.original_title}`,
              'overview': `${element.overview}`,
              'popularity': `${element.popularity}`,
              'poster_path': `${element.poster_path}`,
              'release_date': `${element.release_date}`,
              'title': `${element.title}`,
              'video': `${element.video}`,
              'vote_average': `${element.vote_average}`,
              'vote_count': `${element.vote_count}`
          };
      });
      return data_1;
  }
};

export default api;