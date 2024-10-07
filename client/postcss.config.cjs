module.exports = {
    plugins: [
      require('autoprefixer'), // Automatically add vendor prefixes to CSS
      require('cssnano')({ preset: 'default' }), // Minify your CSS for production
    ],
  };
  