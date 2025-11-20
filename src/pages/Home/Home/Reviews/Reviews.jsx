import React, { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    console.log(reviews);

    return (
        <div>
            <div className='text-center mb-24'>
                <div className="text-3xl text-center font-bold my-8">ReViews</div>
                <p>A posture corrector works by providing support and gentle alignment.</p>
            </div>

            <Swiper 
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {reviews.map(review => (
                    <SwiperSlide key={review.id}>
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
