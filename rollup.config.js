import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/jsonp.js',
  output: {
    file: 'dist/jsonp.js',
    format: 'cjs',
    sourcemap: true,
    name: 'jsonp'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}