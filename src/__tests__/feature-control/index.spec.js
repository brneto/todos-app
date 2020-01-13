import { setFeature, featureIsEnabled } from '../../feature-control';

describe('features', () => {
  it('should change toogle feature isEnable', () => {
    // given
    const feature = 'use-new-React-Suspense';

    // when
    const initialIsEnabled = featureIsEnabled(feature);
    setFeature(feature, !initialIsEnabled);
    const newIsEnabled = featureIsEnabled(feature);

    // then
    expect(initialIsEnabled).toBe(false);
    expect(newIsEnabled).toBe(true);
  });
});
