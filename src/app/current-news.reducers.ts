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
    };
  }
  else if (event instanceof events.StateSaved) {
    // nothing to do yet
  }
  else if ((event instanceof events.Init) && event.initialState) {
    return {
      ...state,
      ...event.initialState,
    };
  }

  return state;

}

