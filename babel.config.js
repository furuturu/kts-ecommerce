module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }], // рантайм для реакт 17+
    "@babel/preset-typescript",
  ];

  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true, // это вместо import "regenerator-runtime" в index.tsx для асинк эвейт
      },
    ],
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-decorators", { legacy: true }], // для mobx
    ["@babel/plugin-proposal-class-properties", { loose: true }], // для mobx
    process.env.NODE_ENV === "development" && "react-refresh/babel",
  ].filter(Boolean);

  return { presets, plugins };
};
