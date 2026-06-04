import { useState, useRef } from 'react';

import SwiperSlider from './SwiperSlider';
import MusicPlayerBack from './MusicPlayerBack';

const Slider = ({ attributes }) => {
    const { audioProperties } = attributes;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const swiperRef = useRef(null);

    const playTrack = (index) => {
        const audio = audioRef.current;
        setActiveIndex(index);
        audio.src = audioProperties[index].audio.url;
        if (isPlaying) {
            audio.play();
        }
    };

    return <>
        <SwiperSlider
            ref={swiperRef}
            playTrack={playTrack}
            attributes={attributes}
        />
        <MusicPlayerBack
            attributes={attributes}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            swiperRef={swiperRef}
        />
    </>
}
export default Slider;