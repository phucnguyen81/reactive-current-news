import { AppEvent, LatestNewsEvent } from './current-news.events';
import { CurrentNewsState } from './current-news.state';

export function nextState(
  state: CurrentNewsState, event: AppEvent
): CurrentNewsState {
  if (event instanceof LatestNewsEvent) {
    return {
      ...state,
      latestNews: event.latestNews
    };
  }
  return state;
}
