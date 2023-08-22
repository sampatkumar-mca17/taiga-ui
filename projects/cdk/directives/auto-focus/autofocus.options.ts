import {
    ElementRef,
    InjectionToken,
    NgZone,
    Optional,
    Provider,
    Renderer2,
    Self,
} from '@angular/core';
import {ANIMATION_FRAME, WINDOW} from '@ng-web-apis/common';
import {TuiFocusableElementAccessor} from '@taiga-ui/cdk/interfaces';
import {TuiDestroyService} from '@taiga-ui/cdk/services';
import {TUI_FOCUSABLE_ITEM_ACCESSOR, TUI_IS_IOS} from '@taiga-ui/cdk/tokens';
import {tuiCreateToken, tuiProvideOptions} from '@taiga-ui/cdk/utils/miscellaneous';
import {Observable} from 'rxjs';

import {TuiDefaultAutofocusHandler} from './handlers/default.handler';
// eslint-disable-next-line import/no-cycle
import {TuiIosAutofocusHandler} from './handlers/ios.handler';

export interface TuiAutofocusHandler {
    setFocus(): void;
}

export interface TuiAutofocusOptions {
    readonly delay: number;
}

export const TUI_AUTOFOCUS_DEFAULT_OPTIONS: TuiAutofocusOptions = {
    delay: NaN, // NaN = no delay/sync
};

export const TUI_AUTOFOCUS_OPTIONS = tuiCreateToken(TUI_AUTOFOCUS_DEFAULT_OPTIONS);

export function tuiAutoFocusOptionsProvider(
    options: Partial<TuiAutofocusOptions>,
): Provider {
    return tuiProvideOptions(
        TUI_AUTOFOCUS_OPTIONS,
        options,
        TUI_AUTOFOCUS_DEFAULT_OPTIONS,
    );
}

export const TUI_AUTOFOCUS_HANDLER = new InjectionToken<TuiAutofocusHandler>(
    `[TUI_AUTOFOCUS_HANDLER]`,
);

export const TUI_AUTOFOCUS_PROVIDERS = [
    {
        provide: TUI_AUTOFOCUS_HANDLER,
        useFactory: (
            focusable: TuiFocusableElementAccessor | null,
            el: ElementRef<HTMLElement>,
            animationFrame$: Observable<number>,
            renderer: Renderer2,
            ngZone: NgZone,
            win: Window,
            isIos: boolean,
        ) =>
            isIos
                ? new TuiIosAutofocusHandler(focusable, el, renderer, ngZone, win)
                : new TuiDefaultAutofocusHandler(focusable, el, animationFrame$),
        deps: [
            [new Optional(), new Self(), TUI_FOCUSABLE_ITEM_ACCESSOR],
            ElementRef,
            ANIMATION_FRAME,
            Renderer2,
            NgZone,
            WINDOW,
            TUI_IS_IOS,
        ],
    },
    TuiDestroyService,
];
