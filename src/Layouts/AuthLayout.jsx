import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet, useLocation } from 'react-router';
import Authimg from '../assets/banner/authImage.png';

const AuthLayout = () => {
  const location = useLocation();

  // কোন পেজে AuthImage দেখাবো
  const showAuthImg = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="max-w-7xl mx-auto">
      <Logo />

      <div className="flex h-full items-center">
        <div className="flex-1">
          <Outlet />
        </div>

        {showAuthImg && (
          <div className="flex-1">
            <img
              src={Authimg}
              alt="Authentication Banner"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
