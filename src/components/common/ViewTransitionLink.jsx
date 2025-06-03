import React from 'react';
import { Link } from 'react-router-dom';

const ViewTransitionLink = ({ to, children, ...props }) => {
  const handleClick = (e) => {
    if (!document.startViewTransition) {
      return;
    }

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = to;
    });
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ViewTransitionLink; 