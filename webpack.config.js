const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV;

const config = {
  entry: path.join(__dirname, './src/index.js'),

  output: {
    filename: `ReactSmooth${env === 'production' ? '.min' : ''}.js`,
  },

  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
    }],
  },

  resolve: {
    alias: {
      react: path.join(__dirname, './node_modules/react'),
      'react-dom': path.join(__dirname, './node_modules/react-dom'),
      'react-transition-group': path.join(__dirname, './node_modules/react-transition-group'),
    },
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-transition-group': {
      root: ['ReactTransitionGroup'],
      commonjs2: 'react-transition-group',
      commonjs: 'react-transition-group',
      amd: 'react-transition-group',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'analyse') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

if (env === 'development') {
  config.mode = 'development';
}

if (env === 'production') {
  config.mode = 'production';
}

module.exports = config;
