module.exports = function (wallaby) {
	return {
		files: [
			'src/**/*.ts',
			'src/**/*.tsx',
			'dist/**/*.js',
      'jest-setup.js',
			{ pattern: 'src/**/*spec.ts', ignore: true },
			{ pattern: 'node_modules/**/*', ignore: true }
		],
		tests: [
			'src/**/*spec.ts',
			'dist/**/*spec.js'
		],
		compilers: {
			'src/**/*.ts?': wallaby.compilers.typeScript({
				module: 'commonjs'
			})
		},
		testFramework: 'jest',
		env: {
			type: 'node'
		}
	};
};
