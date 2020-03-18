type FeatureMap = {
  'use-new-feature'?: boolean;
}

type FeatureKey = keyof FeatureMap;

export default (featureConfig: FeatureMap) => ({
  setFeature(featureKey: FeatureKey, isEnable: boolean): void {
    featureConfig[featureKey] = typeof isEnabled === 'boolean' && isEnabled;
  },
  isFeatureEnabled: (featureKey: FeatureKey): boolean => featureConfig[featureKey] === true,
});
