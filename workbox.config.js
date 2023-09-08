module.exports = {
  swSrc: './build/service-worker.js',
  swDest: './build/service-worker.js',
  globDirectory: './build',
  globPatterns: ['*.js', '*.css', '*.html', '*.webmanifest'],
  globIgnores: ['service-worker.*', 'workbox.*', '*.map', '*.cache'],
  dontCacheBustURLsMatching: /\.[0-9a-z]{8}\./,
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
}
