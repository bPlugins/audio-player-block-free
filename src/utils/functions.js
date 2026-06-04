import { produce } from "immer";


const deviceSuffix = d => d === 'mobile' ? 'Mob' : (d === 'tablet' ? 'Tab' : '');

export const getByDevice = (attributes, property, device) => {
	return attributes[`${property}${deviceSuffix(device)}`];
};

export const setByDevice = (setAttributes, property, device, value) => {
	setAttributes({ [`${property}${deviceSuffix(device)}`]: value });
};

export const themeSwitch = (theme = 'default', attributes) => produce(attributes, (draft) => {
	draft['options']['theme'] = theme;

	switch (theme) {
		case 'default':
			draft['width'] = '290px';
			draft['widthTab'] = '';
			draft['widthMob'] = '';
			draft['style']['title']['typo']['fontSize']['desktop'] = 32;
			draft['style']['title']['typo']['fontWeight'] = 600;
			draft['style']['title']['colors'] = { color: '#000', bg: '#0000' };
			draft['style']['artist']['typo']['fontSize']['desktop'] = 22.4;
			draft['style']['artist']['typo']['fontWeight'] = 500;
			draft['style']['artist']['colors'] = { color: '#000', bg: '#0000' };
			draft['style']['range']['input']['color'] = 'rgba(0, 0, 0, .2)';
			draft['style']['range']['input']['progressColor'] = '#000';
			draft['style']['controls']['size'] = '45px';
			draft['style']['controls']['playPauseSize'] = '60px';
			draft['style']['controls']['colors'] = { color: '#a0a0a0', bg: '#0000' };
			draft['style']['controls']['hovColors'] = { color: '#9c9c9c', bg: '#d8d8d8' };
			draft['style']['controls']['playPauseColors'] = { color: '#fff', bg: '#000' };
			draft['style']['controls']['playPauseHovColors'] = { color: '#fff', bg: '#4c4343' };
			draft['style']['time']['typo']['fontSize']['desktop'] = 22.4;
			draft['style']['time']['colors'] = { 'color': '#000', 'bg': '#0000' };
			draft['advanced']['dimension']['padding']['desktop'] = { top: '16px', right: '32px', bottom: '16px', left: '32px' };
			draft['advanced']['borderShadow']['normal']['border'] = { width: '', style: '', color: '' };
			draft['advanced']['borderShadow']['normal']['radius'] = { top: '16px', right: '16px', bottom: '16px', left: '16px' };
			draft['advanced']['borderShadow']['normal']['shadow'] = [{
				hOffset: '0px', vOffset: '0px', blur: '8px', color: 'rgba(0, 0, 0, .4)'
			}];
			draft['advanced']['background']['normal'] = { 'type': 'color', 'color': '#fff' };
			break;
		case 'slider':
			draft['width'] = '100%';
			draft['widthTab'] = '';
			draft['widthMob'] = '';
			draft['style']['title']['typo']['fontSize']['desktop'] = 32;
			draft['style']['title']['typo']['fontWeight'] = 600;
			draft['style']['title']['colors'] = { 'color': '#fff', 'bg': '#0000' };
			draft['style']['artist']['typo']['fontSize']['desktop'] = 22.4;
			draft['style']['artist']['typo']['fontWeight'] = 500;
			draft['style']['artist']['colors'] = { color: '#fff', bg: '#0000' };
			draft['style']['range']['input']['color'] = '#c0acac';
			draft['style']['range']['input']['progressColor'] = '#DC6161';
			draft['style']['controls']['size'] = '45px';
			draft['style']['controls']['playPauseSize'] = '55px';
			draft['style']['controls']['colors'] = { color: '#fff', bg: '#0000' };
			draft['style']['controls']['hovColors'] = { color: '#fff', bg: '#4C3737' };
			draft['style']['controls']['playPauseColors'] = { color: '#fff', bg: '#0000' };
			draft['style']['controls']['playPauseHovColors'] = { color: '#fff', bg: '#4C3737' };
			draft['style']['time']['typo']['fontSize']['desktop'] = 20;
			draft['style']['time']['colors'] = { 'color': '#fff', 'bg': '#0000' };
			draft['advanced']['dimension']['padding']['desktop'] = { top: '16px', right: '32px', bottom: '16px', left: '32px' };
			draft['advanced']['borderShadow']['normal']['border'] = { width: '', style: '', color: '' };
			draft['advanced']['borderShadow']['normal']['radius'] = { top: '15px', right: '15px', bottom: '15px', left: '15px' };
			draft['advanced']['borderShadow']['normal']['shadow'] = [{
				hOffset: '', vOffset: '', blur: '', color: ''
			}];
			draft['advanced']['background']['normal'] = { 'type': 'color', 'color': '#473C64' };
			break;
	}
});