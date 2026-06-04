const slug = 'audio-player-block';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, deleteDataOnUninstall, uninstallNonce } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `Audio Player Block${proSuffix}`,
		displayName: `Audio Player Block${proSuffix} - Advanced Block for Embedding Audio Files`,
		description: 'Audio Player Block for embedding a beautiful audio player on the WordPress website. It supports multiple audios as a playlist and you can select a single audio file to make a non playlist player.',
		slug,
		version,
		isPremium,
		hasPro,
		deleteDataOnUninstall,
		uninstallNonce,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
			banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			landing: `https://bplugins.com/products/${slug}/`,
			// docs: `https://bplugins.com/docs/${slug}/`,
			docs: `https://wordpress.org/plugins/${slug}/#installation`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		freemius: {
			product_id: 17222,
			plan_id: 28715,
			public_key: 'pk_44dc77a45966f6bb4960f3efe87d5',
		},

		changelogs: [
			{
				type: 'new',
				version: '1.6.0 - 04 June, 2026',
				list: [
					'New: Added uninstall data cleanup settings in dashboard.',
					'Improved: Unlocked previously locked pro fields in the Gutenberg editor and introduced a clean, non-intrusive notices UI to display premium feature requirements.',
					'Update: Redesigned the shortcode copy-to-clipboard UI column in the audio player CPT admin table for a better user experience.',
					'Update: Streamlined editor Settings controls for free users, focusing on Default and Slider theme controls.',
					'Update: Removed Pro-only theme styling and assets to reduce package footprint.',
				]
			},
			{
				type: 'fix',
				version: '1.5.2 - 09 April, 2026',
				list: [
					'Fix: Fixed class naming conflict and namespace resolution issue in LicenseActivation.',
					'Update: Updated Freemius SDK new version.'
				]
			}

		],
		proFeatures: [
			'5 Premium Theme Customization',
			'Advanced Playlist Navigation',
			'Forward & Backward Skip Buttons',
			'Full Time Display Control',
			'Thumbnail Border & Radius Control',
			'Artist Opacity Control',
			'Auto height for all tracks',
			'Download Audio Option',
			'Complete Player UI Customization'
		],
		startButton: {
			label: 'Start Now',
			url: 'wp-admin/post-new.php?post_type=audio_player_block'
		}
	}
}

export const demoInfo = {
	// allInOneLabel: 'See All Demos',
	// allInOneLink: 'https://audioplayerwp.com/all-demos-in-one-place/',
	demos: [
		{
			"title": "Default Player",
			// "url": 'https://bblockswp.com/demo/audio-player-block-default/',
			"url": 'https://i.ibb.co.com/nM1WrN5n/default.png',
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M470 64L192 128v214.3A64 64 0 1 0 224 384V197.7l214-49.3V278.3A64 64 0 1 0 470 384V64z" />
			</svg>,
			"type": 'image'
		},
		{
			"title": "Slider Player",
			// "url": "https://bblockswp.com/demo/audio-player-block-slider/",
			"url": "https://i.ibb.co.com/F4j4GFJV/slider.png",
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M96 128h320v32H96zm64 112h256v32H160zm-64 112h320v32H96zM128 96h64v96h-64zm192 112h64v96h-64zm-128 112h64v96h-64z" />
			</svg>,
			"type": 'image'
		},
		{
			"title": "One Hash Player",
			// "url": "https://bblockswp.com/demo/audio-player-block-onehash/",
			"url": "https://i.ibb.co.com/F444QSpK/onehaash.png",
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M181 64h48l-20 128h86l20-128h48l-20 128h77v48h-85l-16 96h85v48h-93l-20 128h-48l20-128h-86l-20 128h-48l20-128H64v-48h85l16-96H64v-48h93l20-128zm22 176l-16 96h86l16-96h-86z" />
			</svg>,
			"type": 'image'
		},
		{
			"title": "Wooden Player",
			// "url": "https://bblockswp.com/demo/audio-player-block-wooden/",
			"url": "https://i.ibb.co.com/fG8SZr0Y/wooden.png",
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M272 32l160 224h-96v96h64L256 480 112 352h64v-96H80L240 32h32z" />
			</svg>,
			"type": 'image'
		},
		{
			"title": "Lite Player",
			// "url": "https://bblockswp.com/demo/audio-player-block-lite/",
			"url": "https://i.ibb.co.com/twQWF2M4/lite.png",
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M512 32C320 32 96 224 96 416c0 35 29 64 64 64 192 0 384-224 384-416 0-35-29-64-64-64zM160 416c0-128 160-320 288-320 0 128-192 288-320 288-18 0-32 14-32 32 0 0 0 0 0 0 0-18 14-32 32-32z" />
			</svg>,
			"type": 'image'
		},
		{
			"title": "Card Player",
			// "url": "https://bblockswp.com/demo/audio-player-block-card/",
			"url": "https://i.ibb.co.com/27cy54yb/card.png",
			"icon": <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
				<path d="M96 96h256v256H96zM160 160h256v256H160z" />
			</svg>,
			"type": 'image'
		},

	]
}

export const pricingInfo = {
	logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
	pluginId: 17222,
	planId: 28715,
	licenses: [
		1,
		3,
		null
	],
	button: {
		label: 'Buy Now ➜'
	},
	featured: {
		selected: 3,
	}
}
