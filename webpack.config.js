const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const SvgSymbolSprite = require('svg-symbol-sprite-loader')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const HtmlInlineCSSPlugin = require("html-inline-css-webpack-plugin").default
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SentryPlugin = require('@sentry/webpack-plugin')

const appConfig = require('./app.config')
const { isDev, isProd, templateParameters } = require('./webpack.utils')

let appEnv
try {
  appEnv = dotenv.config({ path: './.env' }).parsed
} catch {
  appEnv = process.env
}

const isBundleAnalyzer = () => !!process.env.BUNDLE_ANALYZER
const isSentryAvailable = () =>
  false //isProd() && !(isBundleAnalyzer() || isDevEnvVars()) && !!appEnv.SENTRY_AUTH_TOKEN

module.exports = [{
  mode: isDev() ? 'development' : 'production',

  entry: isDev() ? {
    app: [
      './src/app.inline.sss',
      './src/app.inline.ts',
      './src/app.ts',
    ],
  } : {
    'inline': [
      './src/app.inline.sss',
      './src/app.inline.ts',
    ],
    'app': {
      import: './src/app.ts',
      dependOn: 'inline',
    }
  },

  output: {
    path: path.resolve('./build'),
    filename: isDev() ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev() ? '[name].js' : '[name].[contenthash].js',
    assetModuleFilename: '[name].[hash][ext]',
    publicPath: process.env.ASSETS_HOST || '/',
    hashDigestLength: 8
  },

  resolve: {
    extensions: [
      '.mjs', '.js', '.jsx', '.tsx', '.ts', '.js', '.json',
      '.wasm', '.css', '.sss', '.html', '.svg', '.jpg', '.png'
    ],
    alias: {
      '~': path.resolve('./src')
    }
  },

  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules\/(?!(comlink|idb-keyval|pako)\/).*/,
        resolve: {
          mainFields: ['esm2017', 'module', 'jsnext:main', 'browser', 'main']
        },
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.sss$/i,
        use: [{
          loader: isDev() ? 'style-loader' : MiniCSSExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: isDev() ? '[name]__[local]' : '[hash:base64:5]',
              exportLocalsConvention: 'asIs'
            },
            sourceMap: isDev()
          }
        }, {
          loader: 'postcss-loader'
        }]
      }, {
        test: /\.svg$/,
        oneOf: [{
          resourceQuery: /sprite/,
          use: 'svg-symbol-sprite-loader'
        }, {
          type: 'asset/resource',
        }]
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
    new webpack.DefinePlugin([
      ...Object.keys(appConfig),
      ...Object.keys(dotenv.config({ path: './.env.example' }).parsed)
    ].reduce((config, key) => {
      config[`process.env.${key}`] = JSON.stringify(
        appConfig[key] ?? appEnv[key] ?? process.env[key]
      )
      return config
    }, {})),

    isProd() ? new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }) : () => {},

    new HtmlPlugin({
      template: './src/app.html',
      filename: 'index.html',
      inject: false,
      templateParameters,
      minify: isProd()
    }),

    isProd() ? new HtmlInlineCSSPlugin({
      filter: (filename) => filename.includes('inline') || filename.includes('index')
    }) : () => {},

    isProd() ? new HtmlInlineScriptPlugin({
      scriptMatchPattern: [
        /runtime.+[.]js$/,
        /inline.+[.]js$/
      ]
    }) : () => {},

    new SvgSymbolSprite.Plugin({
      filename: isDev() ? 'icons.svg' : 'icons.[contenthash].svg',
    }),

    /*isProd() ? new CopyPlugin({
      patterns: [{
        from: './src/shared/images/manifest-splash-icon-512.png',
        to: './manifest-splash-icon-512.[contenthash].png'
      }]
    }) : () => {},*/

    isSentryAvailable() ? new SentryPlugin({
      authToken: appEnv.SENTRY_AUTH_TOKEN,
      org: 'alexander-shershnev',
      project: 'tgfeed',
      include: './build'
    }) : () => {},

    isBundleAnalyzer() ? new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 5002
    }) : () => {}
  ],

  optimization: {
    nodeEnv: isDev() ? 'development' : 'production',
    splitChunks: {
      chunks: 'all',
      minSize: 1024
    },
    providedExports: true,
    usedExports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    //concatenateModules: false,
    runtimeChunk: 'single',
    minimize: isProd(),
    minimizer: isProd() ? [
      new TerserPlugin({ terserOptions: {
        compress: {
          ecma: 2020
        },
        output: {
          ecma: 2020,
          beautify: false,
          comments: false,
          ascii_only: true
        }
      } }),
      new CSSMinimizerPlugin({ minimizerOptions: {
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
    port: 3000,
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
    children: true,// isBundleAnalyzer(),
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
