exports.presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: [
          'IE 11',
          'last 3 Chrome versions',
          'last 2 Edge versions',
          'last 2 Firefox versions',
          'last 2 Safari versions',
          'last 2 ChromeAndroid versions',
          'last 2 iOS versions',
        ],
      },
    },
  ],
];

exports.plugins = [
  '@babel/proposal-object-rest-spread',
  '@babel/proposal-class-properties',
];
