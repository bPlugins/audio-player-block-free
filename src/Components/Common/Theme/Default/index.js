import { useEffect, useRef, useState } from 'react';
import MP3Player from './MP3Player';
import { downloadIcon, nextIcon, playIcon, prevIcon } from '../../../../utils/icons';

const Default = ({ attributes }) => {
	const { audioProperties, elements = {}, options = {} } = attributes;

	const [activeIndex, setActiveIndex] = useState(0);
	const defaultRef = useRef(null);

	useEffect(() => {
		if (audioProperties?.length && defaultRef.current) {
			MP3Player(defaultRef.current, audioProperties, options, setActiveIndex);
		}
	}, [audioProperties, elements, options]);


	return <div className='bpMp3Player' ref={defaultRef}>
		<div className='thumbnail'>
			<img id='cover' />
		</div>

		<div className='contentBox'>
			<audio id='disc'></audio>

			<div className='info'>
				<h2 id='title' className='title'></h2>
				<h3 id='artist' className='artist'></h3>

				<div id='progressContainer' className='progress'>
					<div id='progress' className='progressFill'></div>
				</div>

				<div className='timeWrap'>

					{elements?.currentTime ? <span id='timer' className='time currentTime'>0:00</span> : <p></p>}

					{elements?.totalTime ? <span id='duration' className='time totalTime'></span> : <p></p>}

				</div>
			</div>

			<div className='controls'>
				{elements?.navigation && <span className='control navigation prevBtn'>{prevIcon}</span>}

				<span className='playPause paused'>{playIcon}</span>

				{elements?.navigation && <span className='control navigation nextBtn'>{nextIcon}</span>}
			</div>
		</div>

		{elements?.download && (
			<span className="downloadArea">
				<a
					className="control"
					href={audioProperties[activeIndex]?.audio?.url}
					download
				>
					{downloadIcon}
				</a>
			</span>

		)}
	</div>
}
export default Default;