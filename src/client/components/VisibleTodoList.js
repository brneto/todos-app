import { featureIsEnabled } from '../../feature-control';
import VisibleTodoListPristine from './VisibleTodoList-pristine';
import VisibleTodoListFeatured from './VisibleTodoList-featured';

export default
  featureIsEnabled('use-new-React-Suspense')
    ? VisibleTodoListFeatured
    : VisibleTodoListPristine;
