import { identity } from 'ramda';

// actionCreator :: type -> (data, filter | undefined) -> {
//   type: 'COMMAND' | 'DOCUMENT' | 'EVENT' | 'SIDE_EFFECT',
//   payload: data,
//   meta: { type: type | [, filter: filter] }
// }

const
  createActionFunction = type =>
    [identity, (payload, filter) => filter ? ({ type, filter }) : ({ type })];

export { createActionFunction };
