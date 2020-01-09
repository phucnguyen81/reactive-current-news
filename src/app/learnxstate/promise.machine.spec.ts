import { promiseService } from './promise.machine';

describe('promise machine', () => {
  it('should resolve on RESOLVE', () => {
    const states = [];
    const service = promiseService().onTransition(
      state => states.push(state.value)
    );
    service.start();
    service.send('RESOLVE');
    expect(states).toEqual(['pending', 'resolved']);
  });
});
