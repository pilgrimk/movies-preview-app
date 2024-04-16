import { React, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navbar, SignIn, SignUp, ForgotPassword } from './components'
import { Home, MyMovies, About, Footer } from './pages'
import './App.css';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
        <Navbar />
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/my-movies' element={<MyMovies />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App