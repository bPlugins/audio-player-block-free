import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { downloadIcon } from '../../../../utils/icons';

const defaultImg = "https://i.ibb.co.com/VtxvQ2s/pexels-ron-lach-10676939.jpg";

const SwiperSlider = forwardRef(({ playTrack, attributes }, ref) => {
  const { audioProperties, elements = {} } = attributes;
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    slideTo(index) {
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    },
  }));


  return <div className="slider">
    <span className="playerTop">
      {elements?.download && <a className="control" href={audioProperties[activeSlide]?.audio?.url} download>{downloadIcon}</a>}
    </span>
    <Swiper
      modules={[EffectCoverflow, A11y]}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      onSwiper={(swiper) => { swiperRef.current = swiper; }}
      onActiveIndexChange={(val) => { setActiveSlide(val.activeIndex); playTrack(val.activeIndex) }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      spaceBetween={50}
      slidesPerView={3}
    >
      {audioProperties.map((music, index) => (
        <SwiperSlide key={index}>
          <div className={`thumbnail sliderThumb ${activeSlide === index ? 'activeSlide' : ''}`}>
            <img src={music.cover.url ? music.cover.url : defaultImg} alt={music.cover.title ? music.cover.title : "Tony"} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
});

export default SwiperSlider;