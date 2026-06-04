import './post.scss';

window.copyBPlAdminShortcode = id => {
	var input = document.querySelector('#bPlAdminShortcode-' + id + ' input');
	var tooltip = document.querySelector('#bPlAdminShortcode-' + id + ' .tooltip');
	input.select();
	input.setSelectionRange(0, input.value.length);
	document.execCommand('copy');
	tooltip.innerHTML = wp.i18n.__('Copied Successfully!', 'audio-player-block');
	setTimeout(() => {
		tooltip.innerHTML = wp.i18n.__('Copy To Clipboard', 'audio-player-block');
	}, 1500);
}