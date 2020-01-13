import featureConfig from './featureConfig';
import createFeatureRouter from './featureRouter';

export const {
  setFeature, featureIsEnabled
} = createFeatureRouter(featureConfig);
