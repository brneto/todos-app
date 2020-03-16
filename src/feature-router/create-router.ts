type FeatureMap = {
  'use-new-feature'?: boolean;
}

type FeatureKey = keyof FeatureMap;

export default (featureConfig: FeatureMap) => ({
  setFeature(featureName: FeatureKey, isEnable: boolean): void {
    featureConfig[featureName] = typeof isEnabled === 'boolean' && isEnabled;
  },
  featureIsEnabled: (featureName: FeatureKey): boolean => featureConfig[featureName] === true,
});
