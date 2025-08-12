module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['react-native-worklets-core/plugin'],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR'],
      },
    ],
  ],
};
