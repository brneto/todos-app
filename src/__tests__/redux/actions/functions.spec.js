import { createActionFunction } from '../../../client/redux/actions/functions';

describe('Action creator utils', () => {
  const
    payload = 'payloadData',
    filter = 'filterName';

  it('should create a function action with filter', () => {
    // given
    const messageType = 'TEST';

    // when
    const [payloadCreator, metaCreator] = createActionFunction(messageType);

    // then
    expect(payloadCreator(payload)).toEqual('payloadData');
    expect(metaCreator(payload, filter)).toEqual({ type: 'TEST', filter: 'filterName' });
  });

  it('should create a function action without filter', () => {
    // given
    const messageType = 'TEST';

    // when
    const [payloadCreator, metaCreator] = createActionFunction(messageType);

    // then
    expect(payloadCreator(payload)).toEqual('payloadData');
    expect(metaCreator(payload)).toEqual({ type: 'TEST' });
  });
});
