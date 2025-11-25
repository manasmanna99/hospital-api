/** @type {import('@stryker-mutator/core').StrykerOptions} */
// @ts-nocheck

module.exports = {
  $schema: './node_modules/@stryker-mutator/core/schema/stryker-schema.json',
  testRunner: 'mocha',
  coverageAnalysis: 'off',
  mutate: [
    'controller/**/*.js',
    'models/**/*.js',
    'routes/api/**/*.js',
    'index.js',
    '!config/**/*.js',
    '!test/**/*.js'
  ],
  reporters: ['clear-text', 'html', 'progress'],
  plugins: ['@stryker-mutator/mocha-runner'],
  mochaOptions: {
    spec: ['test/**/*.spec.js'],
    require: ['test/mocha-setup.js'],
    ui: 'bdd'
  },
  thresholds: {
    high: 80,
    low: 60,
    break: 0
  }
};
