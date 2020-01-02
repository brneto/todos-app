// https://babeljs.io/blog/2019/03/19/7.4.0
// https://babeljs.io/docs/en/next/v7-migration#remove-proposal-polyfills-in-babel-polyfill-https-githubcom-babel-babel-issues-8416

// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';

// https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios/43020260#43020260
// global.XMLHttpRequest = undefined;
