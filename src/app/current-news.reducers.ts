import {
  AppEvent, LatestNewsEvent, FetchLatestNewsEvent,
  CancelFetchingLatestNewsEvent
} from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: AppEvent
): CurrentNewsState {
  if ((event instanceof FetchLatestNewsEvent)
    && !state.fetchingLatestNews) {
    return {
      ...state,
      fetchingLatestNews: true,
    };
  }
  else if (event instanceof LatestNewsEvent) {
    return {
      ...state,
      latestNews: event.latestNews,
      fetchingLatestNews: false,
    };
  }
  else if (event instanceof CancelFetchingLatestNewsEvent) {
    return {
      ...state,
      fetchingLatestNews: false,
    }
  }
  else {
    return state;
  }
}
