import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {

  if (event instanceof events.Skip) {
    return state;
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
  else if (event instanceof events.FetchingLatestNewsDone) {
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
