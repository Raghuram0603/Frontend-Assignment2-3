import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {message && <p style={{ marginTop: '1rem', color: '#666' }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;