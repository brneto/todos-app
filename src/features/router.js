const createFeatureRouter = featureConfig => ({
  setFeature: (featureName, isEnabled) => void (featureConfig[featureName] = isEnabled),
  isEnabledFeature: featureName => featureConfig[featureName],
});

export { createFeatureRouter };
