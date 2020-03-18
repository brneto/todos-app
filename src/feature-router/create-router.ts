type FeatureMap = {
  'use-new-feature'?: boolean;
}

type FeatureKey = keyof FeatureMap;

interface FeatureRouter {
  setFeature(featureKey: FeatureKey, isEnabled: boolean): void;
  isFeatureEnabled(featureKey: FeatureKey): boolean;
}

export default (featureConfig: FeatureMap): FeatureRouter => ({
  setFeature(featureKey, isEnabled): void {
    featureConfig[featureKey] = typeof isEnabled === 'boolean' && isEnabled;
  },
  isFeatureEnabled: (featureKey): boolean => featureConfig[featureKey] === true,
});

