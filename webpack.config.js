	const defaultConfig = require('@wordpress/scripts/config/webpack.config');
	const ESLintPlugin = require('eslint-webpack-plugin');

	const plugins = defaultConfig.plugins.filter((p) => !(p.constructor && p.constructor.name === 'RtlCssPlugin'));


	module.exports = {
		...defaultConfig,
		entry: {
			...defaultConfig.entry(),
			'admin-dashboard': './src/bplugins-admin/dashboard.js',
			'admin-post': './src/bplugins-admin/post.js'
		},
		plugins: [
			...plugins,
			new ESLintPlugin()
		],
		
		optimization: {}
	};

	