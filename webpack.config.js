const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = (preProcessor) => {
    const loaders = [{ loader: 'style-loader' }, { loader: 'css-loader' }];

    if (preProcessor) {
      loaders.push({ loader: 'resolve-url-loader' }, { loader: preProcessor });
    }

    return loaders;
  };

  const rules = [
    {
      test: /\.(css)$/,
      use: getStyleLoaders(),
    },
    {
      test: /\.(scss)$/,
      use: getStyleLoaders('sass-loader'),
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: ['ts-loader'],
    },
  ];

  return {
    mode: isProd ? 'production' : 'development',

    entry: './src/index.tsx',

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: `bundle-${Number(new Date())}.js`,
    },

    devtool: isDev && 'cheap-module-source-map',

    module: {
      rules,
    },

    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],

      alias: {
        '@bus': path.resolve(__dirname, './src/bus'),
        '@typings': path.resolve(__dirname, './src/typings'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@store': path.resolve(__dirname, './src/store'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@components': path.resolve(__dirname, './src/components'),
        '@compositions': path.resolve(__dirname, './src/compositions'),
      },
    },

    devServer: {
      open: false,
      historyApiFallback: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  };
};
