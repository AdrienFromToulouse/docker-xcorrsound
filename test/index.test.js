import LambdaTester from 'lambda-tester';
import handler from './';

describe('handler()', () => {
  test('returns result', () =>
  LambdaTester(handler.handler)
    .event({})
    .expectResult(data => {
      console.log('INFO:', data);
      expect(true);
    })
  );
});
