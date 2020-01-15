export default featureConfig => ({
  setFeature: (featureName, isEnabled) => { featureConfig[featureName] = isEnabled; },
  featureIsEnabled: featureName => featureConfig[featureName],
});
