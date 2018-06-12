import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      modulesOnly: true,
      extensions: ['.js']
    }),
    babel({
      externalHelpers: false, runtimeHelpers: true,
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ]
};
