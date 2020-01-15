export default featureConfig => ({
  setFeature: (featureName, isEnabled) => {
    featureConfig[featureName] = (typeof isEnabled === "boolean") && isEnabled;
  },
  featureIsEnabled: featureName => featureConfig[featureName] === true,
});
