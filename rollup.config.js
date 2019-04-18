import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

let isNodeModule = true;

const componetLib = `${!isNodeModule ? '..' : './node_modules'}/web-ui-components/lib/`;
const webComponentsSubFolders = ['organisms', 'molecules', 'global', 'atoms'];

const webComponentsModules = webComponentsSubFolders.reduce((paths, folder) => [...paths, ...fs.readdirSync(`${componetLib}${folder}`)
.map(x => `${componetLib}${folder}/${x}`)
.map(path => path.replace(/^(\.\/node_modules\/|\.\.\/)/i, ''))], []);

export default {
	input: `${__dirname}/src/index.js`,
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.peerDependencies || {}),
		...webComponentsModules,
		'history/createBrowserHistory',
	],
	plugins: [
		postcss({
			plugins: [autoprefixer()],
		}),
		resolve({
			only: ['shared'],
		}),
		babel({
			babelrc: false,
			exclude: 'node_modules/**',
			presets: [
				'react',
				['env',
					{
						targets: {
							browsers: [
								'IE 11',
								'last 3 Chrome versions',
								'last 2 Edge versions',
								'last 2 Firefox versions',
								'last 2 Safari versions',
								'last 2 ChromeAndroid versions',
								'last 2 iOS versions',
							],
						},
						modules: false,
					},
				],
			],
			plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-export-extensions'],
		}),
		commonjs(),
	],
	output: {
		file: 'lib/index.js',
		format: 'cjs',
	},
};
