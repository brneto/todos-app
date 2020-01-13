export default featureConfig => ({
  setFeature: (featureName, isEnabled) => void (featureConfig[featureName] = isEnabled),
  featureIsEnabled: featureName => featureConfig[featureName],
});
