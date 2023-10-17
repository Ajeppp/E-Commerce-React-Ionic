import { IonImg, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import Crousel styles
import './Carousel.css'

const Carousel: React.FC = () => {
    return (
        <>
            <Swiper id="carousel" pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide><IonImg alt="highlight1" src="./carousel/1.png" /></SwiperSlide>
                <SwiperSlide><IonImg alt="highlight2" src="./carousel/2.png" /></SwiperSlide>
                <SwiperSlide><IonImg alt="highlight3" src="./carousel/3.png" /></SwiperSlide>
                <SwiperSlide><IonImg alt="highlight4" src="./carousel/4.png" /></SwiperSlide>
                <SwiperSlide><IonImg alt="highlight5" src="./carousel/5.png" /></SwiperSlide>
            </Swiper>
        </>
    )
}

export default Carousel;