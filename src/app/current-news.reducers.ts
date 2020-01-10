import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (state.isOn) {
    return On_nextState(state, event);
  }
  else {
    return Off_nextState(state, event);
  }
}

function On_nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (event instanceof events.Stop) {
    return {
      ...state,
      isOn: false,
    };
  }
  else if ((event instanceof events.FetchLatestNews)) {
    // do fetching only one at a time
    if (!state.fetchingLatestNews) {
      return {
        ...state,
        fetchingLatestNews: true,
      };
    }
  }
  else if (event instanceof events.ReceiveLatestNews) {
    return {
      ...state,
      latestNews: event.latestNews
    };
  }
  else if (event instanceof events.CancelFetchingLatestNews) {
    return {
      ...state,
      fetchingLatestNews: false,
    };
  }
  else if (event instanceof events.CompleteFetchingLatestNews) {
    return {
      ...state,
      fetchingLatestNews: false,
    };
  }
  else if (event instanceof events.LatestNewsError) {
    return {
      ...state,
      latestNewsError: event.message,
    };
  }

  return state;
}

function Off_nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (event instanceof events.Start) {
    return {
      ...state,
      isOn: true,
    };
  }
  else {
    return state;
  }
}
