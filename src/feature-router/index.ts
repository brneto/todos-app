import featureConfig from './feature-config';
import createFeatureRouter from './create-router';

// Feature Toggles (often also refered to as Feature Flags)
// are a powerful technique, allowing teams to modify system
// behavior without changing code.
export const { setFeature, isFeatureEnabled } = createFeatureRouter(featureConfig);

