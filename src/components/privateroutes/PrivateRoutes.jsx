import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoutes = () => {
  //const auth = {'token' : true }
  const { currentUser } = useAuth();
  
  return (
    currentUser ? <Outlet/> : <Navigate to='/home' />
  )
}

export default PrivateRoutes