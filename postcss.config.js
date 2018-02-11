module.exports = (ctx) => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-nested')(),
  ],
});