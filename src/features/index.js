import { featureConfig } from './config';
import { createFeatureRouter } from './router';

const {
  setFeature,
  featureIsEnabled
} = createFeatureRouter(featureConfig);

export { setFeature, featureIsEnabled };
