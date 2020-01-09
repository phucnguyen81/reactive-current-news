import { toggleService } from './toggle.machine';

describe('toggle machine', () => {
  it('should toggle its states', () => {
    const states = [];
    const service = toggleService().onTransition(
      state => states.push(state.value)
    );
    service.start();
    service.send('TOGGLE');
    service.send('TOGGLE');
    expect(states).toEqual(['inactive', 'active', 'inactive']);
  });
});
