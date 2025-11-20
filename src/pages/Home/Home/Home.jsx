import React from 'react';
import Banner from '../../../Layouts/Banner/Banner';
import HowItwork from '../../../components/Logo/How it Work/HowItwork';
import Ourservice from '../../../components/Ourservice/Ourservice';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import FeaturesSection from '../../../components/FeaturesSection/FeaturesSection';
import PrioritySection from '../../../components/PrioritySection/PrioritySection';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());
const Home = () => {
    return (
        <div>
      <Banner></Banner>
      <HowItwork></HowItwork>
      <Ourservice></Ourservice>
      <Brands></Brands>
        <FeaturesSection></FeaturesSection>
        <PrioritySection></PrioritySection>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    
        </div>
    );
};

export default Home;