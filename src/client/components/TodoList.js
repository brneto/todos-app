import { featureIsEnabled } from '../../feature-router';
import TodoListPristine from './TodoList-pristine';
import TodoListFeatured from './TodoList-featured';

export default featureIsEnabled('use-new-React-Suspense')
  ? TodoListFeatured
  : TodoListPristine;
