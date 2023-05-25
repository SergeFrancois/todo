module.exports = {
  "presets": [
    "module:metro-react-native-babel-preset",
    "@babel/preset-flow",
    'other-presets',
    'mobx'
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy" : true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
  ]
}