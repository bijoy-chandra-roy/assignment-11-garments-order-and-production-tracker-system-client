import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { SiNike, SiAdidas, SiPuma, SiReebok, SiNewbalance, SiUnderarmour, SiFila, SiJordan } from "react-icons/si";
import 'swiper/css';

const Brands = () => {
const brandIcons = [SiNike, SiAdidas, SiPuma, SiReebok, SiNewbalance, SiUnderarmour, SiFila, SiJordan];

    return (
        <div className="py-16 bg-base-100">
            <h2 className="text-3xl font-bold text-center mb-10 text-base-content">Trusted by Top Fashion Brands</h2>

            <div
                className="w-full max-w-6xl mx-auto px-4"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    loop={true}
                    grabCursor={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={4000}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    className="w-full"
                >
                    {brandIcons.map((Icon, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-center py-4">
                            <Icon className="text-7xl text-gray-500 hover:text-primary transition-colors duration-300 cursor-pointer" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Brands;