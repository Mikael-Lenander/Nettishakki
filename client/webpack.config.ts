{
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}