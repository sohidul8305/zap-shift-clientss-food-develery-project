import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../../assets/brands/amazon.png';
import amazon_vectore from '../../../../assets/brands/amazon_vector.png';
import casio from '../../../../assets/brands/casio.png';
import monstar from '../../../../assets/brands/moonstar.png';
import randstand from '../../../../assets/brands/randstad.png';
import star from '../../../../assets/brands/star.png';
import start_people from '../../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';


const brandsLogo = [amazon, amazon_vectore, casio, monstar, randstand, star, start_people]
const Brands = () => {
    return (
       <Swiper className='mt-10'
       loop={true}
       slidesPerView={4}
       centeredSlides={true}
       spaceBetween={30}
       grabCursor={true}
       modules={[Autoplay]}
       autoplay={{
        delay: 1000,
        disableOnInteraction: false,
       }}
       >

        {
            brandsLogo.map((logo, index) =>   <SwiperSlide key={index}>
                <img src={logo} alt="" />
            </SwiperSlide>)
        }

      
 
       </Swiper>
    );
};

export default Brands;