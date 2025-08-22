import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullPage = false,
  color = 'primary' 
}) => {
  const sizeClasses = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg'
  };

  const spinnerContent = (
    <div className="text-center">
      <div className={`spinner-border text-${color} ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-spinner py-4">
      {spinnerContent}
    </div>
  );
};