import { identity } from '../reducers/util';

// actionCreator :: type -> (data, filter | undefined) -> {
//   type: 'COMMAND' | 'DOCUMENT' | 'EVENT' | 'SIDE_EFFECT',
//   payload: data,
//   meta: { type: type | [, filter: filter] }
// }

export const createActionFunction = type => [
  identity,
  (payload, filter) => filter ? ({ type, filter }) : ({ type })
];
