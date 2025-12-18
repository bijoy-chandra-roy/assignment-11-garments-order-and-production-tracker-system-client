import { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='my-24 max-w-7xl mx-auto px-4'>
            <div className='text-center mb-16'>
                <h3 className="text-3xl text-center font-bold mb-4">Client Feedback</h3>
                <p className="max-w-2xl mx-auto text-base-content/70">
                    See what our global partners and buyers have to say about our production quality and tracking efficiency.
                </p>
            </div>

            {reviews.length > 0 && (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper !pb-12"
                    style={{
                        "--swiper-pagination-color": "#ffd300",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "0.5",
                        "--swiper-pagination-bullet-size": "12px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px"
                    }}

                >
                    {reviews.map(item => (
                        <SwiperSlide key={item.id} className="max-w-md">
                            <ReviewCard review={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Reviews;