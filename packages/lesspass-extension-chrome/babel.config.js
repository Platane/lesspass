const getConfig = env => {
  const plugins = [];

  const presets = [
    "@emotion/babel-preset-css-prop",

    "@babel/preset-typescript",

    "@babel/preset-react"
  ];

  if (env === "production") {
    presets.push([
      "@babel/preset-env",
      {
        targets: {
          chrome: "79"
        },
        useBuiltIns: false,
        modules: false
      }
    ]);
  }

  return { plugins, presets };
};

module.exports = api => getConfig(api.env());
