import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up-short"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
