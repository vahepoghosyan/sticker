// Rename this file to postcss.config.cjs for Node ESM compatibility
module.exports = {
    plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
};
