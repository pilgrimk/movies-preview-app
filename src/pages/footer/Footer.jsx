import React from 'react'
import { Typography } from '@mui/material'
import './Footer.css'

const Footer = () => {
  return (
    <div className='app__footer flex__center section__padding' id='footer'>
      <Typography variant='body1'>
        Movies Preview 2022. All rights reserved.
      </Typography>
    </div>
  )
}

export default Footer