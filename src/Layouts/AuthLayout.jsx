import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import Authimg from '../assets/banner/authImage.png';

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      

      <Logo />


      <div className="flex h-full items-center">

        
        <div className="flex-1">
          <Outlet />
        </div>

{/*       
        <div className="flex-1">
          <img 
            src={Authimg} 
            alt="" 
          />
        </div> */}

      </div>
    </div>
  );
};

export default AuthLayout;
