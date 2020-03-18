type FeatureMap = {
  'use-new-feature'?: boolean;
}

type FeatureKey = keyof FeatureMap;

interface FeatureRouter {
  setFeature(featureKey: FeatureKey, isEnabled: boolean): void;
  isFeatureEnabled(featureKey: FeatureKey): boolean;
}

interface FeatureRouterCreator {
  (featureConfig: FeatureMap): FeatureRouter;
}

export default (featureConfig => ({
  setFeature(featureKey, isEnabled) {
    featureConfig[featureKey] = typeof isEnabled === 'boolean' && isEnabled
  },
  isFeatureEnabled: (featureKey) => featureConfig[featureKey] === true,
})) as FeatureRouterCreator;

