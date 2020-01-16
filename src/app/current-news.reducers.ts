import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {

  if (event instanceof events.Skip) {
    return state;
  }
  else if (event instanceof events.GotoEvent) {
    return {
      ...state,
      gotoEvent: event,
    };
  }
  else if (event instanceof events.FetchLatestNews) {
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
  else if (event instanceof events.FetchingLatestNewsDone) {
    return {
      ...state,
      fetchingLatestNews: false,
    };
  }
  else if (event instanceof events.AppError) {
    return {
      ...state,
      error: event.error,
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

