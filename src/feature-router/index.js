import featureConfig from './feature-config';
import createFeatureRouter from './create-router';

export const {
  setFeature, featureIsEnabled
} = createFeatureRouter(featureConfig);
