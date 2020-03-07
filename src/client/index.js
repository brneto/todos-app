import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import * as state from './redux/store';
import * as serviceWorker from './serviceWorker';

// https://devblogs.microsoft.com/typescript/typescript-and-babel-7/?ranMID=24542&ranEAID=je6NUbpObpQ&ranSiteID=je6NUbpObpQ-9Qp4yRmC1LZJPd02BkFxBQ&epi=je6NUbpObpQ-9Qp4yRmC1LZJPd02BkFxBQ&irgwc=1&OCID=AID2000142_aff_7593_1243925&tduid=(ir__vy0919kgsko6lmbmzbv2wue1qn2xlenjbcufhaty00)(7593)(1243925)(je6NUbpObpQ-9Qp4yRmC1LZJPd02BkFxBQ)()&irclickid=_vy0919kgsko6lmbmzbv2wue1qn2xlenjbcufhaty00
// https://iamturns.com/typescript-babel/

// ReactDOM.render(
//   <Root {...state} />,
//   document.getElementById('root')
// );

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(<Root {...state} />);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
