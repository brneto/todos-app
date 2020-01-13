import featureConfig from './config';
import createFeatureRouter from './router';

export const {
  setFeature, featureIsEnabled
} = createFeatureRouter(featureConfig);
