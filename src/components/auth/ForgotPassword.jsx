import React, { useState, useRef } from 'react'
import { Alert } from '../../components'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ForgotPassword = () => {
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
  const { ResetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      clearAlert();

      // validation
      if (emailRef.current.value === '') {
        setLoading(false);
        return setAlert('error', 'Email is required');
      };

      // call ResetPassword functionality here
      await ResetPassword(emailRef.current.value);
      setAlert('info', 'Check your inbox for further instructions.');

    }
    catch (error) {
      console.log(error.message);
      setAlert('error', error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-sm border-2 rounded-md mx-auto my-20 p-4 shadow-lg">
      <h2 className='text-center mb-4 font-bold text-2xl'>Forgot Password</h2>
      {alertState && <Alert alertSeverity={alertSeverity} alertMessage={alertMessage} />}
      <form className='mb-2' onSubmit={handleSubmit}>
        <div className='flex flex-col py-2 text-center'>
          <label className='py-2 font-medium'>Email</label>
          <input
            className='border-2 rounded-md text-center'
            ref={emailRef}
            type='email' />
        </div>
        <button
          className='border rounded-md border-blue-500
           bg-blue-600 hover:bg-blue-500 w-full 
           p-4 my-2 text-center text-white'
          type='submit'
          disabled={loading}
        >
          Reset Password
        </button>
      </form>
      <div className="flex-grow h-px bg-gray-400"></div>
      <div className='w-100 text-center mt-6'>
        Already have an account? <Link className='underline' to='/sign-in'>Sign In</Link>
      </div>
    </div>
  )
}

export default ForgotPassword