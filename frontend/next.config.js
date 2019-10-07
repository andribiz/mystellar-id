const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        // eslint-disable-line
        (context, request, callback) => {
          // eslint-disable-line
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config;
  },
  distDir: '../dist/functions/next',
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/console': { page: '/console' },
      '/console/': { page: '/console' },
      '/console/federation': { page: '/console/federation' },
      '/console/federation-user': { page: '/console/federation-user' },
      '/console/not-yet': { page: '/console/not-yet' },
    };
  },
};

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        mozjpeg: {
          quality: 90,
        },
        webp: {
          preset: 'default',
          quality: 90,
        },
      },
    ],
    withFonts,
    withCSS,
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[path]___[local]___[hash:base64:5]',
      },
    },
  ],
  nextConfig
);
