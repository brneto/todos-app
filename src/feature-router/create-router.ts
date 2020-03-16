type FeatureMap = {
  'use-new-feature'?: boolean;
}

// ToDo: https://basarat.gitbook.io/typescript/type-system/functions
interface FeatureRouter {
  setFeature(featureName: keyof FeatureMap, isEnabled: boolean): void;
  featureIsEnabled(featureName: keyof FeatureMap): boolean;
}

export default (featureConfig: FeatureMap): FeatureRouter => ({
  setFeature: (featureName, isEnabled): void => {
    featureConfig[featureName] = typeof isEnabled === 'boolean' && isEnabled;
  },
  featureIsEnabled: (featureName): boolean => featureConfig[featureName] === true,
});
