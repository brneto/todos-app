type featureMap = {
  'use-new-feature'?: boolean;
}

interface FeatureRouter {
  setFeature(featureName: keyof featureMap, isEnabled: boolean): void;
  featureIsEnabled(featureName: keyof featureMap): boolean;
}

export default (featureConfig: featureMap): FeatureRouter => ({
  setFeature: (featureName, isEnabled): void => {
    featureConfig[featureName] = typeof isEnabled === 'boolean' && isEnabled;
  },
  featureIsEnabled: (featureName): boolean => featureConfig[featureName] === true,
});