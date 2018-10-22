import { sampleMiddleware } from '../../../client/redux/middlewares';

describe('middlewares/sampleMiddleware', () => {
  let next, dispatch, getState, middleware, dispatchCalls, nextCalls;

  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
    getState = jest.fn();

    dispatchCalls = dispatch.mock.calls;
    nextCalls = next.mock.calls;

    middleware = sampleMiddleware({ dispatch, getState })(next);
  });

  it('should process action', () => {
    const sampleAction = { type: 'SAMPLE_ACTION' };

    middleware(sampleAction);

    expect(dispatchCalls.length).toBe(0);
    // Verifing that there was only one call to next().
    // In that call there was only one parameter passed,
    // and that parameter was the sample action:
    // expect(next.mock.calls.length).toBe(1);
    // expect(next.mock.calls[0].length).toBe(1);
    // expect(next.mock.calls[0][0]).toEqual(sampleAction);
    expect(nextCalls).toEqual([[sampleAction]]);
  });
});
