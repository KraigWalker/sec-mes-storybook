exports.presets = [
  'react',
  ['env',
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
]

exports.plugins = [
  'transform-object-rest-spread',
  'transform-es2015-destructuring',
  'transform-class-properties'
]
