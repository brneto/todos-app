import featureConfig from './config';

export const featureRouter = ({
  setFeature: (featureName, isEnabled) => void (featureConfig[featureName] = isEnabled),
  featureIsEnabled: featureName => featureConfig[featureName],
});
