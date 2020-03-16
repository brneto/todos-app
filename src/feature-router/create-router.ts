type FeatureMap = {
  'use-new-feature'?: boolean;
}

type FeatureKey = keyof FeatureMap;

// ToDo: https://basarat.gitbook.io/typescript/type-system/functions
// type FeatureRouter = {
//   setFeature(featureName: keyof FeatureMap, isEnabled: boolean): void;
//   featureIsEnabled(featureName: keyof FeatureMap): boolean;
// }

export default (featureConfig: FeatureMap) => ({
  setFeature: (featureName: FeatureKey, isEnable: boolean): void => {
    featureConfig[featureName] = typeof isEnabled === 'boolean' && isEnabled;
  },
  featureIsEnabled: (featureName: FeatureKey): boolean => featureConfig[featureName] === true,
});
