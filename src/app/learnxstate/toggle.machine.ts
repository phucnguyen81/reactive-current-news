import { Machine, interpret } from 'xstate';

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});

export function toggleService() {
  // Machine instance with internal state
  return interpret(toggleMachine);
}
