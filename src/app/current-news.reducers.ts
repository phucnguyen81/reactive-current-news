import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: events.AppEvent
): CurrentNewsState {
  if ((event instanceof events.FetchLatestNews)
    && !state.fetchingLatestNews) {
    return {
      ...state,
      fetchingLatestNews: true,
    };
  }
  else if (event instanceof events.ReceiveLatestNews) {
    return {
      ...state,
      latestNews: event.latestNews,
      fetchingLatestNews: false,
    };
  }
  else if (event instanceof events.CancelFetchingLatestNews) {
    return {
      ...state,
      fetchingLatestNews: false,
    }
  }
  else {
    return state;
  }
}
