import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions, Rating } from '@mui/material'
import shortid from 'shortid'
import './MovieCard.css'

const MovieCard = ({ movie: { title, overview, backdrop_path } }) => {
    const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL;
    const imageSize = "/w500";
    const imgURL = imageBaseURL + imageSize + backdrop_path

    return (
        <Card
            sx={{ maxWidth: 345, m: 1 }}
            key={shortid.generate()}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height='170'
                    image={imgURL}
                    alt='poster'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <p className='app__moviecard__cuttoff-text'>
                        {overview}
                    </p>
                    <input
                        className='app__moviecard__expand-btn'
                        type='checkbox' />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Rating
                    name={`rating-${shortid.generate()}`}
                    size="large"
                />
            </CardActions>
        </Card>
    );
}

export default MovieCard