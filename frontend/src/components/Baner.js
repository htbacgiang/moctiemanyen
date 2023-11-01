import React, { useRef, useState } from 'react';
import { banner, banner1 } from "../../src/static/data"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import './style.css'
const Baner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
  return (
    <div className=' home-wrapper-1 '>
    <div className='row d-lfex '>
      <div className='col-12'>
        <div className='main-banner position-relative '>
          <div className='slide' >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              {banner?.map((i, j) => {
                return (
                  <SwiperSlide key={j} ><img src={i.image} /></SwiperSlide>
                );
              })}
              <div className="autoplay-progress" slot="container-end" style={{ display: 'none' }}>
                <svg viewBox="0 0 0 0" ref={progressCircle}>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    
      {/* <div className='col-6'>
        <div className='justify-content-between align-items-center'>
          <div className='small-banner position-relative d-flex flex-wrap '>
            {banner1?.map((i, j) => {
              return (
                <img src={i.image} className='img-fluid banner4' key={j} />
              );
            })}
          </div>
        </div>
      </div> */}
      
      </div>
    </div>
  )
}

export default Baner