import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Home/Shared/Footer/Footer';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-25'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;