
import { identity } from 'ramda';

// actionCreator :: type -> (data, filter | undefined) -> {
//   type: 'ACTION_TYPE',
//   payload: data,
//   meta: { type: type | [, filter: filter] }
// }
const
  createActionFunction = type =>
    [identity, (payload, filter) => filter ? ({ type, filter }) : ({ type })];

export { createActionFunction };
