import {tuiCreateToken} from '@taiga-ui/cdk';
import {defer, of, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

/**
 * Stream that emits if loading of page is over (for example, to begin scrollIntoView)
 */
export const TUI_DOC_PAGE_LOADED = tuiCreateToken(
    defer(() => timer(200).pipe(switchMap(() => of(true)))),
);
