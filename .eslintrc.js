module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: 0,
    localStorage: 0,
  },
  rules: {
    'react/jsx-filename-extension': 0,
  },
};
