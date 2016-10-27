import typescript from 'rollup-plugin-typescript';
import jsx from 'rollup-plugin-jsx';

export default {
  entry: 'src/main.tsx',
  format: 'iife',
  plugins: [
    typescript({
      jsx: 'react',
      typescript: require('typescript')
    })
  ],
  dest: 'build/bundle.js',
  sourceMap: true,
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-slick': 'Slider',
    'react-router': 'ReactRouter',
    'redux': 'Redux'
  }
};