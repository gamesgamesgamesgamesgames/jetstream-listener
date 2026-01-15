// Module imports
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const config = {
	input: 'src/index.ts',
	output: {
		esModule: true,
		file: 'dist/index.js',
		format: 'esm',
		sourcemap: true,
	},
	plugins: [
		typescript(),
		nodeResolve({ preferBuiltins: true }),
		commonjs(),
		json(),
	],
	external: ['@protobufjs/inquire', 'snappy'],
}

export default config
