import { curry } from 'ramda';

// eslint-disable-next-line no-console
const trace = curry((tag, x) => console.log(tag, x) ?? x);

export { trace };
