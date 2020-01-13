import { featureIsEnabled } from '../../feature-router';
import FooterPristine from './Footer.pristine';
import FooterFeatured from './Footer.featured';

export default
  featureIsEnabled('use-new-React-Suspense')
    ? FooterFeatured
    : FooterPristine;
