import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Alert } from '../../components'

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { UserSignUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //console.log('handleSubmit, entry');
      clearAlert();
      setLoading(true);

      // validation
      if (emailRef.current.value === '') {
        setLoading(false);
        return setAlert('error', 'Email is required');
      }
      if (passwordRef.current.value === '') {
        setLoading(false);
        return setAlert('error', 'Password is required');
      }
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setLoading(false);
        return setAlert('error', 'Passwords do not match');
      }
      if (passwordRef.current.value.length < 6) {
        setLoading(false);
        return setAlert('error', 'Passwords must be at least 6 characters');
      }

      // call SignUp functionality here
      await UserSignUp(emailRef.current.value, passwordRef.current.value);
      navigate('/sign-in')
    }
    catch (error) {
      console.log(error.message);
      setAlert('error', error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-sm border-2 rounded-md mx-auto my-20 p-4 shadow-lg">
      <h2 className='text-center mb-4 font-bold text-2xl'>Sign Up</h2>
      {alertState && <Alert alertSeverity={alertSeverity} alertMessage={alertMessage} />}
      <form className='mb-2' onSubmit={handleSubmit}>
        <div className='flex flex-col py-2 text-center'>
          <label className='py-2 font-medium'>Email</label>
          <input
            className='border-2 rounded-md text-center'
            ref={emailRef}
            type='email' />
        </div>
        <div className='flex flex-col py-2 text-center'>
          <label className='py-2 font-medium'>Password</label>
          <input
            className='border-2 rounded-md text-center'
            ref={passwordRef}
            type='password' />
        </div>
        <div className='flex flex-col py-2 text-center'>
          <label className='py-2 font-medium'>Password Confirmation</label>
          <input
            className='border-2 rounded-md text-center'
            ref={passwordConfirmRef}
            type='password' />
        </div>
        <button
          className='border rounded-md border-blue-500
          bg-blue-600 hover:bg-blue-500 w-full 
          p-4 my-2 text-center text-white'
          type='submit'
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <div className="flex-grow h-px bg-gray-400"></div>
      <div className='w-100 text-center mt-6'>
        Already have an account? <Link className='underline' to='/sign-in'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp