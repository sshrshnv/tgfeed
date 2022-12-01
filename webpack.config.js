const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const SvgSymbolSprite = require('svg-symbol-sprite-loader')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const HtmlInlineCSSPlugin = require("html-inline-css-webpack-plugin").default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SentryPlugin = require('@sentry/webpack-plugin')

const utils = require('./build.utils')

const appData = {
  APP_TITLE: 'TgFeed',
  APP_DESCRIPTION: '',
  APP_LANG_NAMES: utils.getLangNames(),
  APP_INITIAL_TEXTS: utils.getInitialTexts()
}

const isProd = () => process.env.NODE_ENV === 'production'
const isDev = () => !isProd()
const isDevEnvVars = () => process.env.ENV_VARS === 'dev'

const appEnv = isDevEnvVars() ?
  dotenv.config({ path: `./.env.${process.env.ENV_VARS}` })?.parsed :
  process.env

const defineEnvConfig = [
  ...Object.keys(appData),
  ...Object.keys(dotenv.config({ path: './.env.example' }).parsed)
].reduce((config, key) => {
  config[`process.env.${key}`] = JSON.stringify(
    appData[key] ?? appEnv[key] ?? process.env[key]
  )
  return config
}, {})

const resolveOptions = {
  extensions: [
    '.mjs', '.js', '.jsx', '.tsx', '.ts', '.js', '.json',
    '.wasm', '.css', '.sss', '.html', '.svg', '.jpg', '.png'
  ],
  alias: {
    '~': path.resolve('./src')
  }
}

const mainFields = [
  'esm2017', 'module', 'jsnext:main', 'browser', 'main'
]

const terserOptions = {
  compress: {
    ecma: 2020
  },
  output: {
    ecma: 2020,
    beautify: false,
    comments: false,
    ascii_only: true
  }
}

const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER
const isSentryAvailable = () =>
  isProd() && !(isBundleAnalyzer() || isDevEnvVars()) && !!appEnv.SENTRY_AUTH_TOKEN

module.exports = [{
  mode: isDev() ? 'development' : 'production',

  target: 'web',

  entry: isDev() ? {
    app: [
      './src/app.sss',
      './src/app.tsx'
    ],
  } : {
    inline: './src/app.sss',
    app: ['./src/app.tsx']
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev() ? '[name].js' : '[name].[contenthash].js',
    assetModuleFilename: '[name].[hash][ext]',
    publicPath: process.env.ASSETS_HOST || '/',
    hashDigestLength: 8
  },

  resolve: resolveOptions,

  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules\/(?!(comlink|idb-keyval|pako)\/).*/,
        resolve: { mainFields },
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.sss$/i,
        use: [{
          loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            esModule: isDev(),
          }
        }, {
          loader: 'css-loader',
          options: {
            esModule: isDev(),
            modules: {
              localIdentName: isDev() ? '[name]__[local]' : '[hash:base64]',
              exportLocalsConvention: 'asIs'
            },
            sourceMap: isDev()
          }
        }, {
          loader: 'postcss-loader'
        }]
      }, {
        test: /\.svg$/,
        use: 'svg-symbol-sprite-loader'
      }, {
        test: /\.(avif|webp|png)$/,
        type: 'asset/resource'
      }, {
        test: /\.webmanifest$/,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
        generator : {
          filename : '[name][ext]',
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(defineEnvConfig),

    isProd() ? new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }) : () => {},

    new HtmlPlugin({
      template: './src/app.html',
      filename: 'index.html',
      inject: false,
      templateParameters: utils.templateParameters,
      minify: isProd()
    }),

    isProd() ? new HtmlSkipAssetsPlugin({
      skipAssets: [asset => /\/*inline.*.js/.test(asset.attributes?.src || '')],
    }) : () => {},

    isProd() ? new HtmlInlineCSSPlugin({
      filter: (filename) => filename.includes('inline') || filename.includes('index')
    }) : () => {},

    isProd() ? new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/runtime~.+[.]js$/]
    }) : () => {},

    new SvgSymbolSprite.Plugin({
      filename: isDev() ? 'icons.svg' : 'icons.[contenthash].svg',
    }),

    /*isProd() ? new CopyPlugin({
      patterns: [{
        from: './src/ui/images/manifest-splash-icon-512.png',
        to: './manifest-splash-icon-512.[contenthash].png'
      }]
    }) : () => {},*/

    isSentryAvailable() ? new SentryPlugin({
      authToken: appEnv.SENTRY_AUTH_TOKEN,
      org: 'alexander-shershnev',
      project: 'tgfeed',
      include: './build',
      deploy: {
        env: process.env.ENV_VARS
      }
    }) : () => {},

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5002
    }) : () => {}
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    splitChunks: {
      chunks: 'all'
    },
    providedExports: true,
    sideEffects: false,
    concatenateModules: false,
    runtimeChunk: isProd(),
    minimize: isProd(),
    minimizer: isProd() ? [
      new TerserPlugin({ terserOptions }),
      new CssMinimizerPlugin({ minimizerOptions: {
        preset: ['default', {
          colormin: false
        }]
      } })
    ] : []
  },

  devtool: isDev() ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  devServer: {
    //https: true,
    host: '0.0.0.0',
    port: 5000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer(),
    errorDetails: true
  }
},/* {
  mode: isDev() ? 'development' : 'production',

  target: 'webworker',

  entry: {
    sw: { import: './src/sw/sw.ts', filename: 'sw.js' }
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? `sw.[name].js` : `sw.[name].[contenthash].js`,
    chunkFilename: isDev() ? `sw.[name].js` : `sw.[name].[contenthash].js`,
    publicPath: process.env.ASSETS_HOST || '/'
  },

  resolve: resolveOptions,

  module: {
    rules: [{
      test: /\.m?[jt]sx?$/,
      resolve: { mainFields },
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },

  plugins: [
    new webpack.DefinePlugin(defineEnvConfig),

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5003
    }) : () => {}
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    //chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
    concatenateModules: false,
    minimize: isProd(),
    minimizer: isProd() ? [
      new TerserPlugin({ terserOptions })
    ] : []
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer(),
    errorDetails: true
  }
}*/]
