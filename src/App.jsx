import { React, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navbar, SignIn } from './components'
import { Home, About, Footer } from './pages'
import './App.css';

const App = () => {
  return (
    <>
      <AuthProvider>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </Router>
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App