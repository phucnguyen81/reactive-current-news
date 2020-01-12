import * as events from './current-news.events';
import { CurrentNewsState, On, Off } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (state.state instanceof On) {
    return On_nextState(state, event);
  }
  else if (state.state instanceof Off) {
    return Off_nextState(state, event);
  }
  else {
    return state;
  }
}

function On_nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (event instanceof events.Stop) {
    return {
      ...state,
      fetchingLatestNews: false,
      state: new Off(),
    };
  }
  else if ((event instanceof events.FetchLatestNews)) {
    if (!state.fetchingLatestNews) {
      return {
        ...state,
        fetchingLatestNews: true,
        latestNewsError: '',
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
  else if (event instanceof events.ApiKey) {
    return {
      ...state,
      apiKey: event.apiKey,
    }
  }

  return state;
}

function Off_nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if (event instanceof events.Start) {
    return {
      ...state,
      state: new On(),
    };
  }
  else {
    return state;
  }
}
