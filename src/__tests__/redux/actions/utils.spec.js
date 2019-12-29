import { metaFilterListCreator } from '../../../client/redux/actions/utils';
// export const metaFilterListCreator = [identity, (payload, filter) => ({ filter })];

describe('Action creator utils', () => {
  const
    payload = 'payloadData',
    filter = 'filterName';

  test('metaFilterListCreator util function', () => {
    // when
    const [payloadCreator, metaCreator] = metaFilterListCreator;

    // then
    expect(payloadCreator(payload)).toEqual('payloadData');
    expect(metaCreator(payload, filter)).toEqual({ filter: 'filterName' });
  });
});
