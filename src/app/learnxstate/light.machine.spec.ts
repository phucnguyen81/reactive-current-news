import { lightMachineService } from './light.machine';

describe('light machine', () => {
  it('should turn yellow after initial green', () => {
    const states = [];
    const service = lightMachineService().onTransition(
      state => states.push(state.value)
    );
    service.start();
    service.send('TIMER');
    expect(states).toEqual(['green', 'yellow']);
  });
});
