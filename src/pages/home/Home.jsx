import React, { useState, useEffect } from 'react'
import { Alert, Box, Grid, Pagination, Divider } from '@mui/material'
import { MovieCard } from '../../components'
import moviehelper from '../../helpers/MovieHelper'
import './Home.css'

const Home = () => {
  const pageSize = 6;
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [currentMovies, setCurrentMovies] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0
  });

  const filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(query.toLowerCase())
  });

  const handlePageChange = ((event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
    setCurrentMovies(filteredMovies.slice(from, to));

    // scroll to top of page
    window.scrollTo(0, 0)
  });

  const handleProcessMovies = async () => {
    // clear alerts and the current movie data
    clearAlert();
    setMovies([]);

    try {
      const res_movies = await moviehelper.fetchMovies();
      if (res_movies !== 'undefined') {
        setMovies(res_movies);

        //setAlert('info', 'Data retrieved!');
      }
    }
    catch (err) {
      console.log(err);
      setAlert('error', 'Something went wrong!');
    }
  };

  const setAlert = (severity, message) => {
    setAlertState(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  };

  const clearAlert = () => {
    setAlertState(false);
    setAlertSeverity('');
    setAlertMessage('');
  };

  useEffect(() => {
    handleProcessMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPagination({ ...pagination, count: filteredMovies.length });
    setCurrentMovies(filteredMovies.slice(0, pageSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, query]);

  return (
    <React.Fragment>
      {(alertState) ?
        (<Alert
          severity={alertSeverity}
          onClose={() => clearAlert()}
        >
          {alertMessage}
        </Alert>
        ) : (
          <React.Fragment />
        )}
      <div
        className='app__home app__bg flex__center section__padding' id='home'
      >
        <div className='app__home_searchbar'>
          <div className='app__home_searchbar_label'>
            Search:
          </div>
          <div className='app__home_searchbar_input'>
            <input type='search'
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
        <Grid container
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          justifyContent='center'
        >
          {currentMovies.map((movie, key) => (
            <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        margin={'20px'}
      >
        <Divider sx={{ margin: '20px 0' }} />
        <Pagination
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </Box>
    </React.Fragment>
  )
}

export default Home