import React, { useState, useEffect } from 'react'

const Alert = ({ alertSeverity, alertMessage }) => {
  const [title, setTitle] = useState('');
  const [alertClass, setAlertClass] = useState('');

  useEffect(() => {
    if (alertSeverity === 'error') {
      setTitle('Error Message');
      setAlertClass('bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 shadow-md');
    } else if (alertSeverity === 'warning') {
      setTitle('Warning Message');
      setAlertClass('bg-orange-100 border-t border-b border-orange-500 text-orange-700 px-4 py-3 shadow-md');
    } else {
      setTitle('Information Message');
      setAlertClass('bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 shadow-md');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertSeverity]);

  return (
    <div className={alertClass} role="alert">
      <p className="font-bold">{title}</p>
      <p className="text-sm">{alertMessage}</p>
    </div>
  )
}

export default Alert