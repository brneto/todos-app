import { featureIsEnabled } from '../../feature-control';
import TodoListPristine from './TodoList-pristine';
import TodoListFeatured from './TodoList-featured';

export default
  featureIsEnabled('use-new-React-Suspense')
    ? TodoListFeatured
    : TodoListPristine;
