import { identity } from 'ramda';

// actionCreator :: (data, filter) -> {
//   type: 'ACTION_TYPE',
//   payload: data,
//   meta: { filter: filter }
// }
export const metaFilterListCreator = [identity, (payload, filter) => ({ filter })];
