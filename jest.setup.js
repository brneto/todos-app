//https://babeljs.io/docs/en/next/v7-migration#remove-proposal-polyfills-in-babel-polyfill-https-githubcom-babel-babel-issues-8416
//https://babeljs.io/blog/2019/03/19/7.4.0
//https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js
import 'core-js/modules/esnext.string.match-all';

// add some helpful assertions
import 'jest-dom/extend-expect';

// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';
