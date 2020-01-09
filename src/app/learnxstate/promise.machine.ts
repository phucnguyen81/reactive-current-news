import { Machine, interpret } from 'xstate';

const promiseMachine = Machine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      type: 'final'
    }
  }
});

export function promiseService() {
  return interpret(promiseMachine);
}
