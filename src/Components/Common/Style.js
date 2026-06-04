import generateCSS from '../../../../bpl-tools/Advanced/generateCSS';
import { mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBorderBoxCSS, getBoxCSS, getColorsCSS, getMultiShadowCSS, getTypoCSS } from '../../../../bpl-tools/utils/getCSS';

import { prefix } from '../../utils/data';
import { getByDevice } from '../../utils/functions';

const isValue = (property, val) => val ? `${property}: ${val};` : '';

const Style = ({ attributes, id, isBackend = false }) => {
	const { elements = {}, style = {}, advanced = {} } = attributes;
	const { height = {}, title = {}, artist = {}, thumbnail = {}, range = {}, controls = {}, time = {} } = style;
	const { input = {}, thumb = {} } = range;

	const mainSl = `#${id}`;
	const playerSl = `${mainSl} .${prefix}`;

	const thumbnailSl = `${playerSl} .thumbnail`;
	const titleSl = `${playerSl} .title`;
	const artistSl = `${playerSl} .artist`;

	const controlsSl = `${playerSl} .controls`;
	const controlSl = `${playerSl} .control`;
	const playPauseSl = `${controlsSl} .playPause`;
	const timeSl = `${playerSl} .time`;
	const progressSl = `${playerSl} .progress`;
	const progressFillSl = `${playerSl} .progressFill`;

	const rangeWebkitThumbSl = `${progressSl}::-webkit-slider-thumb`;
	const thumbCSS = `
		width: ${thumb.width || '16px'};
		background: ${thumb.color || '#EE714B'};
		border-radius: ${thumb.radius || '50%'};
		box-shadow: ${getMultiShadowCSS(thumb.shadow || [])};
		outline: ${thumb.outline?.width} ${thumb.outline?.style} ${thumb.outline?.color};
	`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', title.typo || { fontSize: { desktop: '22px' } })?.googleFontLink}
		${getTypoCSS('', artist.typo || { fontSize: { desktop: '18px' } })?.googleFontLink}
		${getTypoCSS('', time.typo || { fontSize: { desktop: '22px' } })?.googleFontLink}
		${getTypoCSS(titleSl, title.typo || { fontSize: { desktop: '22px' } })?.styles}
		${getTypoCSS(artistSl, artist.typo || { fontSize: { desktop: '18px' } })?.styles}
		${getTypoCSS(timeSl, time.typo || { fontSize: { desktop: '22px' } })?.styles}
		
		${generateCSS(id, advanced, isBackend)}

		${mainSl}{
			${isValue('text-align', getByDevice(attributes, 'alignment', 'desktop'))}
		}
		${playerSl}{
			${isValue('width', getByDevice(attributes, 'width', 'desktop'))}
			${isValue('height', height.desktop)}
		}

		${titleSl}{
			${getColorsCSS(title.colors || {})}
		}
		${artistSl}{
			${getColorsCSS(artist.colors || {})}
			opacity: ${artist.opacity || '1'};
		}

		${thumbnailSl}{
			${isValue('width', thumbnail.width?.desktop)}
			${getBorderBoxCSS(thumbnail.border || {})}
			border-radius: ${getBoxCSS(thumbnail.radius || { top: '16px', right: '16px', bottom: '16px', left: '16px' })};
		}
		${thumbnailSl}.sliderThumb{
			${isValue('height', thumbnail.sliderHeight?.desktop)}
		}

		${controlSl}{
			width: ${controls.size || '45px'};
			height: ${controls.size || '45px'};
			${getColorsCSS(controls.colors || { color: '#a0a0a0' })}
			padding: calc(${controls.size} * .25);
		}

		${controlSl}:hover{
			${getColorsCSS(controls.hovColors || { color: '#9c9c9c', bg: '#d8d8d8' })}
			${getBorderBoxCSS(controls.hovBorder || {})}
		}

		${controlSl}, ${playPauseSl}{
			${getBorderBoxCSS(controls.border || {})}
		}

		${playPauseSl}{
			width: ${controls.playPauseSize || '60px'};
			height: ${controls.playPauseSize || '60px'};
			${getColorsCSS(controls.playPauseColors || { color: '#fff', bg: '#000' })}
			padding: calc(${controls.playPauseSize} * .25);
		}

		${playPauseSl}.paused svg{
			margin-left: calc(${controls.playPauseSize || '60px'} * .05);
			margin-right: calc(-${controls.playPauseSize || '60px'} * .05);
		}

		${playPauseSl}:hover{
			${getColorsCSS(controls.playPauseHovColors || { color: '#fff', bg: '#222' })}
			${getBorderBoxCSS(controls.hovBorder || {})}
		}

		${timeSl}{
			${getColorsCSS(time.colors || { color: '#111', bg: '#0000' })}
			${isValue('border-radius', time.radius)}
		}

		${progressSl}, ${progressFillSl}{
			height: ${input.height || '4px'};
			border-radius: ${getBoxCSS(input.radius || { top: '8px', right: '8px', bottom: '8px', left: '8px' })};
		}

		${progressSl}{
			width: ${input.width?.desktop || '100%'};
			background: ${input.color || '#0003'};
		}

		${progressFillSl}{
			background: ${input.progressColor || '#000'};
		}

		${elements.thumb ? `${rangeWebkitThumbSl} {
			${thumbCSS}
		}` : ''};

		${tabBreakpoint}{
			${mainSl}{
				${isValue('text-align', getByDevice(attributes, 'alignment', 'tablet'))}
			}
			${playerSl}{
				${isValue('width', getByDevice(attributes, 'width', 'tablet'))}
				${isValue('height', height.tablet)}
			}

			${thumbnailSl}{
				${isValue('width', thumbnail.width?.tablet)}
			}
			${thumbnailSl}.sliderThumb{
				${isValue('height', thumbnail.sliderHeight?.tablet)}
			}
		}

		${mobileBreakpoint}{
			${mainSl}{
				${isValue('text-align', getByDevice(attributes, 'alignment', 'mobile'))}
			}
			${playerSl}{
				${isValue('width', getByDevice(attributes, 'width', 'mobile'))}
				${isValue('height', height.mobile)}
			}

			${thumbnailSl}{
				${isValue('width', thumbnail.width?.mobile)}
			}
			${thumbnailSl}.sliderThumb{
				${isValue('height', thumbnail.sliderHeight?.mobile)}
			}
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;