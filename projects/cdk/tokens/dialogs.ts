import {Provider, Type} from '@angular/core';
import {TuiAriaDialogContext} from '@taiga-ui/cdk/interfaces';
import {tuiCreateToken} from '@taiga-ui/cdk/utils';
import {Observable} from 'rxjs';

/**
 * A stream of dialogs
 */
export const TUI_DIALOGS = tuiCreateToken<
    ReadonlyArray<Observable<readonly TuiAriaDialogContext[]>>
>([]);

export function tuiAsDialog(
    useExisting: Type<Observable<readonly TuiAriaDialogContext[]>>,
): Provider {
    return {
        provide: TUI_DIALOGS,
        multi: true,
        useExisting,
    };
}
